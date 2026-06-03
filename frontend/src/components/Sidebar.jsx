import React from "react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  isLoggedIn,
  projects,
  activeProject,
  searchQuery,
  setSearchQuery,
  onNewProject,
  onSelectProject,
  onDeleteProject,
  onLoginClick,
}) {
  const filteredProjects = projects.filter((p) =>
    (p.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`transition-all duration-300 bg-[#0c1220]/95 backdrop-blur-md border-r border-gray-800/80 flex flex-col h-full ${
        sidebarOpen ? "w-[260px]" : "w-[56px]"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-800/80 flex items-center justify-between text-white">
        {sidebarOpen ? (
          <>
            <span className="font-semibold text-xs tracking-wider text-gray-400 uppercase select-none">
              My Schemas
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Collapse Sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mx-auto p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Expand Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Sidebar Content */}
      {sidebarOpen ? (
        isLoggedIn ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Actions */}
            <button
              onClick={onNewProject}
              className="mx-3 mt-4 mb-2 flex items-center justify-center py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:translate-y-0 transform hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 mr-1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Schema
            </button>

            {/* Filter Search */}
            <div className="mx-3 my-2 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search schemas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded bg-[#131926] text-white text-xs border border-gray-800/80 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Projects List */}
            <div className="flex-1 overflow-y-auto px-2 pb-4 mt-1 space-y-1 scrollbar-thin">
              {filteredProjects.length === 0 ? (
                <div className="px-3 py-8 text-center text-xs text-gray-500 select-none">
                  {searchQuery ? "No matching schemas" : "No saved schemas yet."}
                </div>
              ) : (
                filteredProjects.map((p) => {
                  const isActive = activeProject && activeProject._id === p._id;
                  return (
                    <div
                      key={p._id}
                      onClick={() => onSelectProject(p)}
                      className={`group flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all duration-150 ${
                        isActive
                          ? "bg-[#1a253d]/80 border-blue-500/30 text-white shadow-md shadow-blue-950/15"
                          : "bg-[#111726]/40 hover:bg-[#1a2336]/60 border-transparent hover:border-gray-800/80 text-gray-300 hover:text-white"
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2 select-none">
                        <div className="text-xs font-medium truncate leading-tight">
                          {p.title || "Untitled Schema"}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1">
                          {new Date(p.updatedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <button
                        onClick={(e) => onDeleteProject(p._id, e)}
                        className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150 cursor-pointer"
                        title="Delete Schema"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="w-8 h-8 text-blue-500 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <p className="text-xs text-gray-400 font-medium px-2 leading-relaxed select-none">
              Sign in to save and view all of your schema projects.
            </p>
            <button
              onClick={onLoginClick}
              className="mt-4 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer transition-colors"
            >
              Sign In
            </button>
          </div>
        )
      ) : (
        <div className="flex-1 flex flex-col items-center pt-3 gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={onNewProject}
                className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-150 cursor-pointer"
                title="New Schema"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg bg-[#111726]/40 hover:bg-[#1a2336] text-gray-400 hover:text-white transition-all duration-150 cursor-pointer"
                title="View Saved Schemas"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-150 cursor-pointer"
              title="Sign In"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
