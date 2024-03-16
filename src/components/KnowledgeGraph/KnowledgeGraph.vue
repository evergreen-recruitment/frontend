<script setup lang="ts">
import { onMounted } from 'vue'
import type { Graph, GraphData, NodeConfig } from '@antv/g6'
import G6 from '@antv/g6'

const props = defineProps<{
  data: GraphData
}>()

function addStyleProperty(data: any) {
  data.nodes.forEach((node: NodeConfig) => {
    node.style = {}
    if (node.type === 'job') {
      node.style = {
        fill: '#5B8FF9',
        stroke: '#5B8FF9',
        shadowColor: 'rgba(0,0,0,0.15)',
      }
    } else if (node.type === 'similar-job') {
      node.style = {
        fill: '#61DDAA',
        stroke: '#61DDAA',
        shadowColor: 'rgba(0,0,0,0.15)',
      }
    } else if (node.type === 'stack') {
      node.style = {
        fill: '#F6BD16',
        stroke: '#F6BD16',
        shadowColor: 'rgba(0,0,0,0.15)',
      }
    }
  })
}

onMounted(() => {
  addStyleProperty(props.data)
  const container = document.querySelector('.graph-container') as HTMLElement
  const width = container.offsetWidth
  const height = container.offsetHeight || 500
  const minimap = new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
  })
  const graph = new G6.Graph({
    container: container as string | HTMLElement,
    width,
    height,
    plugins: [minimap],
    minZoom: 0.5,
    maxZoom: 3,
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
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'tooltip'],
    },
  }) as Graph

  const nodes = props.data.nodes
  graph.data({
    nodes,
    edges: props.data.edges?.map(function (edge: any, i: any) {
      edge.id = 'edge' + i
      return Object.assign({}, edge)
    }),
  })
  graph.render()

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
</script>

<template>
  <div class="graph-container card"></div>
</template>

<style scoped lang="scss">
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

//:deep(canvas) {
//  position: relative;
//  width: 100%;
//  height: 100%;
//  left: 0;
//  top: 0;
//}
</style>
