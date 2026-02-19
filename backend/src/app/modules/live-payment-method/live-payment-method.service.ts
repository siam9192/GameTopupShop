import { Types } from 'mongoose';
import { IPaginationOptions } from '../../types';
import {
  LivePaymentMethodsFilterPayload,
  LivePaymentMethodStatus,
  UpdateLivePaymentMethodStatus,
} from './live-payment-method.interface';
import { calculatePagination } from '../../helpers/paginationHelper';
import LivePaymentMethodModel from './live-payment-method.model';
import { objectId } from '../../helpers';
import httpStatus from '../../shared/http-status';
import AppError from '../../Errors/AppError';

class LivePaymentMethodService {
  async getLivePaymentMethodsFromDB(
    filterPayload: LivePaymentMethodsFilterPayload,
    paginationOptions: IPaginationOptions
  ) {
    const { searchTerm, ...otherFilterPayload } = filterPayload;
    let whereConditions: any = {
      isAvailable: true,
    };
    if (searchTerm) {
      if (Types.ObjectId.isValid(searchTerm)) {
        whereConditions._id = searchTerm;
      } else {
        whereConditions.$or = [
          {
            name: { $regex: searchTerm, $options: 'i' },
          },
        ];
      }
    } else if (Object.keys(otherFilterPayload).length) {
      whereConditions = otherFilterPayload;
    }

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions, {
      limitOverride: 20,
    });

    const offers = await LivePaymentMethodModel.find(whereConditions)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalResults = await LivePaymentMethodModel.countDocuments(whereConditions);

    const total = await LivePaymentMethodModel.countDocuments(whereConditions);

    return {
      data: offers,
      meta: {
        page,
        limit,
        totalResults,
        total,
      },
    };
  }

  async getPublicLivePaymentMethodsFromDB(
    filterPayload: LivePaymentMethodsFilterPayload,
    paginationOptions: IPaginationOptions
  ) {
    const { searchTerm, ...otherFilterPayload } = filterPayload;
    let whereConditions: any = {
      status: LivePaymentMethodStatus.ACTIVE,
      isAvailable: true,
    };
    if (searchTerm) {
      whereConditions.name = { $regex: searchTerm, $options: 'i' };
    }
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions, {
      limitOverride: 20,
    });

    const methods = await LivePaymentMethodModel.find(whereConditions)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalResults = await LivePaymentMethodModel.countDocuments(whereConditions);

    const total = await LivePaymentMethodModel.countDocuments(whereConditions);

    return {
      data: methods,
      meta: {
        page,
        limit,
        totalResults,
        total,
      },
    };
  }

  async getLivePaymentMethodByIdFromDB(id: string) {
    const existingMethod = await LivePaymentMethodModel.findOne({
      _id: objectId(id),
      isAvailable: true,
    });
    if (!existingMethod) throw new AppError(httpStatus.NOT_FOUND, 'Method not found');
    return existingMethod;
  }

  async updateLivePaymentMethodStatusIntoDB(payload: UpdateLivePaymentMethodStatus) {
    const { id, status } = payload;

    const existing = await LivePaymentMethodModel.findById(id);
    if (!existing) throw new AppError(httpStatus.NOT_FOUND, 'Method not found');

    return await LivePaymentMethodModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );
  }
}

export default new LivePaymentMethodService();
