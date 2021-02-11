/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */  
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  // Question: what is the standard for directed edges?
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */  
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */   
  removeVertex(vertex) {
    // Delete from nodes property of graph
    this.nodes.delete(vertex);

    // update adjacency lists of other vertices
    for (let v of vertex.adjacent){
      v.adjacent.delete(vertex);
    }

    // clear adjacency list of vertex
    vertex.adjacent.clear();
  }

  /** traverse graph with DFS and returns array of Node values */

  // Use stack data structure: can be implemented iteratively or recursively
  depthFirstSearch(start, nodesSeen=new Set([start]), nodeValues=[]) {
    // Solved recursively
    nodeValues.push(start.value)

    for(let neighbor of start.adjacent){
      if(!nodesSeen.has(neighbor)){
        nodesSeen.add(neighbor);
        this.depthFirstSearch(neighbor, nodesSeen, nodeValues);
      }
    }

    return nodeValues;

    // Solved iteratively
    // let nodeValues = [];
    // let toVisitStack = [start];
    // let nodesSeen = new Set(toVisitStack); // Note: can be implemented using something else

    // while (toVisitStack.length){
    //   // Grab node from stack
    //   let node = toVisitStack.pop();

    //   // Add value to array
    //   nodeValues.push(node.value);

    //   // Accumulate values from adjacencies
    //   for(let neighbor of node.adjacent){
    //     if(!nodesSeen.has(neighbor)){
    //       toVisitStack.push(neighbor);
    //       nodesSeen.add(neighbor);
    //     }
    //   }
    // }
    // return nodeValues;
  }

  /** traverse graph with BDS and returns array of Node values */

  // Note: use a queue data structure; using an array for now but suboptimal
  // TODO: use a queue class
  breadthFirstSearch(start) {
    let nodeValues = [];
    let toVisitQueue = [start];
    let nodeSeen = new Set(toVisitQueue); // Note: can be implemented using something else

    while (toVisitQueue.length){
      // Grab node from front of queue
      let node = toVisitQueue.shift();

      // Add value to array
      nodeValues.push(node.value);

      // Accumulate values from neighbor
      for (let neighbor of node.adjacent){
        if(!nodeSeen.has(neighbor)){
          toVisitQueue.push(neighbor);
          nodeSeen.add(neighbor);
        }
      }
    }

    return nodeValues;
  }
}

module.exports = {Graph, Node}
