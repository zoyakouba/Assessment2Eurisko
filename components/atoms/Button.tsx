import React from "react";
import { FC, ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  color?: "blue" | "red";
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  color = "blue",
  loading,
  className = "",
  disabled,
  ...props
}) => {
  const base = "px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed";

  const colorClass =
    color === "red"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : ""; 

  return (
    <button
      className={`${base} ${colorClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
