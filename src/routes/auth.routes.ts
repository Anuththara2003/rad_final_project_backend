

import { Router } from "express";
import { forgotPassword, googleLogin, handleRefreshToken, loginUser, registerUser, resetPassword } from "../controller/auth.Controller";

const router = Router();

  router.post("/signup",registerUser);
  router.post("/login",loginUser);

  router.post("/refresh", handleRefreshToken);
  router.post("/google", googleLogin);
  router.post("/forgot-password", forgotPassword); 
  router.put("/resetpassword/:token", resetPassword);
 
  
  export default router;