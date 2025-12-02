 import { Router } from "express";
 import { createOrder, getAllOrders, getUserOrders, getUserOrdersbyEmail, updateOrderStatus } from "../controller/order.Controller";
import { authenticate } from "../middleware/authenticate";
import { isAdmin } from "../middleware/isAdmin";
 const router = Router();


  router.post("/",authenticate,createOrder);
  router.get("/user/:email",authenticate,getUserOrders);//
    router.get("/",authenticate,getAllOrders);
    router.put("/:id",authenticate,isAdmin, updateOrderStatus);//
    router.get("/:email",getUserOrdersbyEmail);


  export default router;