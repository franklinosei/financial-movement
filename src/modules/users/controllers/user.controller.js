import _ from "lodash";
import { createError } from "../../../libs/utils/index.js";
import UserService from "../user.services/user.service.js";
import { updateUserSchema } from "../validations/user.schema.js";

class UserController {
  static async updateProfile(req, res) {
    const user = req.payload;
    const updateData = updateUserSchema.parse(req.body);

    let updatedUser = await UserService.updateUserById(user._id, updateData);

    if (!updatedUser) throw createError(500, "Could not update profile");

    updatedUser = _.omit(updatedUser.toJSON(), ["hashedPassword"]);
    await removeRedisDataByPattern("/users*");

    res.status(200).json({ success: true, user: updatedUser });
  }

  static async getUserProfile(req, res) {
    const user = req.payload;
    let userProfile = await UserService.findUserById(user._id);

    if (!userProfile) throw createError(404, "User profile not found!");

    userProfile = _.omit(userProfile.toJSON(), ["hashedPassword"]);

    res.status(200).json({ profile: userProfile });
  }
}

export default UserController;
