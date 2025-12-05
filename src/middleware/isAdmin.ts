import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    console.log("Checking Admin Role for:", user.role);

    
    if (Array.isArray(user.role)) {
      if (!user.role.includes("ADMIN")) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
    } 
   
    else {
      if (user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
    }

    next(); 
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    res.status(500).json({ message: "Server error in admin check" });
  }
};