

import { Router } from "express";
import { register } from "module";
import { loginUser, registerUser } from "../controller/auth.Controller";
import { get } from "http";
import { getUserOrders } from "../controller/order.Controller";



const routes = Router();
 routes.post("/signup",registerUser);
  routes.post("/login",loginUser);
 
  
  export default routes;