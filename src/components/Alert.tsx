import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  [key: string]: unknown;
}

const Alert: React.FC<AlertProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseClasses = 'p-4 rounded-lg border flex items-start gap-3';

  const variants = {
    default: 'bg-gray-50 border-gray-200 text-gray-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div
      role="alert"
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const AlertTitle: React.FC<AlertTitleProps> = ({ children, className = '', ...props }) => {
  return (
    <h5 className={`text-lg font-semibold mb-1 ${className}`} {...props}>
      {children}
    </h5>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Alert, AlertTitle, AlertDescription };
