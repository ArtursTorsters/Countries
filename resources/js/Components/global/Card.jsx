import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'md',
  border = false,
  hoverEffect = false,
  ...props
}) => {
  const paddingStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };

  const cardClasses = `
    bg-white
    ${paddingStyles[padding]}
    ${shadowStyles[shadow]}
    ${roundedStyles[rounded]}
    ${border ? 'border border-gray-200' : ''}
    ${hoverEffect ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} {...props}>
      {title && (
        <div className="mb-3">
          <h3 className="text-text text-xl font-medium">{title}</h3>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
