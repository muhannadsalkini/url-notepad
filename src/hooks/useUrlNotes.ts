"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import LZString from 'lz-string';

export function useUrlNotes(debounceMs: number = 250) {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const encodedParams = searchParams.get('n');
    if (encodedParams) {
      try {
        const decoded = LZString.decompressFromEncodedURIComponent(encodedParams);
        if (decoded) {
          setText(decoded);
        }
      } catch (e) {
        console.error("Failed to decompress notes from URL", e);
      }
    }
    setIsLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const timeoutId = setTimeout(() => {
      const newUrl = new URL(window.location.href);
      if (text.trim() === '') {
        newUrl.searchParams.delete('n');
      } else {
        const compressed = LZString.compressToEncodedURIComponent(text);
        newUrl.searchParams.set('n', compressed);
      }
      window.history.replaceState({}, '', newUrl.toString());
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [text, isLoaded, debounceMs]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  return { text, handleChange, isLoaded };
}
