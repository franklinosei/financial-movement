// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import "dotenv/config.js";

// ℹ️ Connects to the database
import "./src/db/index.js";

import "express-async-errors";

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from "express";
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
import configureApp from "./src/config/index.js";
configureApp(app);

import { uncaughtExceptions } from "./src/libs/logger/logger.js";
uncaughtExceptions();

// 👇 Start handling routes here
import indexRoutes from "./src/modules/app/routes/index.routes.js";
app.use("/api/v1", indexRoutes);

import authRoutes from "./src/modules/auth/routes/auth.routes.js";
app.use("/api/v1/auth", authRoutes);

import movementRoutes from "./src/modules/financial-movements/routes/routes.js";
app.use("/api/v1/financial-movements", movementRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import errorHandling from "./src/error-handling/index.js";
errorHandling(app);

export { app };
