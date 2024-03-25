import express  from "express";
import { addColor, allColor, deleteColor } from "../controllers/color.js";
const router = express.Router();

router.post("/add-color", addColor)

router.get("/all-color", allColor)

router.delete("/delete-color/:id", deleteColor)

export default router;