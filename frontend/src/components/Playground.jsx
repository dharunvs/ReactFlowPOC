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
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "BinaryTreeNode",
      position: rootPosition,
      data: {
        id: "1",
        label: "10",
        position: rootPosition,
        parent: null,
        type: "root",
      },
    },
  ]);

  const [currentRootPosition, setCurrentRootPosition] = useState(rootPosition);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleNodeCreation = useCallback(
    (parentId, position, direction) => {
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
          id: newNodeId,
          label: "",
          position: {
            x: position.x + (direction === "left" ? -1 : 1) * minDistanceX,
            y: position.y + 100,
          },
          parent: parentId,
          type: direction,
        },
        draggable: false,
      };
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

  const onNodeDrag = useCallback((event, node) => {
    setNodes((nds) =>
      nds.map((n) => {
        return n;
      })
    );
  });

  const onNodeDragStop = useCallback(
    (_, rootNode) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          return rootNode.id !== node.id
            ? {
                ...node,
                position: node.position,
                data: { ...node.data, position: node.position },
              }
            : node;
        })
      );
    },
    [setNodes]
  );

  // const onNodeDragStop = useCallback(
  //   (event, rootNode) => {
  //     console.log(currentRootPosition);
  //     setCurrentRootPosition((prevRootPosition) => {
  //       const xDiff = prevRootPosition.x - rootNode.position.x;
  //       const yDiff = prevRootPosition.y - rootNode.position.y;

  //       // Calculate the new root position
  //       const newRootPosition = {
  //         x: rootNode.position.x,
  //         y: rootNode.position.y,
  //       };

  //       // Update node positions based on the difference
  //       setNodes((nodes) =>
  //         nodes.map((node) => {
  //           const updatedPosition = {
  //             x: node.position.x - xDiff,
  //             y: node.position.y - yDiff,
  //           };
  //           return rootNode.id !== node.id
  //             ? {
  //                 ...node,
  //                 position: updatedPosition,
  //                 data: { ...node.data, position: updatedPosition },
  //               }
  //             : node;
  //         })
  //       );

  //       return newRootPosition;
  //     });
  //   },
  //   [setNodes]
  // );

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
          onNodeDragStop={onNodeDragStop}
          onNodeDrag={onNodeDrag}
          nodeTypes={nodeTypes}
        >
          <div className="PlaygroundContent">
            <div className="toolKit">
              <button>LinkedList</button>
              <button>BinaryTree</button>
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
