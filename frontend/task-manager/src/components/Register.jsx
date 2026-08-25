import { useState } from "react";
import axios from "axios";

function Register({ onRegister, onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        {
          name,
          email,
          password,
        }
      );

      if (
        response.data.message ===
        "User registered successfully"
      ) {
        alert("Registration successful!");
        onRegister();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Create your Task Manager account
        </p>

        <form onSubmit={handleRegister} className="mt-8">

          <label className="block text-sm font-medium mb-2">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none"
            required
          />

          <label className="block text-sm font-medium mb-2 mt-5">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none"
            required
          />

          <label className="block text-sm font-medium mb-2 mt-5">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none"
            required
          />

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Create Account
          </button>

        </form>

        <button
          onClick={onBackToLogin}
          className="w-full mt-4 text-sm text-gray-500 hover:text-black"
        >
          Already have an account? Login
        </button>

      </div>

    </div>
  );
}

export default Register;