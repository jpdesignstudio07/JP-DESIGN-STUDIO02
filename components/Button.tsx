import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 font-semibold transition-all duration-300 rounded-md shadow-md hover:-translate-y-1 active:scale-95";
  
  const variants = {
    primary: "bg-jp-yellow text-jp-dark hover:bg-yellow-400 border border-transparent",
    secondary: "bg-jp-card text-white hover:bg-[#3A395C] border border-white/10",
    outline: "bg-transparent border-2 border-jp-yellow text-jp-yellow hover:bg-jp-yellow hover:text-jp-dark"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};