import React from "react";
import { Handle, Position } from "@xyflow/react";
import "./styles/BinaryTreeNode.css";

import { usePlayground } from "../../contexts/PlaygroundContext";

function BinaryTreeNode(nodeData) {
  const data = nodeData.data;
  const { handleNodeCreation } = usePlayground();

  const handleClick = (direction) => {
    handleNodeCreation(data.id, data.position, direction);
  };

  return (
    <div className="BinaryTreeNode">
      <div className="data">{data.label || "Node"}</div>
      <Handle
        className="handle-top"
        type="target"
        id={`${data.id}-top`}
        position={Position.Top}
      />
      <Handle
        className="handle-left"
        type="source"
        id={`${data.id}-left`}
        position={Position.Left}
        onClick={() => handleClick("left")}
      />
      <Handle
        className="handle-right"
        type="source"
        id={`${data.id}-right`}
        position={Position.Right}
        onClick={() => handleClick("right")}
      />
    </div>
  );
}

export default BinaryTreeNode;
