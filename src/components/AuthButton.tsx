import React from "react";

interface AuthButtonProps {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  variant = "secondary",
  children,
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "px-4 py-2 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg focus:ring-indigo-500",
    secondary:
      "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 focus:ring-indigo-500",
    danger:
      "text-red-600 hover:text-red-800 hover:bg-red-50 focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default AuthButton;
