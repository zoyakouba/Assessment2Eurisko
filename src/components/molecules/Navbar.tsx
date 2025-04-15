// src/components/Navbar.tsx
import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import Button from "../atoms/Button";
import useThemeStore from "../../store/useThemeStore"; // Adjust path as needed

type NavbarProps = {
  onCreateUser: () => void;
  onLogout: () => void;
};

function Navbar({ onCreateUser, onLogout }: NavbarProps) {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header className="bg-[var(--primary-color)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">User Management</h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={onCreateUser}
            className="bg-white text-[var(--primary-color)]"
          >
            Create User
          </Button>
          <Button onClick={onLogout} color="red">
            Logout
          </Button>
          <Button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--primary-color)] hover:bg-blue-800"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-white" />
            ) : (
              <MoonIcon className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

