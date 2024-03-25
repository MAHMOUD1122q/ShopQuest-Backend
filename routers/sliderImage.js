import express  from "express";
import { AddSliderImage, allSlider, deleteSlider } from "../controllers/sliderImage.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add-slider", upload.single("image"), AddSliderImage)

router.get("/all-slider", allSlider) 

router.delete("/delete-slider/:id", deleteSlider)

export default router;