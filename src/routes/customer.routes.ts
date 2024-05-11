import { Router } from "express";
import path from "path";
import customerController from "../controllers/customerController";

const router = Router();

//views 
router.get("/createCustomer", (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'createCustomer.html'));
});

//controllers
router.post("/customer/create", customerController.createCustomer);
router.get("/customer/customer/:customer_id", customerController.getCustomer);
router.get("/customer/customers", customerController.getCustomers);

export default router;