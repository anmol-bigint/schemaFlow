import { memo } from "react";
import { Position } from "@xyflow/react";
import { LabeledHandle } from "@/components/labeled-handle";
import {
  DatabaseSchemaNode,
  DatabaseSchemaNodeHeader,
  DatabaseSchemaNodeBody,
  DatabaseSchemaTableRow,
  DatabaseSchemaTableCell,
} from "@/components/database-schema-node";

const DatabaseSchemaDemo = memo(({ data }) => {
  return (
    <DatabaseSchemaNode className="p-0">
      <DatabaseSchemaNodeHeader>{data.label}</DatabaseSchemaNodeHeader>
      <DatabaseSchemaNodeBody>
        {data.schema.map((entry) => (
          <DatabaseSchemaTableRow key={entry.title} isPrimaryKey={entry.isPrimaryKey}>
            <DatabaseSchemaTableCell className="pl-0 pr-6 font-light">
              <LabeledHandle
                id={entry.title}
                title={entry.isPrimaryKey ? `${entry.title} 🔑` : entry.title}
                type="target"
                position={Position.Left}
                labelClassName={entry.isPrimaryKey ? "text-yellow-300 font-semibold" : "text-gray-300"}
              />
            </DatabaseSchemaTableCell>
            <DatabaseSchemaTableCell className="pr-0 font-thin">
              <LabeledHandle
                id={entry.title}
                title={entry.type}
                type="source"
                position={Position.Right}
                className="p-0"
                handleClassName="p-0"
                labelClassName={`p-0 w-full pr-3 text-right ${entry.isPrimaryKey ? "text-yellow-300 font-semibold" : "text-gray-400"}`}
              />
            </DatabaseSchemaTableCell>
          </DatabaseSchemaTableRow>
        ))}
      </DatabaseSchemaNodeBody>
    </DatabaseSchemaNode>
  );
});

DatabaseSchemaDemo.displayName = "DatabaseSchemaDemo";

export default DatabaseSchemaDemo;