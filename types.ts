
export enum GuestGroup {
  BRIDE_FAMILY = 'Người thân cô dâu',
  BRIDE_FRIEND = 'Bạn cô dâu',
  GROOM_FRIEND = 'Bạn chú rể',
}

export enum AttendingStatus {
  YES = 'Chắc chắn tham dự',
  NO = 'Rất tiếc không tham dự được',
}

export interface RsvpData {
  guestGroup: GuestGroup | null;
  name: string;
  attending: AttendingStatus | null;
  attendees: number;
  notes: string;
}
