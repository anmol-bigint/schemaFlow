import React from "react";

import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
} from "@/components/base-node";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

export const DatabaseSchemaNodeHeader = ({
  children
}) => {
  return (
    <BaseNodeHeader
      className="rounded-tl-md rounded-tr-md bg-[#131b2e]/90 border-b border-gray-800/80 px-4 py-2.5 text-center text-xs font-bold tracking-wider uppercase text-blue-400 select-none">
      <h2>{children}</h2>
    </BaseNodeHeader>
  );
};

export const DatabaseSchemaNodeBody = ({
  children
}) => {
  return (
    <BaseNodeContent className="p-0">
      <table className="border-spacing-0 overflow-visible w-full">
        <TableBody>{children}</TableBody>
      </table>
    </BaseNodeContent>
  );
};

export const DatabaseSchemaTableRow = ({
  children,
  className,
  isPrimaryKey
}) => {
  return (
    <TableRow
      className={`relative text-xs transition-all duration-150 border-b border-gray-950/40 ${
        isPrimaryKey
          ? "bg-yellow-500/10 hover:bg-yellow-500/15 text-yellow-300 font-semibold border-y border-yellow-500/20"
          : "hover:bg-[#1a2336]/40 text-gray-300"
      } ${className || ""}`}
    >
      {children}
    </TableRow>
  );
};

export const DatabaseSchemaTableCell = ({
  className,
  children
}) => {
  return <TableCell className={`py-2 px-3 align-middle ${className || ""}`}>{children}</TableCell>;
};

export const DatabaseSchemaNode = ({
  className,
  children
}) => {
  return (
    <BaseNode
      className={`p-0 overflow-hidden bg-[#0c1220]/80 backdrop-blur-md border border-gray-800/80 hover:border-blue-500/30 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-lg min-w-[240px] in-[.selected]:border-blue-500/60 in-[.selected]:ring-1 in-[.selected]:ring-blue-500/20 ${
        className || ""
      }`}
    >
      {children}
    </BaseNode>
  );
};
