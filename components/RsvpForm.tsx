
import React, { useState, useEffect } from 'react';
import { RsvpData, GuestGroup, AttendingStatus } from '../types';
import { BrideFamilyIcon, BrideFriendIcon, GroomFriendIcon, CheckIcon, SadIcon, LoadingFlowerIcon } from './icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/*
  SENIOR FRONTEND ENGINEER NOTE:
  To connect this form to a Google Sheet, follow these steps:

  1. Create a new Google Sheet in your Google Drive.
  2. In your Sheet, go to Extensions > Apps Script.
  3. Erase any existing code in the `Code.gs` file and paste the entire script below.

    // --- Start of Google Apps Script ---
    function doPost(e) {
      // Best practice: Lock the script to prevent issues with concurrent submissions.
      var lock = LockService.getScriptLock();
      lock.waitLock(30000); // Wait up to 30 seconds.

      try {
        var sheetName = "RSVPs";
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        
        // If sheet doesn't exist, create it with headers.
        if (!sheet) {
          sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
          sheet.appendRow(["Timestamp", "GuestGroup", "Name", "Attending", "Attendees", "Notes"]);
        }

        // Get parameters from the POST request
        var params = e.parameter;
        
        // Create the new row data in the same order as the headers
        var newRow = [
          params.Timestamp,
          params.GuestGroup,
          params.Name,
          params.Attending,
          params.Attendees,
          params.Notes
        ];
        
        sheet.appendRow(newRow);

        // Return a success response
        return ContentService
          .createTextOutput(JSON.stringify({ result: 'success' }))
          .setMimeType(ContentService.MimeType.JSON);

      } catch (error) {
        // Return an error response
        return ContentService
          .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
          .setMimeType(ContentService.MimeType.JSON);
      } finally {
        // Release the lock
        lock.releaseLock();
      }
    }
    // --- End of Google Apps Script ---

  4. Save the script (Ctrl/Cmd + S).
  5. Deploy the script as a Web App:
     - At the top right, click "Deploy" > "New deployment".
     - Click the gear icon next to "Select type" and choose "Web app".
     - For "Description", you can enter "Wedding RSVP Handler".
     - In "Execute as", select "Me".
     - IMPORTANT: In "Who has access", select "Anyone". This allows the form to send data.
     - Click "Deploy".
  6. Authorize the script permissions when prompted by Google. It's a standard procedure.
  7. After deployment, copy the "Web app URL" provided.
  8. Paste this URL into the `GOOGLE_SCRIPT_URL` constant below, replacing the placeholder.
*/

interface RsvpFormProps {
  onSubmit: (data: RsvpData) => void;
}

// IMPORTANT: Replace this with the Web app URL you get after deploying the Google Apps Script.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcV9_OubKPJPknDFS_CHJR4-YvAjawhWJBYh5xsKdO78F9reXcITfvL-8uBNUWyJFIXg/exec';

