import { paginationOptionPicker } from '../../helpers/paginationHelper';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import utilsService from './utils.service';

class UtilsController {
  getSearchProducts = catchAsync(async (req, res) => {
    const result = await utilsService.getSearchProductsFromDB(
      req.query.searchTerm as string,
      paginationOptionPicker(req.query)
    );
    console.log(result);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      ...result,
      message: 'Products search results retrieved successfully',
    });
  });
}

export default new UtilsController();
