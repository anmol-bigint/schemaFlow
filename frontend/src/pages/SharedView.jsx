import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Main from "@/components/Main";
import parseSchema from "@/utils/parseSchema";

export default function SharedView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leftWidth, setLeftWidth] = useState(40);
  const [schema, setSchema] = useState("");
  const [title, setTitle] = useState("Shared Schema");
  const [compiled, setCompiled] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    async function load() {
      try {
        const rawBaseUrl = import.meta.env.VITE_API_URL || "";
        const BASE_URL = rawBaseUrl.replace(/\/+$/, "");
        const res = await axios.get(
          `${BASE_URL}/api/schema/${id}`
        );
        setTitle(res.data.title || "Shared Schema");
        setSchema(res.data.dbml || "");
        
        const { tempNodes, tempEdges } = parseSchema(res.data.dbml || "");
        setCompiled({ nodes: tempNodes, edges: tempEdges });
      } catch (err) {
        console.error("Failed to load shared schema:", err);
      }
    }

    load();
  }, [id]);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = leftWidth;

    const handleMouseMove = (e) => {
      const newWidth =
        startWidth +
        ((e.clientX - startX) / window.innerWidth) * 100;

      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="wrapper flex flex-col w-full h-screen bg-[#080c14] gap-1">
      {/* Header */}
      <div className="header w-full h-[5%] bg-[#1a2030] flex items-center justify-between px-4 text-white">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Home
        </button>

        <h1 className="font-semibold text-sm text-gray-200 truncate max-w-[50%]">
          {title} <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded ml-2">Shared View</span>
        </h1>

        <div className="w-[80px]" />
      </div>

      {/* Body */}
      <div className="body w-full flex-1 flex overflow-hidden">
        {/* Left Panel - Code Viewer */}
        <div
          className="TextSection h-full bg-[#080c14] flex flex-col"
          style={{
            width: `${leftWidth}%`,
          }}
        >
          {/* Header */}
          <div className="p-3 border-b border-gray-700/60 bg-[#0c1220]/80 flex items-center justify-between text-gray-300">
            <span className="font-semibold text-xs tracking-wider uppercase">DBML Source</span>
            <span className="text-[10px] text-gray-500">Read-Only</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <textarea
              readOnly
              value={schema}
              placeholder="No schema content found"
              className="w-full h-full p-4 text-xs font-mono text-gray-300 bg-[#080c14] border-0 focus:outline-none resize-none selection:bg-blue-500/20 scrollbar-thin"
            />
          </div>
        </div>

        {/* Resizer */}
        <div
          className="w-1 bg-gray-500 cursor-col-resize hover:bg-blue-500"
          onMouseDown={handleMouseDown}
        />

        {/* Right Panel - Flow Diagram */}
        <div className="DiagramSection flex-1 h-full flex gap-1 items-start">
          <Main compiled={compiled} />
        </div>
      </div>

      {/* Footer */}
      <div className="footer w-full h-[5%] bg-[#1a2030]" />
    </div>
  );
}