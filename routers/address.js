import express from "express";
import {
  AddNewAddress,
  allAddress,
  deleteAddress,
} from "../controllers/address.js";
import isAuth from "../middleware/auth.js";

const router = express.Router();

//========== POST ==============
// AddNewAddress
router.post("/add-address", isAuth, AddNewAddress);

//========== GET ==============

router.get("/all-address", isAuth, allAddress);

//========== DELETE ==============

router.delete("/delete-address/:id", deleteAddress);

export default router;
