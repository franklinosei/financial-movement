import { createUserSchema } from "../../users/validations/user.schema.js";
import { createError, hashPassword } from "../../../libs/utils/index.js";
import UserService from "../../users/user.services/user.service.js";
import AuthService from "../auth.services/auth.services.js";
import _ from "lodash";

class AuthController {
  static async signUpUser(req, res) {
    const { email, password, firstName, lastName } = createUserSchema.parse(
      req.body
    );

    const foundUser = await UserService.findUserByEmail(email);

    if (foundUser)
      throw createError(400, "Email already associated with another account");

    const hashedPassword = hashPassword(password);

    const createdUser = await UserService.createUser({
      email,
      hashedPassword,
      firstName,
      lastName,
    });

    const user = {
      email,
      firstName,
      lastName,
      _id: createdUser._id,
    };

    const authToken = AuthService.createToken(user);

    return res.status(201).json({ user, authToken });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (_.isEmpty(email) || _.isEmpty(password)) {
      return res.status(400).json({ message: "Provide email and password." });
    }

    const user = await AuthService.validateUser({ email, password });

    const payload = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const authToken = AuthService.createToken(payload);

    return res.status(200).json({ authToken });
  }

  static verifyToken(req, res) {
    return res.status(200).json(req.payload);
  }
}

export default AuthController;
