import jwt from "jsonwebtoken";
import User from "../Models/user.js";
const secret = "aTWbeQsdwdevd122421jhjgngh@#@!#$awwqQe";

export default async function isAuth(req, res, next) {
  const { token } = req.cookies;
  //valdiation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User please login first",
    });
  }
  const decodeData = jwt.verify(token, secret);
  req.user = await User.findById(decodeData.id);
  next();
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
