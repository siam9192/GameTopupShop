import { IAuthUser } from '../../types';
import AdministratorModel from '../administrator/administrator.model';
import CustomerModel from '../customer/customer.model';
import {
  UpdateAdministratorProfilePayload,
  UpdateCustomerProfilePayload,
  UserRole,
} from './user.interface';

class UserService {
  async updateUserProfileIntoDB(
    authUser: IAuthUser,
    payload: UpdateCustomerProfilePayload | UpdateAdministratorProfilePayload
  ) {
    const role = authUser.role;

    let result;
    if (role === UserRole.CUSTOMER) {
      payload = payload as UpdateCustomerProfilePayload;
      result = await CustomerModel.updateOne(
        {
          _id: authUser.userId,
        },
        payload
      );
    } else {
      payload = payload as UpdateAdministratorProfilePayload;
      result = await AdministratorModel.updateOne(
        {
          _id: authUser.userId,
        },
        payload
      );
    }

    return result;
  }

  async getCurrentUserFromDB(authUser: IAuthUser) {
    const role = authUser.role;

    if (role === UserRole.CUSTOMER) {
      return await CustomerModel.findById(authUser.userId);
    } else return await AdministratorModel.findById(authUser.userId);
  }

  async getRecentUsersFromDB() {
    const customers = (
      await CustomerModel.find().sort({ createdAt: -1 }).limit(10).lean().select({
        _id: true,
        fullName: true,
        profilePicture: true,
        provider: true,
        createdAt: true,
      })
    ).map((_) => ({
      ..._,
      role: UserRole.CUSTOMER,
    }));

    const administrators = (
      await AdministratorModel.find().sort({ createdAt: -1 }).limit(10).lean().select({
        _id: true,
        fullName: true,
        profilePicture: true,
        level: true,
        provider: true,
        createdAt: true,
      })
    ).map((_) => ({
      ..._,
      role: _.level,
    }));

    // merge and sort again
    const users = [...customers, ...administrators]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    return users as any[];
  }
}

export default new UserService();
