import { NODE_ENV } from "../configs/env.js";

export function errorMiddleware(err, req, res, next) {
  const status = err?.status || 500;
  const message = err?.message || "Internal Server Error";

  const payload = {
    message,
    ...(err?.details ? { details: err.details } : {}),
  };

  // In development include extra error info to help debugging (do not enable in production)
  if (NODE_ENV === "development") {
    if (err?.original) payload.sqlError = err.original;
    if (err?.stack) payload.stack = err.stack;
  }

  res.status(status).json(payload);
}
