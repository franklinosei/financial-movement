import UserModel from "../models/User.model.js";

class UserService {
  static async createUser(userData) {
    return await UserModel.create(userData);
  }

  static async findUserById(userId) {
    return await UserModel.findById(userId);
  }

  static async findUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  static async updateUserById(userId, updateData) {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
  }
}

export default UserService;
