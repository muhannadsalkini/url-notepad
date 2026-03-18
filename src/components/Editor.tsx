"use client";

import { useUrlNotes } from '@/hooks/useUrlNotes';
import { useState } from 'react';

export default function Editor() {
  const { text, handleChange, isLoaded } = useUrlNotes();
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy URL", e);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col h-full flex-1 w-full max-w-5xl mx-auto animate-pulse pb-16">
        <div className="flex justify-between items-center mb-6 pt-6">
          <div className="h-8 w-32 bg-neutral-800 rounded"></div>
          <div className="h-9 w-24 bg-neutral-800 rounded"></div>
        </div>
        <div className="w-full flex-1 bg-neutral-900/50 border border-neutral-800/50 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] flex-1 w-full max-w-5xl mx-auto pb-16">
      <div className="flex justify-between items-center mb-6 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-200">
          URL Notepad
        </h1>
        <button 
          onClick={copyUrl}
          className="px-4 py-2 text-sm font-medium bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white rounded-md transition duration-200 ease-in-out select-none flex items-center gap-2"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy Link
            </>
          )}
        </button>
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing your note here... It will automatically save to the exact URL above you!"
        className="w-full flex-1 bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-lg resize-none outline-none text-base md:text-lg leading-relaxed focus:ring-1 focus:ring-neutral-700 focus:border-neutral-700 transition-all font-sans placeholder:text-neutral-600 shadow-sm"
        autoFocus
      />
    </div>
  );
}
