import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { HeartIcon } from './icons';

const photos = [
  './images/photo1.jpg',
  './images/photo2.jpg',
  './images/photo3.jpg',
  './images/photo4.jpg',
  './images/photo5.jpg',
];

const PhotoCard: React.FC<{ src: string; alt: string; index: number }> = ({ src, alt, index }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
    const isEven = index % 2 === 0;

    // Define different animation start states based on position
    const initialTransform = isEven 
        ? 'opacity-0 translate-y-10 scale-95 -rotate-2' 
        : 'opacity-0 translate-y-10 scale-95 rotate-2';
    
    const finalTransform = 'opacity-100 translate-y-0 scale-100 rotate-0';

    return (
        <div
            ref={ref}
            className={`w-full md:w-3/4 lg:w-2/3 transition-all duration-1000 ease-out transform ${
                isVisible ? finalTransform : initialTransform
            } ${isEven ? 'md:self-start' : 'md:self-end'}`}
        >
            <div className="relative group">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover rounded-lg shadow-2xl shadow-black/30 transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-[-10px_10px_30px_rgba(0,0,0,0.4)]"
                />
                <HeartIcon 
                    className={`absolute text-white/20 w-16 h-16 transition-all duration-1000 delay-300 ease-out
                        ${isEven ? '-top-6 -left-8' : '-bottom-6 -right-8 rotate-90'}
                        ${isVisible ? 'opacity-100' : 'opacity-0'}
                        group-hover:text-white/40 group-hover:scale-110
                    `} 
                />
            </div>
        </div>
    );
};

const PhotoGallery: React.FC = () => {
  return (
    <section className="bg-[#0F4D3A] py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-24">
        {photos.map((photo, index) => (
          <PhotoCard key={index} src={photo} alt={`Ảnh cưới ${index + 1}`} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;