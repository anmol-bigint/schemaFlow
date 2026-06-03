import React from "react";

function Toolbar({ isLoggedIn, title, setTitle, onSave, onShare, onCompile }) {
  return (
    <div className="p-3 border-b border-gray-800/80 bg-[#0c1220]/80 flex gap-2.5 items-center backdrop-blur-md">
      {isLoggedIn && (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Schema Title..."
            className="flex-1 px-3 py-1.5 rounded-md bg-[#161d30]/70 text-white text-xs border border-gray-800/80 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 placeholder:text-gray-500"
          />
          <button
            onClick={onSave}
            className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={onShare}
            className="px-4 py-1.5 text-xs font-semibold bg-purple-600/15 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/20 hover:border-purple-500 rounded-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            Share
          </button>
        </>
      )}
      <button
        onClick={onCompile}
        className="px-4 py-1.5 text-xs font-semibold bg-green-600/15 hover:bg-green-600 text-green-400 hover:text-white border border-green-500/20 hover:border-green-500 rounded-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
      >
        Compile
      </button>
    </div>
  );
}

export default Toolbar;
