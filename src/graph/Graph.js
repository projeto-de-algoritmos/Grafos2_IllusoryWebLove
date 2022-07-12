export class Graph {
  constructor(v, e) {
    this.v = v;
    this.e = e;
    this.edges = [];
    this.nodes = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
    if (!this.nodes.includes(edge.v1)) {
      this.nodes.push(edge.v1);
    }
    if (!this.nodes.includes(edge.v2)) {
      this.nodes.push(edge.v2);
    }
  }

  getEdge(pos) {
    return this.edges[pos]
  }

  getEdges() {
    return this.edges
  }

  getNodes() {
    return this.nodes
  }

  find(subsets, node) {
    let nodeInfo = subsets.get(node);
    if (nodeInfo.parent != node) {
      nodeInfo.parent = this.find(subsets, nodeInfo.parent)
    }

    return nodeInfo.parent; 
  }

  union(subsets, x, y) {
      let xroot = this.find(subsets, x);
      let yroot = this.find(subsets, y);

      if (subsets.get(xroot).rank < subsets.get(yroot).rank) {
          subsets.get(xroot).parent = yroot;
      } else if (subsets.get(xroot).rank > subsets.get(yroot).rank) {
        subsets.get(yroot).parent = xroot;
      } else {
        subsets.get(yroot).parent = xroot;
        subsets.get(xroot).rank++;
      }
  } 
}