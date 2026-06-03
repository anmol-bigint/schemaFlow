import React from "react";
import ProjectItem from "./ProjectItem";

function ProjectList({ projects, activeProject, onSelect, onDelete, searchQuery, setSearchQuery, onNew }) {
  const filtered = projects.filter((p) =>
    (p.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* New Schema Button */}
      <button
        onClick={onNew}
        className="mx-3 mt-4 mb-2 flex items-center justify-center py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-blue-500/10 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Schema
      </button>

      {/* Search */}
      <div className="mx-3 my-2 relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search schemas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 rounded bg-[#131926] text-white text-xs border border-gray-800/80 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-500"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 mt-1 space-y-1 scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="px-3 py-8 text-center text-xs text-gray-500 select-none">
            {searchQuery ? "No matching schemas" : "No saved schemas yet."}
          </div>
        ) : (
          filtered.map((p) => (
            <ProjectItem
              key={p._id}
              proj={p}
              isActive={activeProject?._id === p._id}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectList;
