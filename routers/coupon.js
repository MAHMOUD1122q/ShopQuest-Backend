import express  from "express";
import { addCoupon, allCoupon, checkCoupon } from "../controllers/coupon.js";
import isAuth from '../middleware/auth.js';
const router = express.Router();

// to add the appointment
router.post("/add-coupon", addCoupon)

// to get all the appointment
router.get("/all-coupon", allCoupon)

router.put("/check-coupon", isAuth, checkCoupon)

export default router;