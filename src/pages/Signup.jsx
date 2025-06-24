import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/signup", form);
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-10 rounded-2xl w-full max-w-md flex flex-col gap-6 border border-gray-100"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50 text-gray-700 text-lg shadow-sm transition"
          required
        />

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
          className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition-transform text-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
