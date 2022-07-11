import { data } from "./services/data";

const minNodes = 4
const maxNodes = 6
const minNeighboor = 1
const maxNeighboor = 2
const minWeight = 1
const maxWeight = 5

export default function generateGraph() {
    const numberOfNodes = getRandomNumber(minNodes, maxNodes)

    const nodes = getNodes(numberOfNodes)
    const edges = getEdges(nodes)
    const graph = getGraph(nodes, edges)
    
    console.log('---')
    console.log('Grafo:')
    console.log(graph)
    console.log('---')

    return numberOfNodes
}

function objectNode(nodeIndex) {
    return {
        group: 'node',
        id: nodeIndex,
        cidade: data[nodeIndex].name
    }
}

function objectEdge(sourceNodeIndex, targetNodeIndex) {
    return {
        group: 'edge',
        source: data[sourceNodeIndex].name, 
        target: targetNodeIndex !== null ? data[targetNodeIndex].name: null,
        weight: getRandomNumber(minWeight, maxWeight)
    }
}

function getNodes(numberOfNodes) {
    const nodes = [];

    for (let i = 0; i < numberOfNodes; i++) {
        nodes.push(objectNode(i))
    }
    
    return nodes
}

function getEdges(nodes) {
    const edges = [];

    for (let i = 0; i < nodes.length; i++) {
        let numberOfNeighboor = getRandomNumber(minNeighboor, maxNeighboor)

        for (let j = 0; j < numberOfNeighboor; j++) {
            const edge = creatEdge(edges, i, nodes.length - 1)

            edges.push(edge)
        }
    }

    return edges
}

function getGraph(nodes, edges) {
    return nodes.concat(edges);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function creatEdge(edges, nodeIndex1, length) {
    for(let i = 0; i < 10000; i++) {
        let nodeIndex2 = takeDiferentNode(nodeIndex1, length)

        let a = edges.find((edge) => edge.source === data[nodeIndex1].name && edge.target === data[nodeIndex2].name) ? true : false
        let b = edges.find((edge) => edge.source === data[nodeIndex2].name && edge.target === data[nodeIndex1].name) ? true : false

        if (a === false && b === false) {
            return objectEdge(nodeIndex1, nodeIndex2)
        }
    }    
}

function takeDiferentNode(nodeIndex1, length) {
    let nodeIndex2 = getRandomNumber(0, length)

    if (nodeIndex1 === nodeIndex2) {
        if (nodeIndex2 > length/2) {
            nodeIndex2 -= 1
        } else {
            nodeIndex2 += 1
        }
    }

    return nodeIndex2
}