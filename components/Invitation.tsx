import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { HeartIcon } from './icons';

const Invitation: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    return (
    <section 
        ref={ref}
        className="relative py-20 px-6 bg-[#FAF9F7] text-[#0F4D3A] overflow-hidden"
    >
        <HeartIcon className={`absolute -top-8 -left-10 text-[#CFE8D8] w-32 h-32 opacity-70 transform -rotate-45 transition-all duration-1000 ease-out ${isVisible ? 'opacity-70 translate-x-0' : '-translate-x-10'}`} />
        <HeartIcon className={`absolute -bottom-8 -right-10 text-[#A8D3C2] w-32 h-32 opacity-70 transform rotate-[135deg] transition-all duration-1000 ease-out ${isVisible ? 'opacity-70 translate-x-0' : 'translate-x-10'}`} />

        <div className={`max-w-3xl mx-auto text-center font-serif-light transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
                Trân trọng kính mời Quý khách đến bữa tiệc chung vui cùng gia đình chúng con/em/tôi.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
                Sự hiện diện của Quý khách là niềm vinh hạnh của gia đình chúng con/em/tôi.
            </p>
            <p className="text-md md:text-lg leading-relaxed text-[#0F4D3A]/80">
                Để chu toàn cho ngày vui hôm ấy và thuận tiện cho việc sắp xếp chỗ ngồi, vui lòng phản hồi các thông tin sau.
            </p>
            <div className="w-24 h-px bg-[#A8D3C2] mx-auto my-10"></div>
            <p className="text-xl md:text-2xl font-medium tracking-wide">
                Rất mong được đón tiếp Quý khách trong ngày 28.01.2026
            </p>
        </div>
    </section>
  );
};

export default Invitation;