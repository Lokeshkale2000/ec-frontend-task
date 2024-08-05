import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
      });

      if (response.data.data.result === "OK") {
        setMessage("Registration successful! Redirecting to login...");
        setEmail("");
        setPassword("");
        setError("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="bg-blue-300 shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Register</h2>
        {message && (
          <p className="text-green-500 text-center mb-4" aria-live="polite">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-center mb-4" aria-live="polite">
            {error}
          </p>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors duration-300`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account?</span>
          <a
            href="/login"
            className="inline-block mt-2 text-blue-500 hover:text-blue-700 font-medium underline transition-colors duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
