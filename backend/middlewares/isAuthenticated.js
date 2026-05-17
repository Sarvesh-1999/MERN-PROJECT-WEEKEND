import jwt from "jsonwebtoken";
import { User } from "../src/models/user-model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      let { id } = decoded;
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "user not found!",
        });
      }

      req.userId = user._id;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token is missing or invalid",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
