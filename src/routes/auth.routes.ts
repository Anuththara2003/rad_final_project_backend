

import { Router } from "express";
import { handleRefreshToken, loginUser, registerUser } from "../controller/auth.Controller";

const router = Router();

  router.post("/signup",registerUser);
  router.post("/login",loginUser);

  router.post("/refresh", handleRefreshToken);
 
  
  export default router;