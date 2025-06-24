import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { setToken } from "../auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/login", form);
      setToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-10 rounded-2xl w-full max-w-md flex flex-col gap-6 border border-gray-100"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Log In
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700 text-lg shadow-sm transition"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50 text-gray-700 text-lg shadow-sm transition"
          required
        />

        <button
          type="submit"
          className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-transform text-lg"
        >
          Log In
        </button>

        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 underline hover:text-purple-800">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
