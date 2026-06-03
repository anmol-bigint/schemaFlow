import { useNavigate } from "react-router-dom";

function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="header w-full h-[6%] bg-[#0e1320] border-b border-gray-800/80 flex items-center justify-between px-6 text-white shadow-md shadow-black/10">
      <div className="w-[120px]" />

      <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent select-none tracking-tight">
        SchemaFlow
      </h1>

      {isLoggedIn ? (
        <button
          onClick={logout}
          className="px-4 py-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 rounded-md transition-all duration-200 cursor-pointer"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-150 cursor-pointer"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Header;
