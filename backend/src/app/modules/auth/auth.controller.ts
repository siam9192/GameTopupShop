import { Request, Response } from 'express';
import authService from './auth.service';
import { sendSuccessResponse } from '../../utils/response';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import ms from 'ms';
import envConfig from '../../config/env.config';
class AuthController {
  customerSignUp = catchAsync(async (req, res) => {
    const result = await authService.customerSignup(req.body);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Account created Successfully',
    });
  });
  customerSignin = catchAsync(async (req, res) => {
    const result = await authService.customerSignin(req.body);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true, // can't be accessed via JS
      secure: true, // only sent over HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookie('refreshToken', result.accessToken, {
      httpOnly: true, // can't be accessed via JS
      secure: true, // only sent over HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Signin successful',
    });
  });
  administratorSignin = catchAsync(async (req, res) => {
    const result = await authService.administratorSignIn(req.body);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Signin successful',
    });
  });

  changePassword = catchAsync(async (req, res) => {
    const result = await authService.changePassword(req.user, req.body);
    sendSuccessResponse(res, {
      message: 'Password has been changed successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

  getNewAccessToken = catchAsync(async (req, res) => {
    const result = await authService.getNewAccessToken(req.body.refreshToken);
    sendSuccessResponse(res, {
      message: 'New access token retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

  callback = catchAsync(async (req, res) => {
    const result = await authService.callback(req.body);
    sendSuccessResponse(res, {
      message: 'Access token retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });
}

export default new AuthController();
