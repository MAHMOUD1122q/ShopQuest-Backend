import express  from "express";

import { SingleProduct, addProduct, allProducts, allProductsAdmin, deleteProduct, productsByCategory, rating, searchProduct, updateProduct } from "../controllers/products.js";
import upload from "../middleware/multer.js";
import isAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/add-product", upload.array("images"), addProduct)

router.get("/all-products", allProducts)

router.get("/all-products-admin", allProductsAdmin)

router.get("/product-by-category/:category", productsByCategory)

router.get("/search", searchProduct)

router.get("/single-product", SingleProduct)

router.put("/:id/review", isAuth , rating);

router.patch("/update-product/:id", updateProduct)

router.delete("/delete-product/:id", deleteProduct)



export default router;