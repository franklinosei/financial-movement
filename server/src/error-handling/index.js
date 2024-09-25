import { logger } from "../libs/logger/logger.js";
import { z } from "zod";
import mongoose from "mongoose";

export default (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    logger.error(err);

    if (err instanceof z.ZodError) {
      const validationErrors = err.errors.map((error) => error.message);
      const errorMessage = validationErrors.join(". ");

      return res.status(400).json({
        message: errorMessage,
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        status: err.status || 401,
        message: "Token has expired",
      });
    }

    if (err instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(err.errors).map(
        (val) => val.message
      );
      const errorMessage = `Invalid input data: ${validationErrors.join(", ")}`;
      return res
        .status(400)
        .json({ success: false, status: 400, message: errorMessage });
    }

    if (err instanceof mongoose.Error.CastError) {
      const errorMessage = `Invalid ${err.path}: ${err.value}`;
      return res
        .status(400)
        .json({ success: false, status: 400, message: errorMessage });
    }

    if (err.code === 11000) {
      const duplicateValue = Object.keys(err.keyValue)[0];
      const errorMessage = `Duplicate ${duplicateValue} value: ${err.keyValue[duplicateValue]}`;
      return res
        .status(409)
        .json({ success: false, status: 409, message: errorMessage });
    }

    if (!res.headersSent) {
      const statusCode = err.status || 500;
      const errorResponse = {
        success: false,
        status: statusCode,
        message: err.message || "Internal Server Error",
      };

      res.status(statusCode).json(errorResponse);
    }
  });
};
