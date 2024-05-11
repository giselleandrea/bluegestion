import { Router } from "express";
import path from "path";
import branchController from "../controllers/branchController";

const router = Router();

//views 
router.get("/createBranch", (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'createBranch.html'));
});

//controllers
router.post("/branch/create", branchController.createBranch);
router.get("/branch/branch/:branch_id", branchController.getBranch);
router.get("/branch/branches", branchController.getBranches);

export default router;