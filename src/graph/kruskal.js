import { Edge } from "./Edge";
import {Graph} from "./Graph";

export function kruskal(thisNodes, thisEdges, thisFrom, thisTo, thisWeight) {
    let i = 0, j = 0, cost = 0;
    let subsets = new Map(),
        result = [];

    let graph = new Graph(thisNodes, thisEdges);
    
    while(i < thisEdges) {
      graph.addEdge(new Edge(thisFrom[i], thisTo[i], thisWeight[i]));
      i++;
    }

    graph.getEdges().sort((edge1, edge2) => {
      if (edge1.w === edge2.w) {
        return 1;
      }

      return edge1.w < edge2.w ? -1 : 1;
    });

    console.log('sorted edges:' , graph.getEdges());

    graph.getNodes().forEach(node => {
      subsets.set(node, { parent: node, rank: 0 });
    });

    i = 0;
    while(j < thisNodes-1) {
      let edge = graph.getEdge(i++);
      let root1 = graph.find(subsets, edge.v1); 
      let root2 = graph.find(subsets, edge.v2);

      if (root1 != root2) {
          result[j++] = edge;
          cost += edge.w;
          graph.union(subsets, root1, root2);
      }
    }

    i = 0;
    let results = [];
    while(i < j) {

      results.push(`${result[i].v1} -> ${result[i].v2} = ${result[i++].w} `);
    }
    results.push(`TOTAL = ${cost}`);
    return results;
}