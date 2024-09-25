import { transports, createLogger, format } from "winston";
import stream from "stream";

const fileFormats = [
  format.timestamp(),
  format.json(),
  format.errors({ stack: true }),
];

const uncaughtExceptions = function () {
  process.on("unhandledRejection", ex => {
    throw ex;
  });

  const uncaughtExceptionLogger = createLogger({
    transports: [
      new transports.File({
        filename: "logs/uncaughtException.log",
        handleExceptions: true,
        format: format.combine(...fileFormats),
      }),
    ],
  });

  uncaughtExceptionLogger.exitOnError = false;
};

const createFileTransport = (filename, level) => {
  return new transports.File({
    filename: `logs/${filename}.log`,
    level,
    format: format.combine(...fileFormats),
  });
};

const consoleTransport = new transports.Console({
  format: format.combine(...fileFormats),
});

const logger = createLogger({
  transports: [
    consoleTransport,
    createFileTransport("error", "error"),
    createFileTransport("info", "info"),
  ],
});

const httpLogger = createLogger({
  level: "http",
  format: format.combine(...fileFormats),
  transports: [
    consoleTransport,
    new transports.File({
      filename: "logs/server_requests.log",
    }),
  ],
});

const morgStream = new stream.Writable({
  write (chunk, _, next) {
    httpLogger.info(chunk.toString().trim());
    next();
  },
});

// Remove the file transports in the development environment
const environment = process.env.ENV;

if (environment === "dev") {
  logger.transports.slice(1).forEach(transport => (transport.silent = true));
}

export { uncaughtExceptions, logger, morgStream };
