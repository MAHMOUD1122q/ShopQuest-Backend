import jwt from "jsonwebtoken";
import User from "../Models/user.js";
export default async function isAuth(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedPayload.id);
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized User please login first",
      });
    }
  } else {
    return res
      .status(401)
      .json({
        success: false,
        message: "UnAuthorized User please login first",
      });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
