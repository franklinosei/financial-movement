import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../../users/user.services/user.service.js";
import { createError } from "../../../libs/utils/index.js";

class AuthService {
  static async validateUser({ email, password }) {
    const foundUser = await UserService.findUserByEmail(email);

    if (!foundUser) throw createError(401, "Wrong email or password");

    const passwordCorrect = bcrypt.compareSync(
      password,
      foundUser.hashedPassword
    );

    if (!passwordCorrect) throw createError(401, "Wrong email or password");

    return foundUser;
  }

  static createToken(payload, expiration = "6h") {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: expiration,
    });
  }

  static verifyJwtToken(token) {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  }
}

export default AuthService;
