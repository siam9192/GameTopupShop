import { paginationOptionPicker } from '../../helpers/paginationHelper';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import notificationService from './notification.service';

class NotificationController {
  getMyNotifications = catchAsync(async (req, res) => {
    const result = await notificationService.getMyNotificationsFromDB(
      req.user,
      paginationOptionPicker(req.query)
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      ...result,
      message: 'Notifications retrieved Successfully',
    });
  });
  notificationsSetAsRead = catchAsync(async (req, res) => {
    const result = await notificationService.notificationsSetAsRead(req.user, req.body);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Notifications retrieved Successfully',
    });
  });

  getMyUnreadNotifications = catchAsync(async (req, res) => {
    const result = await notificationService.getMyUnreadNotifications(
      req.user,
      paginationOptionPicker(req.query)
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      ...result,
      message: 'Notifications  set as read successful',
    });
  });
  getMyNotificationCounts = catchAsync(async (req, res) => {
    const result = await notificationService.getMyNotificationCounts(req.user);
    console.log(result);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Notification set as read successful',
    });
  });
}

export default new NotificationController();
