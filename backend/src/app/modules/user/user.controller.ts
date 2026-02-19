import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import userService from './user.service';

class UserController {
  updateUserProfile = catchAsync(async (req, res) => {
    const result = await userService.updateUserProfileIntoDB(req.user, req.body);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'User profile updated Successfully',
    });
  });

  getCurrentUser = catchAsync(async (req, res) => {
    const result = await userService.getCurrentUserFromDB(req.user);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'User profile retrieved Successfully',
    });
  });
  getRecentUsers = catchAsync(async (req, res) => {
    const result = await userService.getRecentUsersFromDB();
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Recent users retrieved Successfully',
    });
  });
}

export default new UserController();
