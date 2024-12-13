import React from 'react';

interface GradientCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  action?: {
    text: string;
    href: string;
  };
  className?: string;
}

const GradientCard = ({ 
  icon, 
  title, 
  description, 
  gradient, 
  iconBg,
  action,
  className = ''
}: GradientCardProps) => (
  <div className={`p-8 rounded-xl bg-gradient-to-br ${gradient} ${className}`}>
    <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    {action && (
      <a
        href={action.href}
        className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors border border-gray-200"
      >
        {action.text}
      </a>
    )}
  </div>
);

export default GradientCard;