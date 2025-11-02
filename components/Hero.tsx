import React from 'react';

const InvitationDetails: React.FC = () => {
  return (
    <section className="bg-[#0F4D3A] text-[#FAF9F7] py-14 px-5 sm:px-8 md:px-14 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Opening */}
        <div className="mb-10 sm:mb-14">
          <p className="font-serif-light text-xs sm:text-sm tracking-[0.25em] uppercase">
            NGÀY CHUNG ĐÔI
          </p>

          <h1
            className="font-handwriting text-5xl sm:text-6xl md:text-7xl mt-2 mb-4 leading-tight"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.35)' }}
          >
            Kim Ngân - Văn Sơn
          </h1>

          <div className="w-16 h-[1px] sm:h-[2px] bg-[#EDEDE8] mx-auto" />
        </div>

        {/* Invitation text */}
        <div className="max-w-lg">
          <p className="font-serif-light text-sm sm:text-base leading-relaxed">
            TRÂN TRỌNG KÍNH MỜI
          </p>
          <p className="font-serif-light text-sm sm:text-base leading-relaxed mt-1">
            ĐẾN DỰ BUỔI TIỆC CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI TẠI
          </p>
        </div>

        {/* Venue + date: force horizontal layout (mobile included) */}
        <div className="mt-8 sm:mt-10 w-full flex flex-row flex-wrap items-center justify-between gap-4 text-center md:text-left">
          {/* Venue (flex-1 so it can shrink/grow) */}
          <div className="flex-1 min-w-0">
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl leading-snug">
              TRUNG TÂM THANH <br className="sm:hidden" /> THIẾU NIÊN MIỀN NAM
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base font-serif-light opacity-90">
              Số 1, Đường số 3, Khu dân cư Vĩnh Lộc, <br className="sm:hidden md:inline" />
              Phường Bình Tân, TP. HCM
            </p>
          </div>

          {/* Date block: compact on mobile, border-left only on md+ */}
          <div className="flex-shrink-0 flex items-center">
            <div className="md:border-l md:border-[#EDEDE8] md:pl-6 md:ml-6 pl-3">
              <div className="text-lg sm:text-xl md:text-3xl font-serif-display leading-tight text-right min-w-[56px]">
                <div className="leading-none">25</div>
                <div className="leading-none">01</div>
                <div className="leading-none">26</div>
              </div>
            </div>
          </div>
        </div>

        {/* Time / schedule: make separator visible on mobile and inline */}
        <div className="mt-10 text-center">
          <p className="text-base sm:text-lg font-serif-light">
            VÀO LÚC 11:00, CHỦ NHẬT
          </p>
          <p className="text-xs sm:text-sm text-gray-200 mt-1 italic">
            (Nhằm ngày 07 tháng 12 năm Ất Tỵ)
          </p>

          <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-serif-light">
            <span>ĐÓN KHÁCH 11:00</span>
            <span className="mx-1">|</span>
            <span>KHAI TIỆC 12:00</span>
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
