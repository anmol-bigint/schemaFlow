import React from "react";

function ProjectItem({ proj, isActive, onSelect, onDelete }) {
  return (
    <div
      onClick={() => onSelect(proj)}
      className={`group flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all duration-150 ${
        isActive
          ? "bg-[#1a253d]/80 border-blue-500/30 text-white shadow-md shadow-blue-950/15"
          : "bg-[#111726]/40 hover:bg-[#1a2336]/60 border-transparent hover:border-gray-800/80 text-gray-300 hover:text-white"
      }`}
    >
      <div className="flex-1 min-w-0 pr-2 select-none">
        <div className="text-xs font-medium truncate leading-tight">
          {proj.title || "Untitled Schema"}
        </div>
        <div className="text-[10px] text-gray-500 mt-1">
          {new Date(proj.updatedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <button
        onClick={(e) => onDelete(proj._id, e)}
        className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150 cursor-pointer"
        title="Delete Schema"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  );
}

export default ProjectItem;
