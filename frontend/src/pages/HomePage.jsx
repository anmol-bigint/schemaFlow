import TextArea from "@/components/TextArea";
import Main from "@/components/Main";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Toolbar from "@/components/Toolbar/Toolbar";
import Resizer from "@/components/Resizer/Resizer";
import Footer from "@/components/Footer/Footer";
import { useProjects } from "@/hooks/useProjects";
import { useResizer } from "@/hooks/useResizer";

function HomePage() {
  const { leftWidth, handleMouseDown } = useResizer(40);

  const {
    projects,
    project,
    title,
    setTitle,
    schema,
    setSchema,
    compiled,
    isLoggedIn,
    handleSelectProject,
    handleNewProject,
    handleCompile,
    handleSaveProject,
    handleDeleteProject,
    handleCopyShareLink,
  } = useProjects();

  return (
    <div className="wrapper flex flex-col w-full h-screen bg-[#080c14] gap-0">
      <Header isLoggedIn={isLoggedIn} />

      <div className="body w-full h-[90%] flex overflow-hidden">
        <Sidebar
          isLoggedIn={isLoggedIn}
          projects={projects}
          activeProject={project}
          onSelect={handleSelectProject}
          onDelete={handleDeleteProject}
          onNew={handleNewProject}
        />

        {/* Left Panel */}
        <div
          className="TextSection h-full bg-[#080c14] flex flex-col"
          style={{ width: `${leftWidth}%` }}
        >
          <Toolbar
            isLoggedIn={isLoggedIn}
            title={title}
            setTitle={setTitle}
            onSave={handleSaveProject}
            onShare={handleCopyShareLink}
            onCompile={handleCompile}
          />
          <div className="flex-1 overflow-hidden">
            <TextArea schema={schema} setSchema={setSchema} />
          </div>
        </div>

        <Resizer onMouseDown={handleMouseDown} />

        <div className="DiagramSection flex-1 h-full flex gap-1 items-start">
          <Main compiled={compiled} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;