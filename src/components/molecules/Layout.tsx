import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useThemeStore from "../../store/useThemeStore";
import useAuthStore from "../../routes/useAuth";
import Button from "../atoms/Button"; 

const Layout = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen bg-gray-100 ${isDark ? "dark:bg-gray-900 text-white" : "text-black"}`}>
      <nav className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow">
        <h1 className="text-lg font-bold">User Management</h1>
        <div className="flex gap-4 items-center">
          <Button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white px-3 py-2 rounded"
          >
            {isDark ? "🌙" : "🌞"}
          </Button>
          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            color="red"
            className="px-4 py-2"
          >
            Logout
          </Button>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout
