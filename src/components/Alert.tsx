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
    default: 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-zinc-200',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
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
