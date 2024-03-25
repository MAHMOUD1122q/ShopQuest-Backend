import express  from "express";
import { addCategory, allCategory, deleteCategory } from "../controllers/category.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add-category",upload.single("image"), addCategory)

router.get("/all-category", allCategory)

router.delete("/delete-category/:id", deleteCategory)

export default router;