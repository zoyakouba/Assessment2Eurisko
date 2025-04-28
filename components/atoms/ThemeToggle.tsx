// src/components/ThemeToggle.tsx
import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import useThemeStore from "../../store/useThemeStore";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="bg-white text-primary p-2 rounded-md hover:bg-gray-100 transition"
      title="Toggle Theme"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  )
}

export default ThemeToggle
