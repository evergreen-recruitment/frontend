<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import type { Graph, GraphData, NodeConfig } from '@antv/g6'
import G6 from '@antv/g6'
import { primaryColorEnum } from '@/config/theme.config'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const props = defineProps<{
  data: GraphData
  showMinimap?: boolean
  showLegend?: boolean
  zoom?: number
}>()

const typeConfigs = {
  job: {
    style: {
      fill: '#5B8FF990',
      stroke: '#5B8FF9',
      shadowColor: 'rgba(0,0,0,0.15)',
    },
  },
  'similar-job': {
    style: {
      fill: '#61DDAA90',
      stroke: '#61DDAA',
      shadowColor: 'rgba(0,0,0,0.15)',
    },
  },
  stack: {
    style: {
      fill: '#F6BD1690',
      stroke: '#F6BD16',
      shadowColor: 'rgba(0,0,0,0.15)',
    },
  },
}

// @ts-ignore
props.data.nodes.forEach((node: NodeConfig) => {
  if (!node.type) {
    return
  }
  // @ts-ignore
  node = Object.assign(node, { ...typeConfigs[node.type] })
})

// const lineDash = [4, 2, 1, 2]
// G6.registerEdge(
//   'line-dash',
//   {
//     afterDraw(cfg, group) {
//       // get the first shape in the group, it is the edge's path here=
//       const shape = group.get('children')[0]
//       let index = 0
//       // Define the animation
//       shape.animate(
//         () => {
//           index++
//           console.log(index)
//           if (index > 9) {
//             index = 0
//           }
//           // returns the modified configurations here, lineDash and lineDashOffset here
//           return {
//             lineDash,
//             lineDashOffset: -index,
//           }
//         },
//         {
//           repeat: true, // whether executes the animation repeatly
//           duration: 3000, // the duration for executing once
//         },
//       )
//     },
//   },
//   'cubic', // extend the built-in edge 'cubic'
// )

