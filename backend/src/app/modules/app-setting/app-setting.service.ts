import { UpdateAppSettingPayload } from './app-setting.interface';
import AppSettingModel from './app-setting.model';

class AppSettingService {
  async createDefaultAppSettingIntoDB() {
    const setting = await AppSettingModel.findOne();
    if (setting) return;
    await AppSettingModel.create({});
  }
  async getAppSettingFromDB() {
    return await AppSettingModel.findOne({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
  }
  async updateAppSetting(payload: UpdateAppSettingPayload) {
    return await AppSettingModel.updateOne(payload);
  }
}

export default new AppSettingService();
