import { useEffect } from "react";
import { Background, ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import DatabaseSchemaDemo from "./Node";

const nodeTypes = {
  databaseSchema: DatabaseSchemaDemo,
};

export default function Main({ compiled }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(compiled.nodes);
    setEdges(compiled.edges);
  }, [compiled]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}