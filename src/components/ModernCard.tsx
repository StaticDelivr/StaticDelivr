import React, { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  glass = false 
}) => {
  return (
    <div
      className={`
        rounded-2xl p-6 transition-all duration-300
        ${glass ? 'glass' : 'bg-white border border-gray-200'}
        ${hover ? 'hover-lift hover:border-blue-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ModernCard;
