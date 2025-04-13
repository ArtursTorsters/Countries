import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = 'md',
  className = '',
  ...props
}) => {
  const styles = {
    base: 'font-medium transition-colors duration-300',

    variant: {
      primary: 'bg-white text-dark hover:bg-gray-300',
      secondary: 'bg-gray-200 text-text hover:bg-gray-300',
      outline: 'bg-transparent border border-brand text-brand hover:bg-brand/10'
    },

    size: {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2',
      large: 'px-6 py-3 text-lg'
    },

    rounded: {
      full: 'rounded-full',
      md: 'rounded-md',
      none: 'rounded-none'
    }
  };

  const buttonClasses = `
    ${styles.base}
    ${styles.variant[variant]}
    ${styles.size[size]}
    ${styles.rounded[rounded]}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
