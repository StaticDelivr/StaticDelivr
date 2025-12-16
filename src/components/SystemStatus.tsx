"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SystemStatusProps {
  className?: string;
  variant?: 'header' | 'footer' | 'minimal';
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ 
  className,
  variant = 'header'
}) => {
  // In a real implementation, you might fetch actual status from an API
  // For now, we'll show a static "operational" status
  const isOperational = true;

  if (variant === 'minimal') {
    return (
      <Link
        href="/stats"
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors",
          className
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        Operational
      </Link>
    );
  }

  if (variant === 'footer') {
    return (
      <Link
        href="/stats"
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors",
          className
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        All Systems Operational
      </Link>
    );
  }

  // Default header variant
  return (
    <Link
      href="/stats"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 text-xs font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors",
        className
      )}
      title="View system status and statistics"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="hidden sm:inline">Systems Operational</span>
      <span className="sm:hidden">OK</span>
    </Link>
  );
};

export default SystemStatus;
