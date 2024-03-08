<script setup lang="ts">
import { onMounted } from 'vue'
import type { Graph, GraphData, NodeConfig } from '@antv/g6'
import G6 from '@antv/g6'

const data: GraphData = {
  nodes: [
    { id: '1', type: 'job', label: 'Java开发工程师', size: 180 },
    { id: '2', type: 'similar-job', label: 'Golang开发工程师', size: 120 },
    { id: '3', type: 'similar-job', label: 'C/C++开发工程师', size: 120 },
    { id: '4', type: 'similar-job', label: 'PHP开发工程师', size: 120 },
    { id: '5', type: 'similar-job', label: 'Node.js开发工程师', size: 120 },
    { id: '6', type: 'similar-job', label: 'Python开发工程师', size: 120 },
    { id: '7', type: 'stack', label: 'Java', size: 80, isLeaf: true },
    { id: '8', type: 'stack', label: 'Spring', size: 80, isLeaf: true },
    { id: '9', type: 'stack', label: 'SpringBoot', size: 80, isLeaf: true },
    { id: '10', type: 'stack', label: 'SpringMvc', size: 80, isLeaf: true },
    { id: '11', type: 'stack', label: 'SpringCloud', size: 80, isLeaf: true },
    { id: '12', type: 'stack', label: 'MySQL', size: 80, isLeaf: true },
    { id: '13', type: 'stack', label: 'Redis', size: 80, isLeaf: true },
    { id: '14', type: 'stack', label: 'MongoDB', size: 80, isLeaf: true },
    { id: '15', type: 'stack', label: 'RabbitMQ', size: 80, isLeaf: true },
    { id: '16', type: 'stack', label: 'Golang', size: 80, isLeaf: true },
    { id: '17', type: 'stack', label: 'C/C++', size: 80, isLeaf: true },
    { id: '18', type: 'stack', label: 'PHP', size: 80, isLeaf: true },
    { id: '19', type: 'stack', label: 'Node.js', size: 80, isLeaf: true },
    { id: '20', type: 'stack', label: 'Python', size: 80, isLeaf: true },
    { id: '21', type: 'stack', label: 'Gin', size: 80, isLeaf: true },
    { id: '22', type: 'stack', label: 'Beego', size: 80, isLeaf: true },
    { id: '23', type: 'stack', label: 'Echo', size: 80, isLeaf: true },
    { id: '24', type: 'stack', label: 'Gorilla', size: 80, isLeaf: true },
    { id: '25', type: 'stack', label: 'Laravel', size: 80, isLeaf: true },
    { id: '26', type: 'stack', label: 'Symfony', size: 80, isLeaf: true },
    { id: '27', type: 'stack', label: 'CodeIgniter', size: 80, isLeaf: true },
    { id: '28', type: 'stack', label: 'Express.js', size: 80, isLeaf: true },
    { id: '29', type: 'stack', label: 'Koa', size: 80, isLeaf: true },
    { id: '30', type: 'stack', label: 'Fastify', size: 80, isLeaf: true },
    { id: '31', type: 'stack', label: 'Django', size: 80, isLeaf: true },
    { id: '32', type: 'stack', label: 'Flask', size: 80, isLeaf: true },
  ],
  edges: [
    { source: '1', target: '2' },
    { source: '1', target: '3' },
    { source: '1', target: '4' },
    { source: '1', target: '5' },
    { source: '1', target: '5' },
    { source: '1', target: '6' },
    { source: '1', target: '7' },
    { source: '1', target: '8' },
    { source: '1', target: '9' },
    { source: '1', target: '10' },
    { source: '1', target: '11' },
    { source: '1', target: '12' },
    { source: '1', target: '13' },
    { source: '1', target: '14' },
    { source: '1', target: '15' },
    { source: '1', target: '16' },
    { source: '1', target: '17' },
    { source: '1', target: '18' },
    { source: '1', target: '19' },
    { source: '1', target: '20' },
    { source: '2', target: '21' },
    { source: '2', target: '22' },
    { source: '2', target: '23' },
    { source: '2', target: '24' },
    { source: '2', target: '12' },
    { source: '2', target: '13' },
    { source: '2', target: '14' },
    { source: '2', target: '15' },
    { source: '3', target: '17' },
    { source: '3', target: '25' },
    { source: '3', target: '26' },
    { source: '3', target: '27' },
    { source: '3', target: '12' },
    { source: '3', target: '13' },
    { source: '3', target: '14' },
    { source: '3', target: '15' },
    { source: '4', target: '18' },
    { source: '4', target: '28' },
    { source: '4', target: '29' },
    { source: '4', target: '30' },
    { source: '4', target: '12' },
    { source: '4', target: '13' },
    { source: '4', target: '14' },
    { source: '4', target: '15' },
    { source: '5', target: '19' },
    { source: '5', target: '28' },
    { source: '5', target: '29' },
    { source: '5', target: '30' },
    { source: '5', target: '12' },
    { source: '5', target: '13' },
    { source: '5', target: '14' },
    { source: '5', target: '15' },
    { source: '6', target: '20' },
    { source: '6', target: '31' },
    { source: '6', target: '32' },
    { source: '6', target: '12' },
    { source: '6', target: '13' },
    { source: '6', target: '14' },
    { source: '6', target: '15' },
  ],
}

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

addStyleProperty(data)

onMounted(() => {
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
      default: ['drag-canvas', 'zoom-canvas'],
    },
  }) as Graph

  const nodes = data.nodes
  graph.data({
    nodes,
    edges: data.edges?.map(function (edge, i) {
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
  <div class="graph-container"></div>
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
