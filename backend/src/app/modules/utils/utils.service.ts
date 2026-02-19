import { calculatePagination } from '../../helpers/paginationHelper';
import { IPaginationOptions } from '../../types';
import { OfferStatus } from '../offer/offer.interface';
import { TopupStatus } from '../topup/topup.interface';
import TopupModel from '../topup/topup.model';

class UtilsService {
  async getSearchProductsFromDB(searchTerm: string, paginationOptions: IPaginationOptions) {
    if (!searchTerm.trim()) {
      throw new Error('SearchTerm is required');
    }
    const { limit, skip, page } = calculatePagination(paginationOptions);
    const pipeline = [
      {
        $match: {
          name: { $regex: searchTerm, $options: 'i' },
          status: TopupStatus.ACTIVE,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          coverPhoto: 1,
          type: { $literal: 'Topup' },
        },
      },
      {
        $unionWith: {
          coll: 'offers', // Replace with your OfferModel.collection.name
          pipeline: [
            {
              $match: {
                name: { $regex: searchTerm, $options: 'i' },
                status: OfferStatus.Running,
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                coverPhoto: 1,
                type: { $literal: 'Offer' },
              },
            },
          ],
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $addFields: { rand: { $rand: {} } } },
            { $sort: { rand: 1 } }, // Random order
            { $skip: skip },
            { $limit: limit },
            { $project: { rand: 0 } },
          ],
        },
      },
      {
        $project: {
          data: 1,
          meta: {
            totalResults: { $ifNull: [{ $arrayElemAt: ['$metadata.total', 0] }, 0] },
            page: { $literal: page },
            limit: { $literal: limit },
          },
        },
      },
    ];

    const result = await TopupModel.aggregate(pipeline as any);
    return result[0] || { data: [], meta: { total: 0, page, limit } };
  }
}

export default new UtilsService();
