export interface Notification {
  _id: string;
  customerId: string; // ObjectId or string (if converted)
  administratorId: string;
  title: string;
  message: string;
  link?: string;
  visitId?: string;
  category: NotificationCategory;
  type: NotificationType;
  isRead: boolean; // changed to boolean
  createdAt: string; // optional timestamp
  updatedAt: string; // optional timestamp
}

export interface CurrentUserNotificationCounts {
  total: number;
  read: number;
  unread: number;
}

export enum NotificationType {
  INFO = 'Info',
  SUCCESS = 'Success',
  WARNING = 'Warning',
}
export enum NotificationCategory {
  SYSTEM = 'System', // General system updates
  CUSTOMER = 'Customer', // Customer-related notifications
  ADMIN = 'Admin', // Admin-related alerts
  PAYMENT = 'Payment', // Payment success/failure
  ORDER = 'Order', // Order status updates
  WALLET_SUBMISSION = 'Wallet_Submission',
  PROMOTION = 'Promotion', // Discounts, offers, campaigns
}

export interface NotificationSetAsReadPayload {
  ids: string[];
}
