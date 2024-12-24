import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import BinaryTreeNode from "./nodes/BinaryTreeNode";

function Playground() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "BinaryTreeNode",
      position: { x: 250, y: 0 },
      data: { id: "1", label: "10", position: { x: 250, y: 0 } },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleNodeCreation = (handleId, position, direction) => {
    // Check if the root node already has a left or right child
    const isHandleOccupied = edges.some(
      (edge) =>
        edge.source === handleId &&
        edge.sourceHandle === `${handleId}-${direction}`
    );

    if (isHandleOccupied) {
      console.log(`A ${direction} node already exists for this root node.`);
      return;
    }

    // Proceed with node creation if the handle is not occupied
    const newNodeId = uuidv4();
    const newNode = {
      id: newNodeId,
      type: "BinaryTreeNode",
      position: {
        x: position.x + (direction === "left" ? -1 : 1) * 100,
        y: position.y + 100,
      },
      data: {
        id: newNodeId,
        label: "",
        position: {
          x: position.x + (direction === "left" ? -1 : 1) * 100,
          y: position.y + 100,
        },
      },
    };
    setNodes((nds) => [...nds, newNode]);

    const newEdge = {
      id: `e${handleId}-${newNodeId}`,
      source: handleId,
      target: newNodeId,
      sourceHandle: `${handleId}-${direction}`,
      targetHandle: `${newNodeId}-top`,
      className: "myEdge",
    };

    setEdges((eds) => [...eds, newEdge]);
  };

  const nodeTypes = {
    BinaryTreeNode: (props) => (
      <BinaryTreeNode {...props} handleNodeCreation={handleNodeCreation} />
    ),
  };

  return (
    <div className="Playground">
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Playground;
