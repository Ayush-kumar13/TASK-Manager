import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.message === "Login successful") {
        onLogin(response.data);
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Login to your Task Manager
        </p>

        <form onSubmit={handleLogin} className="mt-8">

          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-gray-400"
          />

          <label className="block text-sm font-medium mb-2 mt-5">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-gray-400"
          />

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;