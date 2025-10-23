import {
  getCurrentUserNotificationCounts,
  getCurrentUserNotifications,
  getMyUnreadNotifications,
  notificationSetAsRead,
} from '@/api-services/notification';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { CurrentUserNotificationCounts, Notification, NotificationSetAsReadPayload } from '@/types/notification.type';
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

export function getMyUnreadNotificationQuery(params: Param[]) {
  return useFetch<IResponse<Notification[]>>(['getMyUnreadNotifications'], () =>
    getMyUnreadNotifications(params),
  );
}



export function notificationSetAsReadMutation() {
  return useMutate<IResponse<null>, NotificationSetAsReadPayload>(notificationSetAsRead);
}
