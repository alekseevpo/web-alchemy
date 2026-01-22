'use client';

import { useState } from 'react';

interface AnimatedSubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedSubmitButton({ 
  isLoading = false, 
  disabled = false, 
  children, 
  className = '',
  onClick 
}: AnimatedSubmitButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden group px-8 py-4 rounded-xl 
        transition-all duration-300 font-medium shadow-lg hover:shadow-xl
        flex items-center justify-center gap-2 min-w-[200px]
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
        ${className}
      `}
      style={{
        background: 'linear-gradient(to right, #111827, #1f2937)',
        color: 'white'
      }}
    >
      {/* Анимированный фон */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to right, #2563eb, #9333ea)'
        }}
      />
      
      {/* Содержимое кнопки */}
      <div className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            {/* Анимированный спиннер */}
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-1 border-2 border-current border-t-transparent rounded-full animate-spin" style={{animationDelay: '150ms'}} />
            </div>
            <span className="animate-pulse">Отправка...</span>
          </>
        ) : (
          <>
            {/* Иконка отправки */}
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {children}
            </span>
          </>
        )}
      </div>
      
      {/* Эффект мерцания при наведении */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          ...(isHovered && {
            animation: 'shimmer 1s infinite'
          })
        }}
      />
    </button>
  );
}
