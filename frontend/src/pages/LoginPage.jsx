import Input from "@/components/ui/Input";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
    // Validation
    if (!data.email || !data.password) {
      alert("Email and password are required");
      return;
    }

    if (isRegister && !data.name) {
      alert("Name is required");
      return;
    }

    const url = isRegister ? `${BASE_URL}/api/user/signup` : `${BASE_URL}/api/user/login`;

    const response = await axios.post(url, data);

    console.log(response.data);

    // Save token if your backend returns one
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }

    // Optional: Reset form
    setData({
      name: "",
      email: "",
      password: "",
    });
    
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#080c14] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25)_0%,_transparent_60%)]">
      <div
        className="
        flex justify-center items-center flex-col
        max-w-md w-full mx-4 px-8 py-10
        rounded-2xl
        border border-gray-800/80
        bg-[#0e1629]/75
        backdrop-blur-xl
        shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent select-none tracking-tight mb-1">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-xs text-gray-400 font-medium mb-6">
          {isRegister ? "Create your new account" : "Sign in to your account"}
        </p>
        <form
          action=""
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit}
        >
          {isRegister && (
            <Input
              label="Name"
              field="name"
              placeholder="Anmol"
              data={data}
              setData={setData}
            />
          )}
          <Input
            label="Email"
            field="email"
            type="email"
            placeholder="abcd@xyz.com"
            data={data}
            setData={setData}
          />
          <Input
            label="Password"
            field="password"
            type="password"
            placeholder="••••••••"
            data={data}
            setData={setData}
          />
          <button
            className="w-full py-2.5 rounded-lg font-semibold mt-2
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    hover:from-blue-500 hover:to-indigo-500
                    hover:-translate-y-0.5 active:translate-y-0
                    shadow-[0_4px_20px_rgba(59,130,246,0.2)]
                    transition-all duration-200 cursor-pointer text-white text-xs"
            type="submit"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 select-none">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-300 font-semibold mx-1.5 cursor-pointer transition-colors"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
