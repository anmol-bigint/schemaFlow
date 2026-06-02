import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};