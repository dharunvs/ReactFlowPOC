export class BinaryTreeNode {
  constructor(id, label = "", position = { x: 0, y: 0 }) {
    this.id = id;
    this.label = label;
    this.position = position;
    this.left = null; // Left child
    this.right = null; // Right child
  }
}

export class BinaryTree {
  constructor() {
    this.root = null; // Root node
  }

  addNode(parentId, direction, newNode) {
    const parent = this.findNode(this.root, parentId);
    if (!parent) {
      console.error("Parent node not found.");
      return false;
    }

    if (direction === "left" && !parent.left) {
      parent.left = newNode;
      return true;
    } else if (direction === "right" && !parent.right) {
      parent.right = newNode;
      return true;
    } else {
      console.warn(`Node already exists in the ${direction} direction.`);
      return false;
    }
  }

  findNode(node, id) {
    if (!node) return null;
    if (node.id === id) return node;
    return this.findNode(node.left, id) || this.findNode(node.right, id);
  }

  toReactFlowNodes() {
    const nodes = [];
    const traverse = (node) => {
      if (!node) return;
      nodes.push({
        id: node.id,
        type: "BinaryTreeNode",
        position: node.position,
        data: { id: node.id, label: node.label, position: node.position },
        draggable: true, // Enable dragging
      });
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return nodes;
  }

  toReactFlowEdges() {
    const edges = [];
    const traverse = (node) => {
      if (!node) return;
      if (node.left) {
        edges.push({
          id: `e${node.id}-${node.left.id}`,
          source: node.id,
          target: node.left.id,
          sourceHandle: `${node.id}-left`,
          targetHandle: `${node.left.id}-top`,
        });
        traverse(node.left);
      }
      if (node.right) {
        edges.push({
          id: `e${node.id}-${node.right.id}`,
          source: node.id,
          target: node.right.id,
          sourceHandle: `${node.id}-right`,
          targetHandle: `${node.right.id}-top`,
        });
        traverse(node.right);
      }
    };
    traverse(this.root);
    return edges;
  }
}
