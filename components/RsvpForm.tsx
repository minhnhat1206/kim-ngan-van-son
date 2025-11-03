import React, { useState, useEffect } from 'react';
import { RsvpData, GuestGroup, AttendingStatus } from '../types';
import {
  BrideFamilyIcon,
  BrideFriendIcon,
  GroomFriendIcon,
  CheckIcon,
  SadIcon,
  LoadingFlowerIcon
} from './icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface RsvpFormProps {
  onSubmit: (data: RsvpData) => void;
}

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwcV9_OubKPJPknDFS_CHJR4-YvAjawhWJBYh5xsKdO78F9reXcITfvL-8uBNUWyJFIXg/exec';

const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RsvpData>({
    guestGroup: null,
    name: '',
    attending: null,
    attendees: 1,
    notes: '',
  });
  const [attendeesInput, setAttendeesInput] = useState<string>(String(formData.attendees));
  const [isLoading, setIsLoading] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    if (formData.attending === AttendingStatus.NO) {
      setFormData(prev => ({ ...prev, attendees: 0 }));
      setAttendeesInput('0');
    } else {
      const at = formData.attendees && formData.attendees > 0 ? formData.attendees : 1;
      setFormData(prev => ({ ...prev, attendees: at }));
      setAttendeesInput(String(at));
    }
  }, [formData.attending]);

  useEffect(() => {
    setAttendeesInput(String(formData.attendees));
  }, [formData.attendees]);

  const normalizeAttendeesAndUpdate = (raw: string) => {
    const n = parseInt(raw, 10);
    const fallback = formData.attending === AttendingStatus.YES ? 1 : 0;
    const final = isNaN(n) ? fallback : Math.max(0, Math.min(10, n));
    setFormData(prev => ({ ...prev, attendees: final }));
    setAttendeesInput(String(final));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    normalizeAttendeesAndUpdate(attendeesInput);
    setIsLoading(true);

    const scriptFormData = new FormData();
    scriptFormData.append('Timestamp', new Date().toISOString());
    scriptFormData.append('GuestGroup', formData.guestGroup || 'N/A');
    scriptFormData.append('Name', formData.name);
    scriptFormData.append('Attending', formData.attending || 'N/A');
    scriptFormData.append('Attendees', String(formData.attendees));
    scriptFormData.append('Notes', formData.notes);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: scriptFormData,
      });
      if (response.ok) {
        onSubmit(formData);
      } else {
        alert('Không thể gửi phản hồi do lỗi máy chủ.');
      }
    } catch (error) {
      alert('Đã có lỗi khi gửi phản hồi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const guestGroupOptions = [
    { value: GuestGroup.BRIDE_FAMILY, icon: <BrideFamilyIcon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-[#0F4D3A]" /> },
    { value: GuestGroup.BRIDE_FRIEND, icon: <BrideFriendIcon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-[#0F4D3A]" /> },
    { value: GuestGroup.GROOM_FRIEND, icon: <GroomFriendIcon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-[#0F4D3A]" /> },
  ];

  return (
    <div
      ref={ref}
      className={`bg-[#FAF9F7] py-10 px-4 sm:py-16 sm:px-10 md:px-20 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-2xl md:max-w-3xl mx-auto p-6 sm:p-10 md:p-12 bg-white rounded-2xl shadow-2xl border border-[#E6EEE8]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-handwriting text-[#0F4D3A] mb-8 md:mb-10 font-semibold tracking-wide">
          Xác nhận tham dự
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 text-[#0F4D3A]">
          {/* Guest Group */}
          <div>
            <label className="block text-base md:text-lg font-medium mb-3 text-center">
              Quý khách thuộc nhóm nào?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guestGroupOptions.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, guestGroup: opt.value })}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl text-center border-2 transition-all duration-200 md:text-lg font-medium ${
                    formData.guestGroup === opt.value
                      ? 'border-[#B74A3A] bg-[#B74A3A]/10 scale-105 shadow-lg'
                      : 'border-[#CFE8D8] bg-white hover:border-[#A8D3C2] hover:bg-[#A8D3C2]/10'
                  }`}
                >
                  {opt.icon}
                  <span className="text-sm md:text-base">{opt.value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-base md:text-lg font-medium mb-2">
              Tên khách mời
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Nguyễn Thị Hoa"
              required
              className="w-full px-4 py-3 md:py-4 text-base md:text-lg border border-[#CFE8D8] rounded-md focus:ring-2 focus:ring-[#A8D3C2]"
            />
          </div>

          {/* Attending */}
          <div>
            <label className="block text-base md:text-lg font-medium mb-2">
              Quý khách có tham dự?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, attending: AttendingStatus.YES }));
                  setAttendeesInput(prev => (parseInt(prev, 10) > 0 ? prev : '1'));
                }}
                className={`flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-200 ${
                  formData.attending === AttendingStatus.YES
                    ? 'bg-[#0F4D3A] text-white shadow-md'
                    : 'bg-[#CFE8D8] text-[#0F4D3A] hover:bg-[#A8D3C2]'
                }`}
              >
                <CheckIcon className="w-6 h-6" /> {AttendingStatus.YES}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, attending: AttendingStatus.NO, attendees: 0 }));
                  setAttendeesInput('0');
                }}
                className={`flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-200 ${
                  formData.attending === AttendingStatus.NO
                    ? 'bg-white text-[#B74A3A] ring-2 ring-[#B74A3A] shadow-md'
                    : 'bg-white text-[#B74A3A]/90 ring-1 ring-[#B74A3A]/30 hover:ring-[#B74A3A]'
                }`}
              >
                <SadIcon className="w-6 h-6" /> {AttendingStatus.NO}
              </button>
            </div>
          </div>

          {/* Attendees */}
          <div className={`transition-opacity duration-300 ${formData.attending === AttendingStatus.NO ? 'opacity-50' : 'opacity-100'}`}>
            <label htmlFor="attendees" className="block text-base md:text-lg font-medium mb-2">
              Số người tham dự
            </label>
            <div className="flex items-center gap-3">
              <input
                id="attendees"
                type="number"
                min={formData.attending === AttendingStatus.YES ? 1 : 0}
                max={10}
                value={attendeesInput}
                onChange={(e) => setAttendeesInput(e.target.value)}
                onBlur={() => normalizeAttendeesAndUpdate(attendeesInput)}
                disabled={formData.attending === AttendingStatus.NO}
                className="w-full px-4 py-3 md:py-4 text-base md:text-lg border border-[#CFE8D8] rounded-md focus:ring-2 focus:ring-[#A8D3C2] disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-base md:text-lg font-medium mb-2">
              Ghi chú (ăn chay, yêu cầu chỗ ngồi...)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 md:py-4 text-base md:text-lg border border-[#CFE8D8] rounded-md focus:ring-2 focus:ring-[#A8D3C2]"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isLoading || !formData.guestGroup || !formData.name || !formData.attending}
              className="w-full flex justify-center items-center gap-3 px-6 py-3 md:py-4 text-lg md:text-xl font-bold text-white bg-[#0F4D3A] rounded-full hover:bg-[#A8D3C2] focus:ring-4 focus:ring-[#A8D3C2]/30 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LoadingFlowerIcon className="w-6 h-6 md:w-7 md:h-7" />
                  Đang gửi...
                </>
              ) : (
                'Gửi phản hồi'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RsvpForm;