const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RsvpData>({
    guestGroup: null,
    name: '',
    attending: null,
    attendees: 1,
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    if (formData.attending === AttendingStatus.NO) {
      setFormData(prev => ({ ...prev, attendees: 0 }));
    } else if (formData.attendees === 0 && formData.attending === AttendingStatus.YES) {
       setFormData(prev => ({ ...prev, attendees: 1 }));
    }
  }, [formData.attending, formData.attendees]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // If the URL is the placeholder, use the demo timeout for a good UX without a backend.
    if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
      console.warn(
        'Using demo form submission. Please configure your Google Apps Script URL in RsvpForm.tsx to save data.'
      );
      setTimeout(() => {
        setIsLoading(false);
        onSubmit(formData);
      }, 1500);
      return;
    }

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
        const errorText = await response.text();
        console.error('Google Script submission failed:', response.status, errorText);
        alert('Không thể gửi phản hồi do lỗi từ máy chủ. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert(
        'Đã có lỗi xảy ra khi gửi phản hồi. Vui lòng kiểm tra kết nối mạng và thử lại.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const guestGroupOptions = [
    { value: GuestGroup.BRIDE_FAMILY, icon: <BrideFamilyIcon className="w-8 h-8 mx-auto mb-2 text-[#0F4D3A]" /> },
    { value: GuestGroup.BRIDE_FRIEND, icon: <BrideFriendIcon className="w-8 h-8 mx-auto mb-2 text-[#0F4D3A]" /> },
    { value: GuestGroup.GROOM_FRIEND, icon: <GroomFriendIcon className="w-8 h-8 mx-auto mb-2 text-[#0F4D3A]" /> },
  ];

  return (
    <div ref={ref} className={`bg-[#FAF9F7] py-20 px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-lg shadow-2xl shadow-black/10">
            <h2 className="text-4xl text-center font-handwriting text-[#0F4D3A] mb-8">Xác nhận tham dự</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Guest Group */}
                <div>
                    <label className="block text-lg font-medium text-[#0F4D3A] mb-4 text-center">Quý khách thuộc nhóm nào?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {guestGroupOptions.map(opt => (
                            <button
                                type="button"
                                key={opt.value}
                                onClick={() => setFormData({ ...formData, guestGroup: opt.value })}
                                className={`p-4 rounded-lg text-center border-2 transition-all duration-300 ease-out ${
                                    formData.guestGroup === opt.value ? 'border-[#B74A3A] bg-[#B74A3A]/10 scale-105 shadow-lg' : 'border-[#CFE8D8] bg-transparent hover:border-[#A8D3C2] hover:bg-[#A8D3C2]/20'
                                }`}
                            >
                                {opt.icon}
                                <span className="text-sm text-[#0F4D3A] font-serif-light">{opt.value}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Guest Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#0F4D3A]/80 mb-2">Tên khách mời (ghi theo thông tin trên thiệp mời)</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="VD: Nguyễn Thị Hoa"
                        className="w-full px-4 py-3 border border-[#CFE8D8] rounded-md focus:ring-2 focus:ring-[#A8D3C2] focus:border-[#A8D3C2] transition duration-200 bg-white text-[#0F4D3A]"
                        required
                    />
                </div>

                {/* Attending Status */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attending: AttendingStatus.YES })}
                            className={`flex items-center justify-center gap-2 p-4 rounded-md text-lg font-semibold transition-all duration-300 ${
                                formData.attending === AttendingStatus.YES ? 'bg-[#0F4D3A] text-white shadow-md' : 'bg-[#CFE8D8] text-[#0F4D3A] hover:bg-[#A8D3C2]'
                            }`}
                        >
                            <CheckIcon className="w-6 h-6" />
                            {AttendingStatus.YES}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attending: AttendingStatus.NO })}
                            className={`flex items-center justify-center gap-2 p-4 rounded-md text-lg font-semibold transition-all duration-300 ${
                                formData.attending === AttendingStatus.NO ? 'bg-white text-[#B74A3A] ring-2 ring-[#B74A3A] shadow-md' : 'bg-white text-[#B74A3A]/80 ring-1 ring-[#B74A3A]/50 hover:ring-[#B74A3A]'
                            }`}
                        >
                            <SadIcon className="w-6 h-6" />
                            {AttendingStatus.NO}
                        </button>
                    </div>
                </div>

                {/* Number of Attendees */}
                <div className={`transition-opacity duration-500 ${formData.attending === AttendingStatus.NO ? 'opacity-40' : 'opacity-100'}`}>
                    <label htmlFor="attendees" className="block text-sm font-medium text-[#0F4D3A]/80 mb-2">Số người tham dự</label>
                    <input
                        type="number"
                        id="attendees"
                        min={formData.attending === AttendingStatus.YES ? 1 : 0}
                        max="10"
                        value={formData.attendees}
                        onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value, 10) || 0 })}
                        disabled={formData.attending === AttendingStatus.NO}
                        className="w-full px-4 py-3 border border-[#CFE8D8] rounded-md focus:ring-2 focus:ring-[#A8D3C2] focus:border-[#A8D3C2] transition duration-200 bg-white text-[#0F4D3A] disabled:bg-gray-100"
                    />
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-[#0F4D3A]/80 mb-2">Nếu Quý khách có lưu ý đặc biệt (ví dụ: ăn chay, chỗ ngồi riêng...), xin vui lòng ghi tại đây.</label>
                    <textarea
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 border border-[#CFE8D8] rounded-md focus:ring-2 focus:ring-[#A8D3C2] focus:border-[#A8D3C2] transition duration-200 bg-white text-[#0F4D3A]"
                    ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading || !formData.guestGroup || !formData.name || !formData.attending}
                        className="w-full flex justify-center items-center gap-3 px-6 py-4 text-xl font-bold text-white bg-[#0F4D3A] rounded-full hover:bg-[#A8D3C2] hover:text-[#0F4D3A] focus:outline-none focus:ring-4 focus:ring-[#A8D3C2]/50 transition-all duration-300 disabled:bg-[#0F4D3A]/50 disabled:cursor-not-allowed"
                    >
                         {isLoading ? (
                            <>
                                <LoadingFlowerIcon className="w-8 h-8" />
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
