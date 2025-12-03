import { Router } from "express";
import { deleteUser, getAllUsers, getMyDetails, getWishlist, toggleWishlist } from "../controller/userdashboard.Controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.put("/wishlist",toggleWishlist);
router.get("/wishlist/:email",getWishlist);
router.get("/",getAllUsers);
router.delete("/:id",deleteUser);
router.get("/getMyDetails",authenticate,getMyDetails)

export default router;