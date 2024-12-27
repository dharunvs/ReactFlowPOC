import React, { useCallback, useState, useMemo } from "react";
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
import IDE from "./IDE/IDE";
import { PlaygroundProvider } from "../contexts/PlaygroundContext";

const rootPosition = {
  x: 350,
  y: 150,
};

const minDistanceX = 100;

const nodeTypes = {
  BinaryTreeNode: BinaryTreeNode,
};

function Playground() {
  const [binaryTrees, setBinaryTrees] = useState({});

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [initialNodePositions, setInitialNodePositions] = useState({}); // Store initial positions

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleBinaryTreeCreation = () => {
    const newTreeId = uuidv4();
    const newNodeId = uuidv4();
    const newNode = {
      id: newNodeId,
      type: "BinaryTreeNode",
      position: rootPosition,
      data: {
        treeId: newTreeId,
        id: newNodeId,
        label: "Root",
        position: rootPosition,
        parent: null,
        type: "root",
      },
    };

    setBinaryTrees((prev) => ({ ...prev, [newTreeId]: [newNodeId] }));
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodeCreation = useCallback(
    (treeId, parentId, position, direction) => {
      const isHandleOccupied = edges.some(
        (edge) =>
          edge.source === parentId &&
          edge.sourceHandle === `${parentId}-${direction}`
      );

      if (isHandleOccupied) {
        return;
      }

      const newNodeId = uuidv4();
      const newNode = {
        id: newNodeId,
        type: "BinaryTreeNode",
        position: {
          x: position.x + (direction === "left" ? -1 : 1) * minDistanceX,
          y: position.y + 100,
        },
        data: {
          treeId: treeId,
          id: newNodeId,
          label: direction === "left" ? "Left" : "Right",
          position: {
            x: position.x + (direction === "left" ? -1 : 1) * minDistanceX,
            y: position.y + 100,
          },
          parent: parentId,
          type: direction,
        },
        draggable: false,
      };
      setBinaryTrees((prev) => ({
        ...prev,
        [treeId]: [...prev[treeId], newNodeId],
      }));
      setNodes((nds) => [...nds, newNode]);

      const newEdge = {
        id: `e${parentId}-${newNodeId}`,
        source: parentId,
        target: newNodeId,
        sourceHandle: `${parentId}-${direction}`,
        targetHandle: `${newNodeId}-top`,
        className: "myEdge",
      };

      setEdges((eds) => [...eds, newEdge]);
    },
    [edges, setNodes, setEdges]
  );

  const onNodeDragStart = useCallback((_, draggedNode) => {
    setInitialNodePositions((prevPositions) => ({
      ...prevPositions,
      [draggedNode.id]: { ...draggedNode.position },
    }));
  }, []);

  const onNodeDragStop = useCallback(
    (_, draggedNode) => {
      const treeId = draggedNode.data.treeId;
      const initialPosition = initialNodePositions[draggedNode.id];

      const xDiff = draggedNode.position.x - initialPosition.x;
      const yDiff = draggedNode.position.y - initialPosition.y;

      setNodes((nodes) =>
        nodes.map((node) =>
          draggedNode.id === node.id
            ? {
                ...node,
                position: draggedNode.position,
                data: { ...node.data, position: draggedNode.position },
              }
            : binaryTrees[treeId].includes(node.id)
            ? {
                ...node,
                position: {
                  x: node.position.x + xDiff,
                  y: node.position.y + yDiff,
                },
                data: {
                  ...node.data,
                  position: {
                    x: node.position.x + xDiff,
                    y: node.position.y + yDiff,
                  },
                },
              }
            : node
        )
      );
    },
    [setNodes, initialNodePositions]
  );

  const handleAdjustTree = () => {
    nodes.forEach((node) => {
      console.log(node.position);
    });
  };

  return (
    <div className="Playground">
      <PlaygroundProvider handleNodeCreation={handleNodeCreation}>
        <ReactFlow
          colorMode="dark"
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
        >
          <div className="PlaygroundContent">
            <div className="toolKit">
              <button>LinkedList</button>
              <button onClick={handleBinaryTreeCreation}>BinaryTree</button>
              <button>Trie</button>
              <button className="last-button">Graph</button>
              <div className="space"></div>
              <button className="last-button" onClick={handleAdjustTree}>
                Format
              </button>
            </div>
            <IDE />
            <Background />
            <Controls />
          </div>
        </ReactFlow>
      </PlaygroundProvider>
    </div>
  );
}

export default Playground;
