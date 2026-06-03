import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectList from "./ProjectList";

function Sidebar({ isLoggedIn, projects, activeProject, onSelect, onDelete, onNew }) {
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className={`transition-all duration-300 bg-[#0c1220]/95 backdrop-blur-md border-r border-gray-800/80 flex flex-col h-full ${
        open ? "w-[260px]" : "w-[56px]"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-800/80 flex items-center justify-between text-white">
        {open ? (
          <>
            <span className="font-semibold text-xs tracking-wider text-gray-400 uppercase select-none">
              My Schemas
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="mx-auto p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>

      {/* Sidebar Body */}
      {open ? (
        isLoggedIn ? (
          <ProjectList
            projects={projects}
            activeProject={activeProject}
            onSelect={onSelect}
            onDelete={onDelete}
            onNew={onNew}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8 text-blue-500 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <p className="text-xs text-gray-400 font-medium px-2 leading-relaxed select-none">
              Sign in to save and view all of your schema projects.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
            >
              Sign In
            </button>
          </div>
        )
      ) : (
        /* Collapsed icon strip */
        <div className="flex-1 flex flex-col items-center pt-3 gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={onNew}
                className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-150 cursor-pointer"
                title="New Schema"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg bg-[#111726]/40 hover:bg-[#1a2336] text-gray-400 hover:text-white transition-all duration-150 cursor-pointer"
                title="View Saved Schemas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-150 cursor-pointer"
              title="Sign In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
