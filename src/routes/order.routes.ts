import { Router } from "express";
import path from "path";
import orderController from "../controllers/orderController";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

//views 
router.get("/createOrder", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'createOrder.html'));
});

//controllers
router.post("/order/create", orderController.createOrder);
router.put("/order/status", orderController.updateStatusOrder);
router.get("/order/order/:order_id", orderController.getOrderProduct);
router.get("/order/orders", orderController.getOrderProducts);

export default router;