onMounted(() => {
  const container = document.querySelector('.graph-container') as HTMLElement
  const width = container.offsetWidth
  const height = container.offsetHeight || 500

  const minimap = new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
  })

  const legendData = {
    nodes: [
      {
        id: 'job',
        label: '最合适岗位',
        size: 20,
        order: 0,
        ...typeConfigs.job,
      },
      {
        id: 'similar-job',
        label: '相似岗位',
        size: 15,
        order: 1,
        ...typeConfigs['similar-job'],
      },
      {
        id: 'stack',
        label: '技术栈',
        size: 10,
        order: 2,
        ...typeConfigs.stack,
      },
    ],
  }

  const legend = new G6.Legend({
    data: legendData,
    align: 'center',
    layout: 'horizontal', // vertical
    position: 'bottom-right',
    padding: [4, 16, 8, 16],
    containerStyle: {
      fill: 'rgb(133,133,133)',
      lineWidth: 1,
    },
    title: '图例',
    titleConfig: {
      position: 'center',
      offsetX: 0,
      offsetY: 12,
    },
    filter: {
      enable: true,
      multiple: true,
      trigger: 'click',
      graphActiveState: 'activeByLegend',
      graphInactiveState: 'inactiveByLegend',
      filterFunctions: {
        job: (d) => {
          return d.type === 'job'
        },
        'similar-job': (d) => {
          return d.type === 'similar-job'
        },
        stack: (d) => {
          return d.type === 'stack'
        },
      },
    },
  })

  const pluginList = [props.showMinimap ? minimap : null, props.showLegend ? legend : null].filter(Boolean)
  // const pluginList = [minimap, legend]

  const graph = new G6.Graph({
    container: container as string | HTMLElement,
    width,
    height,
    plugins: pluginList,
    minZoom: 0.5,
    maxZoom: 3,
    animate: true,
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: (d: any) => {
        if (d.source.id === '1') {
          return 300
        }
        return 200
      },
      nodeStrength: (d: any) => {
        if (d.isLeaf) {
          return -50
        }
        return -10
      },
      edgeStrength: (d: any) => {
        if (d.source.id === '2' || d.source.id === '3' || d.source.id === '4') {
          return 0.7
        }
        return 0.1
      },
    },
    defaultEdge: {
      type: 'cube',
      style: {
        lineWidth: 2,
      },
    },
    nodeStateStyles: {
      activeByLegend: {
        lineWidth: 5,
        strokeOpacity: 0.5,
        stroke: '#f00',
      },
      inactiveByLegend: {
        opacity: 0.5,
      },
    },
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'tooltip',
          formatText: function (model) {
            return `${model.label}<br/>
                    类型: ${model.type === 'stack' ? '技术栈' : '相关岗位'}<br/>
                    ${model.type === 'similar-job' ? `相关度${((model.size as number) / 180).toFixed(2)}<br/>` : ''}
                    双击跳转搜索
                   `
          },
        },
      ],
    },
  }) as Graph

  const nodes = props.data.nodes
  graph.data({
    nodes,
    edges: props.data.edges?.map(function (edge: any, i: any) {
      edge.id = 'edge' + i

      /* 边配置 弃用 */

      // edge.label = edge.type === 'stack' ? '相关技术栈' : '相关岗位'
      edge.labelCfg = {
        style: {
          fill: primaryColorEnum[appStore.themeName],
        },
      }
      return Object.assign({}, edge)
    }),
  })
  graph.render()

  graph.zoom(props.zoom || 1, { x: 200, y: 200 })

  graph.on('node:dragstart', function (e) {
    graph.layout()
    refreshDragedNodePosition(e)
  })
  graph.on('node:drag', function (e) {
    refreshDragedNodePosition(e)
  })
  graph.on('node:dragend', function (e: any) {
    e.item.get('model').fx = null
    e.item.get('model').fy = null
  })

  let activeNode: any = null
  graph.on('node:click', function (e: any) {
    const clickedNodeData = e.item.get('model')
    if (clickedNodeData.type === 'job' || clickedNodeData.type === 'similar-job') {
      graph.getNodes().forEach((node) => {
        node.clearStates()
      })
      if (activeNode && activeNode.id === clickedNodeData.id) {
        activeNode = null
      } else {
        const connectedEdges = graph
          .getEdges()
          .filter(
            (edge) =>
              edge.getSource().getID() === clickedNodeData.id || edge.getTarget().getID() === clickedNodeData.id,
          )
        const connectedNodeIds = connectedEdges.map((edge) =>
          edge.getSource().getID() === clickedNodeData.id ? edge.getTarget().getID() : edge.getSource().getID(),
        )
        graph.getNodes().forEach((node) => {
          const nodeModel = node.getModel()
          if (connectedNodeIds.includes(nodeModel.id!) && nodeModel.type === 'stack') {
            node.setState('activeByLegend', true)
          } else {
            node.setState('inactiveByLegend', true)
          }
        })
        activeNode = clickedNodeData
      }
    }
  })

  graph.on('node:dblclick', function (e: any) {
    const nodeData = e.item.get('model')
    const searchURL = `/job/search?keyword=${encodeURIComponent(nodeData.label)}`
    window.open(searchURL, '_blank')
  })

  if (typeof window !== 'undefined') {
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) {
        return
      }
      if (!container || !container.scrollWidth || !container.scrollHeight) {
        return
      }
      graph.changeSize(container.scrollWidth, container.scrollHeight)
    }
  }

  function refreshDragedNodePosition(e: any) {
    const model = e.item.get('model')
    model.fx = e.x
    model.fy = e.y
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.onresize = null
  }
})
</script>

<template>
  <div class="graph-container"></div>
</template>

<style lang="scss" scoped>
.graph-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

:deep(.minimap) {
  position: absolute;
  top: 0;
}

:deep(.g6-legend-container) {
  @apply w-fit h-fit;
  left: auto !important;
  top: auto !important;
  bottom: 20px !important;
  right: 20px !important;
}
</style>
