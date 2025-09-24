import React, { UIEvent, useEffect, useRef, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { PiBell, PiBellSimpleRinging } from 'react-icons/pi';

import { usePathname, useRouter } from 'next/navigation';
import {
  getCurrentUserNotificationCountsQuery,
  getCurrentUserNotificationsQuery,
} from '@/query/services/notification';
import { Notification, NotificationCategory } from '@/types/notification.type';
import { getTimeAgo } from '@/utils/helper';

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const router = useRouter();
  const barRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const bar = barRef.current;

    if (!bar) return;

    const handler2 = (event: MouseEvent) => {
      const target = event.target;
      if (!bar.contains(target as Node)) {
        setIsOpen(false);
      }
    };

    // bar.addEventListener("scroll", handler);
    document.addEventListener('mousedown', handler2);

    return () => {
      // bar.removeEventListener("scroll", handler);
      document.removeEventListener('mousedown', handler2);
    };
  }, [isOpen, barRef.current?.onscroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const {
    data: notificationData,
    isLoading: notificationsIsLoading,
    isFetching: notificationsIsRefetching,
    refetch,
  } = getCurrentUserNotificationsQuery();

  const notifications = notificationData?.data;
  const meta = notificationData?.meta;

  const [page, setPage] = useState(meta?.page || 1);

  const totalPage = meta ? Math.ceil(meta?.totalResult / meta?.limit) : 1;

  const handleOnScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement; // Cast to HTMLDivElement

    if (
      target.scrollTop + target.clientHeight + 10 >= target.scrollHeight &&
      meta &&
      page < totalPage
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setPage((p: number) => p + 1);
        refetch();
        setIsLoading(false);
      }, 600);
    }
  };

  const { data } = getCurrentUserNotificationCountsQuery();

  const totalUnread = data?.data.unread;

  useEffect(() => {
    if (
      !notificationsIsLoading &&
      !notificationsIsRefetching &&
      notifications &&
      notifications.length
    ) {
      setAllNotifications(p => [...p, ...notifications] as any);
    }
  }, [notificationsIsLoading, notificationsIsRefetching]);

  const handelOnClick = (notification: Notification) => {
    let path;
    switch (notification.category) {
      case NotificationCategory.ORDER:
        path = '/cart';
        break;
      case NotificationCategory.ORDER:
        path = '/account/order-history';
        break;
      case NotificationCategory.CUSTOMER:
        path = `/customers`;
        break;
      case NotificationCategory.PROMOTION:
        path = '/wishlist';
        break;
    }

    if (path) {
      router.push(path);
    }
  };

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);
  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(p => !p);
        }}
        className="text-3xl p-1   text-txt-primary  rounded-full relative"
      >
        <PiBell />

        <div className="size-5 flex justify-center items-center bg-red-500 rounded-full absolute  -top-1  right-0 text-[0.6rem] text-white">
          {totalUnread || 0}
        </div>
      </button>

      {isOpen && (
        <div
          id="notification-bar"
          ref={barRef}
          onScroll={handleOnScroll}
          className="absolute right-0 w-60 h-60 z-40 overflow-y-auto no-scrollbar p-3 bg-paper shadow-2xl  rounded-md "
        >
          <h3 className="text-xl font-semibold font-secondary text-txt-primary">Notifications</h3>
          <div className=" mt-2">
            {allNotifications.map((notification, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handelOnClick(notification)}
                  className="p-2 flex  gap-1 hover:bg-gray-50 hover:cursor-pointer z-50 "
                >
                  <div className={`${!notification.isRead ? 'text-red-600' : 'text-green-600'}`}>
                    <span>
                      <GoDotFill />
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-[0.8rem]">
                      {getTimeAgo(notification.createdAt)}
                    </p>
                    <h2
                      className="text-[0.8rem] font-medium    font-secondary"
                      dangerouslySetInnerHTML={{
                        __html: notification.title.replace(
                          /"([^"]+)"/,
                          '<span class="font-semibold text-primary">$1</span>',
                        ),
                      }}
                    ></h2>
                    <p className="text-xs font-secondary">{notification.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {isLoading && <p className="mt-1 text-gray-700 font-medium">Loading..</p>}
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
