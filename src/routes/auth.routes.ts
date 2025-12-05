

import { Router } from "express";
import { googleLogin, handleRefreshToken, loginUser, registerUser } from "../controller/auth.Controller";

const router = Router();

  router.post("/signup",registerUser);
  router.post("/login",loginUser);

  router.post("/refresh", handleRefreshToken);
  router.post("/google", googleLogin);
 
  
  export default router;