import {
  getCurrentUserNotificationCounts,
  getCurrentUserNotifications,
} from '@/api-services/notification';
import useFetch from '@/query/client/useFetch';
import { CurrentUserNotificationCounts } from '@/types/notification.type';
import { IResponse } from '@/types/response.type';

export function getCurrentUserNotificationsQuery() {
  return useFetch<IResponse<Notification[]>>(
    ['getCurrentUserNotifications'],
    getCurrentUserNotifications,
  );
}

export function getCurrentUserNotificationCountsQuery() {
  return useFetch<IResponse<CurrentUserNotificationCounts>>(
    ['getCurrentUserNotificationCounts'],
    getCurrentUserNotificationCounts,
  );
}
