import React from 'react';

const InvitationDetails: React.FC = () => {
  return (
    <section className="bg-[#0F4D3A] text-[#FAF9F7] py-14 px-5 sm:px-8 md:px-14 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Opening */}
        <div className="mb-8 sm:mb-12">
          <p className="font-serif-light text-xs sm:text-sm tracking-[0.25em] uppercase">
            NGÀY CHUNG ĐÔI
          </p>

          <h1
            className="font-handwriting text-4xl sm:text-5xl md:text-7xl mt-2 mb-3 leading-tight"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.35)' }}
          >
            Kim Ngân - Văn Sơn
          </h1>

          <div className="w-16 h-[1px] sm:h-[2px] bg-[#EDEDE8] mx-auto" />
        </div>

        {/* Invitation text */}
        <div className="max-w-lg mb-6">
          <p className="font-serif-light text-sm sm:text-base leading-relaxed">
            TRÂN TRỌNG KÍNH MỜI
          </p>
          <p className="font-serif-light text-sm sm:text-base leading-relaxed mt-1">
            ĐẾN DỰ BUỔI TIỆC CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI TẠI
          </p>
        </div>

        {/* --- IMPORTANT: Mobile = stacked (column); md+ = row (venue left, date right) --- */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Venue: always a block that can wrap internally, but we add intentional mobile breaks */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl leading-snug">
                {/* explicit mobile break: show as 2 lines on small screens, single block on bigger */}
                <span className="block md:inline">TRUNG TÂM THANH</span>
                <span className="hidden md:inline"> </span>
                <span className="block md:inline">THIẾU NIÊN MIỀN NAM</span>
              </h2>

              <p className="mt-3 text-xs sm:text-sm md:text-base font-serif-light opacity-90">
                {/* keep address lines separate and forced breaks on mobile for readability */}
                <span className="block">Số 1, Đường số 3, Khu dân cư Vĩnh Lộc,</span>
                <span className="block">Phường Bình Tân, TP. HCM</span>
              </p>
            </div>

            {/* Date: on mobile it will be its own block below venue; on md+ it appears to the right */}
            <div className="flex-shrink-0 flex justify-center md:justify-end">
              <div className="md:border-l md:border-[#EDEDE8] md:pl-6 md:ml-6 pl-0 mt-0 md:mt-0">
                {/* large, fluid date; kept as block so it will be on its own line on mobile */}
                <div
                  className="font-serif-display leading-none text-center md:text-right"
                  style={{
                    fontSize: 'clamp(1.25rem, 8vw, 4.5rem)',
                    lineHeight: 1,
                    fontWeight: 500,
                  }}
                >
                  <div style={{ marginBottom: '-0.12rem' }}>25</div>
                  <div style={{ marginBottom: '-0.12rem' }}>01</div>
                  <div>26</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time / schedule: keep inline (no wrap). If too narrow, allow horizontal scroll */}
        <div className="mt-8 w-full">
          <div className="text-center">
            <p className="text-base sm:text-lg font-serif-light">
              VÀO LÚC 10:30, CHỦ NHẬT
            </p>
            <p className="text-xs sm:text-sm text-gray-200 mt-1 italic">
              (Nhằm ngày 07 tháng 12 năm Ất Tỵ)
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center">
            {/* prevent wrapping with whitespace-nowrap; enable x-scroll if tiny screens */}
            <div className="whitespace-nowrap text-xs sm:text-sm font-serif-light overflow-x-auto px-2">
              <span className="inline-block">ĐÓN KHÁCH 10:30</span>
              <span className="inline-block mx-2">|</span>
              <span className="inline-block">KHAI TIỆC 12:00</span>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-10 sm:mt-12">
          <p className="text-xs sm:text-sm md:text-base font-serif-light leading-relaxed max-w-md mx-auto">
            SỰ HIỆN DIỆN CỦA QUÝ KHÁCH <br className="hidden sm:inline" />
            LÀ NIỀM VINH HẠNH CHO GIA ĐÌNH CHÚNG TÔI
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvitationDetails;
