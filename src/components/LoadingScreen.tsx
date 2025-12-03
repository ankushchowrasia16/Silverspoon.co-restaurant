import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Logo-based loading screen with fade animations
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade out after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after fade animation
      setTimeout(onComplete, 500);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-6 animate-pulse">
          <img
            src="https://raw.githubusercontent.com/ankushchowrasia16/Silverspoon.co-restaurant/c575890229bcae7e2d0b85402fa72c80ec5a399b/silverspoon.cofavicon.png"
            alt="Silver Spoon Logo"
            className="w-32 h-32 mx-auto drop-shadow-2xl"
          />
        </div>
        
        {/* Brand Name */}
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          Silver Spoon <span className="text-primary-600">.Co</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Loading your culinary experience...
        </p>
        
        {/* Loading Bar */}
        <div className="mt-8 w-64 mx-auto h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 animate-loading-bar rounded-full"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
