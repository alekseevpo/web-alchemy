'use client';

import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function DebugButtonsPage() {
  const [positions, setPositions] = useState<Record<string, DOMRect>>({});
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const themeToggleRef = useRef<HTMLDivElement>(null);
  const languageToggleRef = useRef<HTMLDivElement>(null);

  const updatePositions = () => {
    if (!containerRef.current || !themeToggleRef.current || !languageToggleRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const themeBtn = themeToggleRef.current.getBoundingClientRect();
    const langBtn = languageToggleRef.current.getBoundingClientRect();

    setPositions({
      container: {
        ...container,
        toJSON: () => container,
      } as DOMRect,
      themeBtn: {
        ...themeBtn,
        toJSON: () => themeBtn,
      } as DOMRect,
      langBtn: {
        ...langBtn,
        toJSON: () => langBtn,
      } as DOMRect,
    });
  };

  useEffect(() => {
    updatePositions();
    const interval = setInterval(updatePositions, 100);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Debug: Button Positions</h1>
        
        {/* Mobile view simulation */}
        <div className="border-2 border-blue-500 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
          <div className="text-sm font-mono mb-2">Mobile View (390px width)</div>
          <div className="w-[390px] mx-auto border border-gray-300 dark:border-gray-600 rounded relative min-h-[200px] bg-gray-100 dark:bg-gray-900">
            {/* Fixed container like in AppChrome */}
            <div 
              ref={containerRef}
              className="fixed top-4 right-4 z-[100] flex items-center gap-2 min-w-0 overflow-visible"
              style={{ position: 'fixed' }}
            >
              <div ref={themeToggleRef} className="flex-shrink-0 relative">
                <ThemeToggle />
              </div>
              <div ref={languageToggleRef} className="flex-shrink-0 relative">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Position info */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Position Data</h2>
          <div className="font-mono text-sm space-y-2">
            <div>
              <strong>Container:</strong>
              <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded">
                {positions.container ? JSON.stringify({
                  top: positions.container.top,
                  right: positions.container.right,
                  bottom: positions.container.bottom,
                  left: positions.container.left,
                  width: positions.container.width,
                  height: positions.container.height,
                }, null, 2) : 'Not measured'}
              </pre>
            </div>
            <div>
              <strong>Theme Button:</strong>
              <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded">
                {positions.themeBtn ? JSON.stringify({
                  top: positions.themeBtn.top,
                  right: positions.themeBtn.right,
                  bottom: positions.themeBtn.bottom,
                  left: positions.themeBtn.left,
                  width: positions.themeBtn.width,
                  height: positions.themeBtn.height,
                }, null, 2) : 'Not measured'}
              </pre>
            </div>
            <div>
              <strong>Language Button:</strong>
              <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded">
                {positions.langBtn ? JSON.stringify({
                  top: positions.langBtn.top,
                  right: positions.langBtn.right,
                  bottom: positions.langBtn.bottom,
                  left: positions.langBtn.left,
                  width: positions.langBtn.width,
                  height: positions.langBtn.height,
                }, null, 2) : 'Not measured'}
              </pre>
            </div>
          </div>
        </div>

        {/* Test controls */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Controls</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Toggle Language Dropdown: {isOpen ? 'Open' : 'Closed'}
          </button>
        </div>
      </div>
    </div>
  );
}
