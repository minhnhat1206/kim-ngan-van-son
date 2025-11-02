import React, { useState, useRef } from 'react';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import Invitation from './components/Invitation';
import RsvpForm from './components/RsvpForm';
import ThankYouModal from './components/ThankYouModal';
import { RsvpData } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const photoGalleryRef = useRef<HTMLDivElement>(null);
  const rsvpSectionRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (data: RsvpData) => {
    console.log('RSVP Data Submitted:', data);
    // In a real app, you would send this data to a server.
    setIsModalOpen(true);
  };

  const scrollToPhotoGallery = () => {
    photoGalleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0F4D3A] text-[#FAF9F7]">
      <Hero onScrollClick={scrollToPhotoGallery} />
      <div ref={photoGalleryRef}>
        <PhotoGallery />
      </div>
      <div className="relative z-10 bg-[#FAF9F7]">
        <Invitation />
        <div ref={rsvpSectionRef}>
          <RsvpForm onSubmit={handleFormSubmit} />
        </div>
      </div>
      <ThankYouModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
