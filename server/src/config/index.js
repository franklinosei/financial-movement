import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import morgan from "morgan";

import { morgStream } from "../libs/logger/logger.js";

import helmet from "helmet";

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

// Middleware configuration
export default app => {
  // Because this will be hosted on a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like Fly use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );

  app.use(helmet());

  app.use(morgan("combined", { stream: morgStream }));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
