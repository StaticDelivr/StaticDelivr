"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  allowOpen?: boolean;
}

export function CodeBlock({
  code,
  language = "bash",
  showLineNumbers = false,
  className,
  allowOpen = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleOpen = () => {
    window.open(code, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-slate-950 border border-slate-800",
        className
      )}
    >
      {/* Language badge */}
      {language && (
        <div className="absolute top-2 left-3 text-xs text-slate-500 font-mono">
          {language}
        </div>
      )}

      {/* Actions */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {allowOpen && (
          <button
            onClick={handleOpen}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
              "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            )}
            aria-label="Open link"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Open</span>
          </button>
        )}
        
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
            "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white",
            copied && "bg-green-600 hover:bg-green-600 text-white"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre
        className={cn(
          "overflow-x-auto p-4 pt-8 text-sm text-slate-100",
          "font-mono leading-relaxed",
          showLineNumbers && "pl-12"
        )}
      >
        <code className="break-all whitespace-pre-wrap">{code}</code>
      </pre>

      {/* Click to copy hint for mobile */}
      <div
        onClick={handleCopy}
        className="absolute inset-0 cursor-pointer md:hidden"
        aria-label="Tap to copy"
      />
    </div>
  );
}

// Inline code component for shorter snippets
interface InlineCodeProps {
  code: string;
  className?: string;
}

export function InlineCode({ code, className }: InlineCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <code
      onClick={handleCopy}
      className={cn(
        "relative cursor-pointer rounded-md px-2 py-1 font-mono text-sm",
        "bg-slate-100 text-slate-800 hover:bg-slate-200",
        "dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
        "transition-colors duration-150",
        copied && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        className
      )}
      title="Click to copy"
    >
      {code}
      {copied && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-slate-900 text-white px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </code>
  );
}
