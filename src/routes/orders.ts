 import { Router } from "express";
 import { getUserOrders, getAllOrders, updateOrderStatus, createOrder } from "../controller/order.Controller";
 const routes = Router();

 routes.get("/user/:email",getUserOrders);
  routes.get("/",getAllOrders);
  routes.put("/:id",updateOrderStatus);
  routes.post("/",createOrder);


  export default routes;