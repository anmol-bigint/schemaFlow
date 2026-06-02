import React from "react";

function Table({ name, attributes }) {
  return (
    <div className="bg-[#111827] text-white rounded-xl border border-[#374151] shadow-lg overflow-hidden min-w-[260px] w-40 h-auto">
      
      {/* Header */}
      <div className="bg-[#1f2937] px-4 py-3 border-b border-[#374151]">
        <h2 className="font-bold text-sm tracking-wide text-[#60a5fa]">
          {name}
        </h2>
      </div>

      {/* Attributes */}
      <div className="flex flex-col">
        {attributes.map((attr, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-2 border-b border-[#1f2937] hover:bg-[#1e293b] transition"
          >
            <span className="text-sm font-medium text-gray-200">
              {attr.name}
            </span>

            <span className="text-xs text-gray-400 bg-[#0f172a] px-2 py-1 rounded">
              {attr.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;