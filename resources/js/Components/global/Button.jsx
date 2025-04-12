import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = 'full',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'font-medium transition-colors duration-300';

  const variantStyles = {
    primary: 'bg-text text-white hover:bg-white hover:text-text hover:border hover:border-text',
    secondary: 'bg-[#e0e0e0] text-text hover:bg-[#d0d0d0]',
    outline: 'bg-transparent border border-text text-text hover:bg-text hover:text-white'
  };

  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const roundedStyles = {
    full: 'rounded-full',
    md: 'rounded-md',
    none: 'rounded-none'
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles[rounded]} ${className}`;

  return (
    <button
      className={combinedStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
