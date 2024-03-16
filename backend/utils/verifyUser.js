import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (_req, res, next) => {
  const token = _req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Access denied!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Invalid token"));

    _req.user = user;
    next();
  });
};
