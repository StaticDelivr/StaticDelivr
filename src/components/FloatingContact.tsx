"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show on mobile and after mount
  if (!mounted || (typeof window !== "undefined" && window.innerWidth > 768)) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 md:hidden transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      {isExpanded ? (
        <div className="bg-white rounded-2xl shadow-2xl border p-4 mb-2 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-slate-900">Quick Links</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </Link>
            <Link
              href="/docs"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/github"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              GitHub Converter
            </Link>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300",
          isExpanded
            ? "bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110"
        )}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
