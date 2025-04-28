import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
  onToggleTheme: () => void;
}

const Navbar = ({ onLogout, onToggleTheme }: NavbarProps) => {
  return (
    <nav className="bg-[var(--primary-color)] text-white flex items-center justify-between px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/new"
          className="bg-white text-[var(--primary-color)] font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Create User
        </Link>
        <button
          onClick={onToggleTheme}
          className="bg-white text-[var(--primary-color)] font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Toggle Theme
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
