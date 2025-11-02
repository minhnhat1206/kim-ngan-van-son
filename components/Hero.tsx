import React, { useState, useEffect } from 'react';

interface HeroProps {
  onScrollClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="relative text-center text-[#FAF9F7]">
        <div
          className={`transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* subtitle */}
          <h2 className="font-serif-light text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.15em] md:tracking-[0.25em]">
            Ngày chung đôi
          </h2>

          {/* main title */}
          <h1
            className="font-handwriting text-4xl sm:text-6xl md:text-8xl lg:text-9xl my-3 sm:my-4 leading-tight"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
          >
            Kim Ngân - Văn Sơn
          </h1>
        </div>
      </div>

      {/* scroll button */}
      <button
        onClick={onScrollClick}
        className={`absolute bottom-8 text-[#FAF9F7] animate-bounce transition-opacity duration-1000 delay-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Cuộn xuống để xem ảnh"
      >
        <span className="text-xs sm:text-sm font-serif-light tracking-widest">Xem ảnh cưới</span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mt-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
