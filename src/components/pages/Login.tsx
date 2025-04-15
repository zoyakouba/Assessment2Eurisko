import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../routes/useAuth";
import useThemeStore from "../../store/useThemeStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();



  const handleLogin = async () => {
    if (!email || !password) {
      setError("Fill required fields.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.status === 401) {
        setError("Invalid email or password.");
        return;
      }
  
      const { accessToken, expiresIn } = data.result.data;
  
      setAuth(accessToken, expiresIn);
  
      // Optional: wait briefly to ensure Zustand persistence completes
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
  
    } catch (e) {
      console.log(e);
      setError("Login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='bg-gray-50 min-h-screen flex justify-center items-center'>
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-[var(--primary-color)] text-white w-full py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login