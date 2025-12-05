import { Request, Response } from "express";
import { User } from "../model/user";
import { Product } from "../model/product";
import { AuthRequest } from "../middleware/authenticate";


export const toggleWishlist = async (req:Request, res:Response)=> {
  try {
    const { email, productId } = req.body;
      console.log("1. Request Received:", { email, productId });
    const user: any = await User.findOne({ email });

    if (!user) {
      console.log("2. User Not Found");
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.wishlist) {
        user.wishlist = [];
    }

    const wishlist = user.wishlist;
    const index = wishlist.indexOf(productId);


    if (index === -1) {
     user. wishlist.push(productId); 
       console.log("3. Item Added to Wishlist");
    } else {
     user. wishlist.splice(index, 1); 
     console.log("3. Item Removed from Wishlist");
    }

    await user.save();
    console.log("4. User Saved Successfully");
    res.json({ message: "Wishlist updated", wishlist: user.wishlist });
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({ message: "Error updating wishlist", error });
  }
};


export const getWishlist = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    console.log("🔍 Checking Wishlist for:", email); // Log 1

    const user: any = await User.findOne({ email });

    if (!user) {
      console.log("❌ User Not Found");
      res.json([]);
      return;
    }

    console.log("📋 User Wishlist IDs:", user.wishlist); 

    if (!user.wishlist || user.wishlist.length === 0) {
      console.log("⚠️ Wishlist is Empty in Database");
      res.json([]);
      return;
    }

   
    const wishlistProducts = await Product.find({ _id: { $in: user.wishlist } });
    
    console.log("✅ Found Products Count:", wishlistProducts.length); 

    res.json(wishlistProducts);

  } catch (error) {
    console.error("🔥 Wishlist Error:", error);
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};







export const getAllUsers = async (req:Request, res:Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};





export const deleteUser = async (req:Request, res:Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};


export const getMyDetails = async (req: AuthRequest, res: Response) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const userId = req.user.sub

    try {
        const user = await User.findById(userId)
        console.log(user);
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
