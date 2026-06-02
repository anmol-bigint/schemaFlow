import React, { useState } from "react";
import Main from "@/components/Main";
import TextArea from "@/components/TextArea";
import parseSchema from "@/utils/parseSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [leftWidth, setLeftWidth] = useState(40);
  const [schema, setSchema] = useState("");
  const [compiled, setCompiled] = useState({
    nodes: [],
    edges: [],
  });

  const [title, setTitle] = useState("");
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const isLoggedIn = !!localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/api/schema`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
    }
  }, [isLoggedIn]);

  const handleSelectProject = (proj) => {
    setProject(proj);
    setTitle(proj.title || "");
    setSchema(proj.dbml || "");

    try {
      const { tempNodes, tempEdges } = parseSchema(proj.dbml || "");
      setCompiled({
        nodes: tempNodes,
        edges: tempEdges,
      });
    } catch (err) {
      console.error("Parse error on project load:", err);
    }
  };

  const handleNewProject = () => {
    setProject(null);
    setTitle("");
    setSchema("");
    setCompiled({
      nodes: [],
      edges: [],
    });
  };

  async function deleteProject(projectId, e) {
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this schema?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`${BASE_URL}/api/schema/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Project deleted successfully");

      if (project && project._id === projectId) {
        handleNewProject();
      }

      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project");
    }
  }

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
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );
    window.addEventListener(
      "mouseup",
      handleMouseUp
    );
  };

  function compile() {
    const { tempNodes, tempEdges } =
      parseSchema(schema);

    setCompiled({
      nodes: tempNodes,
      edges: tempEdges,
    });
  }

  async function saveProject() {
    try {
      if (!title.trim()) {
        alert("Please enter a title");
        return;
      }

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (project && project._id) {
        // Update existing project
        const response = await axios.put(
          `${BASE_URL}/api/schema/${project._id}`,
          {
            title,
            dbml: schema,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProject(response.data);
        alert("Project updated successfully!");
      } else {
        // Create new project
        const response = await axios.post(
          `${BASE_URL}/api/schema`,
          {
            title,
            dbml: schema,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProject(response.data);
        alert("Project saved successfully!");
      }

      fetchProjects();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to save project"
      );
    }
  }

  async function copyShareLink() {
    try {
      if (!project?.shareId) {
        alert("Please save the project first");
        return;
      }

      const shareUrl = `${window.location.origin}/share/${project.shareId}`;

      await navigator.clipboard.writeText(
        shareUrl
      );

      alert("Share link copied!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy link");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  const filteredProjects = projects.filter((p) =>
    (p.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="wrapper flex flex-col w-full h-screen bg-[#080c14] gap-0">

      {/* Header */}
      <div className="header w-full h-[6%] bg-[#0e1320] border-b border-gray-800/80 flex items-center justify-between px-6 text-white shadow-md shadow-black/10">

        <div className="w-[120px]" />

        <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent select-none tracking-tight">
          SchemaFlow
        </h1>

        {isLoggedIn ? (
          <button
            onClick={logout}
            className="px-4 py-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 rounded-md transition-all duration-200 shadow-lg shadow-red-500/5 hover:shadow-red-500/15 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() =>
              navigate("/login")
            }
            className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      {/* Body */}
      <div className="body w-full h-[90%] flex overflow-hidden">

        {/* Sleek Projects Sidebar */}
        <div 
          className={`transition-all duration-300 bg-[#0c1220]/95 backdrop-blur-md border-r border-gray-800/80 flex flex-col h-full ${
            sidebarOpen ? "w-[260px]" : "w-[56px]"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-800/80 flex items-center justify-between text-white">
            {sidebarOpen ? (
              <>
                <span className="font-semibold text-xs tracking-wider text-gray-400 uppercase select-none">My Schemas</span>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Collapse Sidebar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              </>
            ) : (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="mx-auto p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Expand Sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
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
                  onClick={handleNewProject}
                  className="mx-3 mt-4 mb-2 flex items-center justify-center py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:translate-y-0 transform hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  New Schema
                </button>

                {/* Filter Search */}
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

                {/* Projects List */}
                <div className="flex-1 overflow-y-auto px-2 pb-4 mt-1 space-y-1 scrollbar-thin">
                  {filteredProjects.length === 0 ? (
                    <div className="px-3 py-8 text-center text-xs text-gray-500 select-none">
                      {searchQuery ? "No matching schemas" : "No saved schemas yet."}
                    </div>
                  ) : (
                    filteredProjects.map((p) => {
                      const isActive = project && project._id === p._id;
                      return (
                        <div
                          key={p._id}
                          onClick={() => handleSelectProject(p)}
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
                                minute: "2-digit"
                              })}
                            </div>
                          </div>
                          <button
                            onClick={(e) => deleteProject(p._id, e)}
                            className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150 cursor-pointer"
                            title="Delete Schema"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8 text-blue-500 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p className="text-xs text-gray-400 font-medium px-2 leading-relaxed select-none">
                  Sign in to save and view all of your schema projects.
                </p>
                <button
                  onClick={() => navigate("/login")}
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
                    onClick={handleNewProject}
                    className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-150 cursor-pointer"
                    title="New Schema"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSidebarOpen(true)}
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

        {/* Left Panel */}
        <div
          className="TextSection h-full bg-[#080c14] flex flex-col"
          style={{
            width: `${leftWidth}%`,
          }}
        >
          {/* Toolbar */}
          <div className="p-3 border-b border-gray-800/80 bg-[#0c1220]/80 flex gap-2.5 items-center backdrop-blur-md">

            {isLoggedIn && (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Schema Title..."
                  className="
                    flex-1
                    px-3
                    py-1.5
                    rounded-md
                    bg-[#161d30]/70
                    text-white
                    text-xs
                    border border-gray-800/80
                    focus:outline-none
                    focus:border-blue-500/80
                    focus:ring-1
                    focus:ring-blue-500/30
                    transition-all
                    duration-200
                    placeholder:text-gray-500
                  "
                />

                <button
                  onClick={saveProject}
                  className="
                    px-4 py-1.5
                    text-xs
                    font-semibold
                    bg-blue-600
                    hover:bg-blue-500
                    text-white
                    rounded-md
                    shadow-md
                    shadow-blue-500/10
                    hover:shadow-blue-500/20
                    transform hover:-translate-y-0.5
                    active:translate-y-0
                    transition-all
                    duration-150
                    cursor-pointer
                  "
                >
                  Save
                </button>

                <button
                  onClick={copyShareLink}
                  className="
                    px-4 py-1.5
                    text-xs
                    font-semibold
                    bg-purple-600/15
                    hover:bg-purple-600
                    text-purple-400
                    hover:text-white
                    border border-purple-500/20
                    hover:border-purple-500
                    rounded-md
                    shadow-md
                    shadow-purple-500/5
                    hover:shadow-purple-500/15
                    transform hover:-translate-y-0.5
                    active:translate-y-0
                    transition-all
                    duration-150
                    cursor-pointer
                  "
                >
                  Share
                </button>
              </>
            )}

            <button
              onClick={compile}
              className="
                px-4 py-1.5
                text-xs
                font-semibold
                bg-green-600/15
                hover:bg-green-600
                text-green-400
                hover:text-white
                border border-green-500/20
                hover:border-green-500
                rounded-md
                shadow-md
                shadow-green-500/5
                hover:shadow-green-500/15
                transform hover:-translate-y-0.5
                active:translate-y-0
                transition-all
                duration-150
                cursor-pointer
              "
            >
              Compile
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <TextArea
              schema={schema}
              setSchema={setSchema}
            />
          </div>
        </div>

        {/* Resizer */}
        <div
          className="w-[3px] bg-gray-900 hover:bg-blue-500/80 cursor-col-resize transition-colors duration-150"
          onMouseDown={handleMouseDown}
        />

        {/* Diagram */}
        <div className="DiagramSection flex-1 h-full flex gap-1 items-start">
          <Main compiled={compiled} />
        </div>
      </div>

      {/* Footer */}
      <div className="footer w-full h-[4%] bg-[#0c1220] border-t border-gray-800/60 flex items-center justify-center shadow-inner">
        <span className="text-[10px] text-gray-500 font-medium select-none tracking-wider">
          SchemaFlow v1.0 &bull; Connected to Database
        </span>
      </div>
    </div>
  );
}

export default HomePage;