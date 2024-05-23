import { Router } from "express";
import path from "path";
import AuthController from "../controllers/AuthController";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

//views 
router.get("/createUser", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'createUser.html'));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'login.html'));
});

router.get("/home", (req, res) => { 
    res.sendFile(path.join(__dirname, '../../public/views', 'home.html'));
});

/*router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});*/

/*router.get("/home", authenticateToken, (req, res) => { 
    res.sendFile(path.join(__dirname, '../../public/views', 'home.html'));
});*/

//controllers
router.post("/api/users", AuthController.createUser);
router.post("/api/login", AuthController.login);

export default router;