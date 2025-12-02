
import { Router } from "express";
import { addProduct, deleteProduct, getProducts, getRecommendations, updateProduct } from "../controller/product.Controller";
import { authenticate } from "../middleware/authenticate";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.post("/",authenticate,isAdmin, addProduct);
router.get("/",authenticate,isAdmin, getProducts);
router.post("/recommend",authenticate,isAdmin,getRecommendations);
router.put("/:id",authenticate,isAdmin, updateProduct);
router.delete("/:id",authenticate,isAdmin, deleteProduct);





export default router;