import express  from "express";
import { addOrder, allOrders, allOrdersAdmin } from "../controllers/order.js";
import isAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/add-order", isAuth, addOrder)

router.get("/all-order", isAuth, allOrders)

router.get("/all-order-admin", isAuth, allOrdersAdmin)

export default router;