import { Router } from "express";
import path from "path";
import AuthController from "../controllers/AuthController";

const router = Router();

//views 
router.get("/createUser", (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'createUser.html'));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'home.html'));
});

//controllers
router.post("/api/users", AuthController.createUser);
router.post("/api/login", AuthController.login);

export default router;