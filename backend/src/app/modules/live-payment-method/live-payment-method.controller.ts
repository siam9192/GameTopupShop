import { paginationOptionPicker } from '../../helpers/paginationHelper';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import Pick from '../../utils/pick';
import { sendSuccessResponse } from '../../utils/response';
import livePaymentMethodService from './live-payment-method.service';

class LivePaymentMethodController {
  updateLivePaymentMethodStatus = catchAsync(async (req, res) => {
    const result = await livePaymentMethodService.updateLivePaymentMethodStatusIntoDB(req.body);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Live payment method status updated successfully',
    });
  });
  getLivePaymentMethods = catchAsync(async (req, res) => {
    const result = await livePaymentMethodService.getLivePaymentMethodsFromDB(
      Pick(req.query, ['status', 'searchTerm']),
      paginationOptionPicker(req.query)
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      ...result,
      message: 'Live payment methods retrieved successfully',
    });
  });
  getPublicLivePaymentMethods = catchAsync(async (req, res) => {
    const result = await livePaymentMethodService.getLivePaymentMethodsFromDB(
      Pick(req.query, ['searchTerm']),
      paginationOptionPicker(req.query)
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      ...result,
      message: 'Live payment methods retrieved successfully',
    });
  });
  getLivePaymentMethodById = catchAsync(async (req, res) => {
    const result = await livePaymentMethodService.getLivePaymentMethodByIdFromDB(req.params.id);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Live payment methods retrieved successfully',
    });
  });
}

export default new LivePaymentMethodController();
