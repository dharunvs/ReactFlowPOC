import React from "react";
import { BaseEdge, getStraightPath } from "@xyflow/react";
import "./styles/StraightEdge.css";

function StraightEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return <BaseEdge className="StraightEdge" id={id} path={edgePath} />;
}

export default StraightEdge;
