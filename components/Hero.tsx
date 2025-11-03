import React from 'react';

const InvitationDetails: React.FC = () => {
  return (
    <section className="bg-[#0F4D3A] text-[#FAF9F7] py-14 px-6 sm:px-10 md:px-20 font-['Playfair_Display']">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Opening */}
        <div className="mb-10 sm:mb-14">
          <p className="font-light text-sm sm:text-base tracking-[0.25em] uppercase">
            NGÀY CHUNG ĐÔI
          </p>

          <h1
            className="font-['Great_Vibes'] text-6xl sm:text-7xl md:text-8xl mt-2 mb-4 leading-tight"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.35)' }}
          >
            Kim Ngân - Văn Sơn
          </h1>

          <div className="w-16 h-[2px] bg-[#EDEDE8] mx-auto" />
        </div>

        {/* Invitation text */}
        <div className="max-w-lg text-center leading-relaxed mb-6">
          <p className="text-base sm:text-lg font-light">TRÂN TRỌNG KÍNH MỜI</p>
          <p className="text-base sm:text-lg font-light mt-1">
            ĐẾN DỰ BUỔI TIỆC CHUNG VUI CÙNG <br />
            GIA ĐÌNH CHÚNG TÔI TẠI
          </p>
        </div>

        {/* Venue + Date */}
        <div className="mt-8 sm:mt-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Venue */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl leading-snug font-semibold">
              TRUNG TÂM THANH <br className="sm:hidden" /> THIẾU NIÊN MIỀN NAM
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg font-light opacity-90 leading-relaxed">
              Số 1, Đường số 3, Khu dân cư Vĩnh Lộc, <br />
              Phường Bình Tân, TP. HCM
            </p>
          </div>

          {/* Date */}
          <div className="flex items-center justify-center md:border-l md:border-[#EDEDE8] md:pl-8 md:ml-8">
            <div className="font-['DM_Serif_Display'] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wider">
              25 <span className="mx-2">•</span> 01 <span className="mx-2">•</span> 26
            </div>
          </div>
        </div>

        {/* Time / schedule */}
        <div className="mt-10 text-center">
          <p className="text-lg sm:text-xl font-medium">
            VÀO LÚC 11:00, CHỦ NHẬT
          </p>
          <p className="text-sm sm:text-base text-gray-200 mt-1 italic">
            (Nhằm ngày 07 tháng 12 năm Ất Tỵ)
          </p>

          <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-3 text-sm sm:text-base font-light">
            <span>ĐÓN KHÁCH 11:00</span>
            <span className="mx-1">|</span>
            <span>KHAI TIỆC 12:00</span>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-10 sm:mt-12 leading-relaxed max-w-md">
          <p className="text-sm sm:text-base font-light">
            SỰ HIỆN DIỆN CỦA QUÝ KHÁCH <br />
            LÀ NIỀM VINH HẠNH CHO GIA ĐÌNH CHÚNG TÔI
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvitationDetails;
