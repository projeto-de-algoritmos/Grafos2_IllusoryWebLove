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
    
    const dijkstraGraph = dijkstra(nodes, edges, nodes[0], nodes[nodes.length - 1])
    
    console.log('---')
    /* console.log('Grafo:')
    console.log(graph) */
    console.log('---')

    return numberOfNodes
}

function dijkstra(nodes, edges, inicio, fim) {
    if (inicio.cidade === fim.cidade) {
        return
    } else {
        console.log(edges, inicio, fim)
    }

    let nodesExplorados = []
    let candidatosEdge = []

    //Primeiro nó nos nos explorados
    let noAtual = inicio

    while(true) {
        //Inserindo o nó como nó vizitado
        nodesExplorados.push(noAtual)

        //Verifica as arestas vizinhas do nó
        let candidatos = edges.filter(function (el) {
            return el.source === noAtual.cidade
        })
        
        //Insere as aresta vizinhas como candidatas para caminho
        candidatosEdge.push(candidatos)
        
        //Buscando o caminho de menor peso
        let menorCaminho = candidatosEdge[0].weight
        for (let j = 0; j < candidatosEdge.length; j++) {
            if (candidatosEdge[j].weight < menorCaminho) {
                menorCaminho = candidatosEdge[j].weight
                //Atualizando a aresta de menor peso para caminhar
                noAtual = candidatosEdge[j]
            }
        }
        
        //Retirando a proxima aresta das candidatas a caminhos
        candidatosEdge.splice(candidatosEdge.indexOf(noAtual), 1)

        if (candidatosEdge.length === 0) {
            break
        }
    }

    return
}

function objectPossivelCaminho(nodeIndex) {
    return {
        group: 'node',
        id: nodeIndex,
        cidade: data[nodeIndex].name
    }
}

function objectNode(nodeIndex) {
    return {
        weight: 'node',
        source: null,
        target: null
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