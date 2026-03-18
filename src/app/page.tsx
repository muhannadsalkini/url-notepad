import { Suspense } from 'react';
import Editor from '@/components/Editor';

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-neutral-950 text-neutral-50 flex flex-col px-4 sm:px-6 md:px-8 selection:bg-neutral-800 selection:text-white">
      <Suspense fallback={
        <div className="flex flex-col h-[100dvh] flex-1 w-full max-w-5xl mx-auto animate-pulse pb-16">
          <div className="flex justify-between items-center mb-6 pt-6">
            <div className="h-8 w-32 bg-neutral-800 rounded"></div>
            <div className="h-9 w-24 bg-neutral-800 rounded"></div>
          </div>
          <div className="w-full flex-1 bg-neutral-900/50 border border-neutral-800/50 rounded-lg"></div>
        </div>
      }>
        <Editor />
      </Suspense>
    </main>
  );
}
