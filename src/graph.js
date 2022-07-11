import { data } from "./services/data";

const minNodes = 4
const maxNodes = 6
const minNeighboor = 1
const maxNeighboor = 2
const minWeight = 1
const maxWeight = 5

export default function generateGraph() {
    const graph = [];
    const numberOfNodes = getRandomNumber(minNodes, maxNodes)

    const nodes = getNodes(numberOfNodes)
    const edges = getEdges(nodes)
    
    console.log('---')
    console.log('numberOfNodes: ', numberOfNodes)
    console.log(nodes)
    console.log(edges)
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
        console.log('vizinhos', numberOfNeighboor)

        for (let j = 0; j < numberOfNeighboor; j++) {
            let nodeIndex2 = diferentEdge(i, nodes.length - 1)
            const edge = searchEdge(edges, i, nodeIndex2, nodes.length - 1)

            edges.push(edge)
        }
    }

    return edges
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function searchEdge(edges, nodeIndex1, nodeIndex2) {
    let a
    let b

    a = edges.find((edge) => edge.source === data[nodeIndex1].name && edge.target === data[nodeIndex2].name) ? true : false
    b = edges.find((edge) => edge.source === data[nodeIndex2].name && edge.target === data[nodeIndex1].name) ? true : false
    
    if (a || b) {
        return objectEdge(nodeIndex1, null)
    }

    return objectEdge(nodeIndex1, nodeIndex2)
}

function diferentEdge(nodeIndex1, length) {
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