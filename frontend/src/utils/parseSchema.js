// export default function parseSchema(input = "") {
//   const nodes = [];
//   const edges = [];

//   const tableRegex = /TABLE\s+(\w+)\s*\{([\s\S]*?)\}/gi;
//   const refRegex = /Ref\s*:\s*(\w+)\.(\w+)\s*->\s*(\w+)\.(\w+)/gi;

//   const tableIdMap = {};

//   let match;
//   let nodeIndex = 0;

//   /**
//    * 1. PARSE TABLES
//    */
//   while ((match = tableRegex.exec(input)) !== null) {
//     const tableName = match[1].trim();
//     const tableBody = match[2];

//     const schema = tableBody
//       .split("\n")
//       .map((line) => line.trim())
//       .filter(Boolean)
//       .map((line) => {
//         const parts = line.split(/\s+/);
//         if (parts.length < 2) return null;

//         const title = parts[0].toUpperCase();
//         const type = parts[1].toUpperCase();

//         const isPrimaryKey = /primary\s+key/i.test(line);

//         return {
//           title,
//           type,
//           isPrimaryKey,
//         };
//       })
//       .filter(Boolean);

//     const nodeId = String(nodeIndex + 1);

//     tableIdMap[tableName.toLowerCase()] = nodeId;

//     nodes.push({
//       id: nodeId,
//       position: {
//         x: nodeIndex * 350,
//         y: 0,
//       },
//       type: "databaseSchema",
//       data: {
//         label: tableName.toUpperCase(),
//         schema,
//       },
//     });

//     nodeIndex++;
//   }

//   /**
//    * 2. PARSE RELATIONS
//    * IMPORTANT: normalize to UPPERCASE to match handles
//    */
//   let refMatch;

//   while ((refMatch = refRegex.exec(input)) !== null) {
//     let [, sourceTable, sourceColumn, targetTable, targetColumn] =
//       refMatch;

//     sourceTable = sourceTable.toLowerCase();
//     targetTable = targetTable.toLowerCase();

//     const sourceId = tableIdMap[sourceTable];
//     const targetId = tableIdMap[targetTable];

//     if (!sourceId || !targetId) continue;

//     // 🔥 CRITICAL FIX: match schema handles exactly
//     const sourceHandle = sourceColumn.toUpperCase();
//     const targetHandle = targetColumn.toUpperCase();

//     edges.push({
//       id: `${sourceTable}-${sourceHandle}-${targetTable}-${targetHandle}`,
//       source: sourceId,
//       target: targetId,
//       sourceHandle,
//       targetHandle,
//     });
//   }

//   return {
//     tempNodes: nodes,
//     tempEdges: edges,
//   };
// }

import { Parser } from '@dbml/core';

export default function parseSchema(input = "") {
  if (!input.trim()) return { tempNodes: [], tempEdges: [] };

  let db;
  try {
    db = Parser.parse(input, 'dbml');
  } catch (e) {
    console.error('DBML Parse Error:', e.message);
    return { tempNodes: [], tempEdges: [] };
  }

  const tables = db.schemas[0].tables;
  const tableIdMap = {};
  const nodes = [];
  const edges = [];

  tables.forEach((table, index) => {
    const nodeId = String(index + 1);
    tableIdMap[table.name.toLowerCase()] = nodeId;

    const schema = table.fields.map((field) => ({
      title: field.name,
      type: field.type.type_name,
      isPrimaryKey: field.pk ?? false,
    }));

    nodes.push({
      id: nodeId,
      position: { x: index * 350, y: 0 },
      type: 'databaseSchema',
      data: {
        label: table.name.toUpperCase(),
        schema,
      },
    });
  });

  db.schemas[0].refs.forEach((ref, index) => {
    const [endpoint1, endpoint2] = ref.endpoints;

    const sourceTable = endpoint1.tableName.toLowerCase();
    const targetTable = endpoint2.tableName.toLowerCase();

    const sourceId = tableIdMap[sourceTable];
    const targetId = tableIdMap[targetTable];

    if (!sourceId || !targetId) return;

    edges.push({
      id: `edge-${index}`,
      source: sourceId,
      target: targetId,
      sourceHandle: endpoint1.fieldNames[0],
      targetHandle: endpoint2.fieldNames[0],
    });
  });

  return { tempNodes: nodes, tempEdges: edges };
}