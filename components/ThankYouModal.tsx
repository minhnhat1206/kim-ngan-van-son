import React, { useEffect, useState } from 'react';
import { HeartIcon } from './icons';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 100); // Delay for transition
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const confettiParticles = Array.from({ length: 15 });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md p-8 bg-[#FAF9F7] text-[#0F4D3A] rounded-lg shadow-2xl text-center transform transition-all duration-500 ease-out ${
          showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {confettiParticles.map((_, i) => (
            <HeartIcon
              key={i}
              className="absolute text-[#B74A3A]/50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                animation: `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s infinite`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(150px) rotate(360deg); opacity: 0; }
          }
        `}</style>

        <div className="relative z-10">
          <h2 className="text-4xl font-handwriting mb-4">Cảm ơn Quý khách!</h2>
          <p className="text-lg mb-6">
            Phản hồi của Quý khách đã được ghi nhận.
          </p>
          <p className="text-lg font-medium">
            Gia đình chúng con/em/tôi rất mong được đón tiếp Quý khách vào ngày 25.01.2026.
          </p>
          <button
            onClick={onClose}
            className="mt-8 px-8 py-2 text-lg font-bold text-white bg-[#0F4D3A] rounded-full hover:bg-[#A8D3C2] hover:text-[#0F4D3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8D3C2] transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;