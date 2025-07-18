import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (formData.name.length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${apiUrl}/login`,
        formData
      );
      const { message, token } = response.data;
      localStorage.setItem("token", token); // Consider secure alternatives
      setSuccess(message);
      setFormData({ name: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f8fc]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow p-10 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            aria-required="true"
            disabled={loading}
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ring-blue-300"
          />
        </div>

        {/* <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            aria-required="true"
            disabled={loading}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ring-blue-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-gray-500 mt-1"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
          <p className="text-xs text-right text-gray-500 mt-1 cursor-pointer hover:underline">
            Forgot Password?
          </p> 
        </div> */}

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            aria-required="true"
            disabled={loading}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 border rounded-md outline-none focus:ring-2 ring-blue-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
            tabIndex={-1}  // So it doesn’t get focus in tab order, optional
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // You can use an SVG eye-off icon here
              // <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.08.21-2.113.585-3.07m14.38 14.38A9.963 9.963 0 0112 19c-1.357 0-2.646-.323-3.772-.892M15 12a3 3 0 01-6 0 3 3 0 016 0z" />
              // </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.08.21-2.113.585-3.07m2.121-2.121A9.963 9.963 0 0112 5c5.523 0 10 4.477 10 10 0 1.08-.21 2.113-.585 3.07M15 12a3 3 0 01-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>

            ) : (
              // SVG eye icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>


        {error && (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-sm" role="status">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;