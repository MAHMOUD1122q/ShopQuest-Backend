import express  from "express";
import { addSize, allSize, deleteSize } from "../controllers/size.js";

const router = express.Router();

router.post("/add-size", addSize)

router.get("/all-size", allSize)

router.delete("/delete-size/:id", deleteSize)



export default router;