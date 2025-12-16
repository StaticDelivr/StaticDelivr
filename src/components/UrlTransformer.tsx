"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Copy, Check, ArrowRight, Github, Package, ExternalLink } from 'lucide-react';

type TransformMode = 'github' | 'npm' | 'auto';

interface UrlTransformerProps {
  className?: string;
}

export const UrlTransformer: React.FC<UrlTransformerProps> = ({ className }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<TransformMode>('auto');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const detectMode = useCallback((value: string): TransformMode => {
    if (value.includes('github.com') || value.includes('raw.githubusercontent.com')) {
      return 'github';
    }
    if (value.includes('npmjs.com') || value.startsWith('@') || /^[a-z0-9-_.]+(@|$)/i.test(value)) {
      return 'npm';
    }
    return 'auto';
  }, []);

  const transformGithubUrl = useCallback((url: string): string => {
    // Handle raw.githubusercontent.com URLs
    // Format: https://raw.githubusercontent.com/user/repo/branch/path/to/file
    const rawMatch = url.match(/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)/);
    if (rawMatch) {
      const [, user, repo, branch, path] = rawMatch;
      return `https://cdn.staticdelivr.com/gh/${user}/${repo}/${branch}/${path}`;
    }

    // Handle github.com blob URLs
    // Format: https://github.com/user/repo/blob/branch/path/to/file
    const blobMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)/);
    if (blobMatch) {
      const [, user, repo, branch, path] = blobMatch;
      return `https://cdn.staticdelivr.com/gh/${user}/${repo}/${branch}/${path}`;
    }

    // Handle github.com raw URLs (clicking "Raw" button)
    // Format: https://github.com/user/repo/raw/branch/path/to/file
    const rawGhMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)/);
    if (rawGhMatch) {
      const [, user, repo, branch, path] = rawGhMatch;
      return `https://cdn.staticdelivr.com/gh/${user}/${repo}/${branch}/${path}`;
    }

    // If it's just a partial path like "user/repo/branch/file"
    const partialMatch = url.match(/^([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);
    if (partialMatch) {
      const [, user, repo, branch, path] = partialMatch;
      return `https://cdn.staticdelivr.com/gh/${user}/${repo}/${branch}/${path}`;
    }

    throw new Error('Invalid GitHub URL format');
  }, []);

  const transformNpmPackage = useCallback((input: string): string => {
    let cleaned = input.trim();
    
    // Handle npmjs.com URLs
    // Format: https://www.npmjs.com/package/package-name
    const npmUrlMatch = cleaned.match(/npmjs\.com\/package\/([^/\s?#]+)/);
    if (npmUrlMatch) {
      return `https://cdn.staticdelivr.com/npm/${npmUrlMatch[1]}`;
    }

    // Handle package@version/file format
    // e.g., "react@18.2.0/umd/react.production.min.js"
    if (cleaned.includes('@') || cleaned.includes('/')) {
      // Already in the right format or close to it
      return `https://cdn.staticdelivr.com/npm/${cleaned}`;
    }

    // Just a package name
    return `https://cdn.staticdelivr.com/npm/${cleaned}`;
  }, []);

  const transform = useCallback((value: string) => {
    if (!value.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const detectedMode = detectMode(value);
      
      let result = '';
      if (detectedMode === 'github') {
        result = transformGithubUrl(value);
      } else if (detectedMode === 'npm') {
        result = transformNpmPackage(value);
      } else {
        // Try npm first as it's more forgiving
        result = transformNpmPackage(value);
      }

      setOutput(result);
      setError('');
      setMode(detectedMode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
      setOutput('');
    }
  }, [detectMode, transformGithubUrl, transformNpmPackage]);

  useEffect(() => {
    transform(input);
  }, [input, transform]);

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exampleInputs = [
    { label: 'GitHub', value: 'https://github.com/jquery/jquery/blob/main/dist/jquery.min.js', icon: Github },
    { label: 'npm', value: 'react@18.2.0/umd/react.production.min.js', icon: Package },
  ];

  return (
    <div className={className}>
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg">

        {/* Input Section */}
        <div className="p-5">
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Paste GitHub URL or npm package
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="github.com/user/repo/blob/main/file.js or react@18.2.0"
            className="w-full h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent font-mono text-sm"
          />

          {/* Quick Examples */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Try:</span>
            {exampleInputs.map((example) => (
              <button
                key={example.label}
                onClick={() => setInput(example.value)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <example.icon className="w-3 h-3" />
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Output Section */}
        {(output || error) && (
          <div className="px-5 pb-5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                CDN URL
              </span>
              {mode !== 'auto' && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  mode === 'github' 
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}>
                  {mode === 'github' ? 'GitHub' : 'npm'}
                </span>
              )}
            </div>

            {error ? (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            ) : (
              <div className="relative">
                <div className="p-3 pr-24 rounded-lg bg-zinc-900 dark:bg-zinc-900 border border-zinc-800">
                  <code className="text-green-400 text-sm font-mono break-all">
                    {output}
                  </code>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <a
                    href={output}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Helper Text - Simplified */}
        <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Supports GitHub URLs and npm packages
          </span>
        </div>
      </div>
    </div>
  );
};

export default UrlTransformer;