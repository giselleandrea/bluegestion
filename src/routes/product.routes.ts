import { Router } from "express";
import path from "path";
import productController from "../controllers/productController";

const router = Router();

//views 
router.get("/createProduct", (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'createProduct.html'));
});

//controllers
router.post("/product/create", productController.createProduct);
router.post("/product/update", productController.updateProduct);
router.get("/product/product/:product_id", productController.getProduct);
router.get("/product/products", productController.getProducts);
router.get("/product/categories", productController.getCategories);

export default router;