import { Router } from "express";
import { getStats } from "../controller/stats.Controller";

const router = Router();

router.get("/",getStats);


export default router;