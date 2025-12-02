import { Request, Response } from "express";
import { User } from "../model/user";
import { Product } from "../model/product";
import { AuthRequest } from "../middleware/authenticate";


export const toggleWishlist = async (req:Request, res:Response)=> {
  try {
    const { email, productId } = req.body;
    const user: any = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.wishlist) {
        user.wishlist = [];
    }

    const wishlist = user.wishlist;
    const index = wishlist.indexOf(productId);

    if (index === -1) {
      wishlist.push(productId); 
    } else {
      wishlist.splice(index, 1); 
    }

    await user.save();
    res.json({ message: "Wishlist updated", wishlist: user.wishlist });
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({ message: "Error updating wishlist", error });
  }
};


export const getWishlist = async (req:Request, res:Response)=> {
  try {
    const user: any = await User.findOne({ email: req.params.email });

    if (!user) {
      res.json([]);
      return;
    }
    if (!user.wishlist || user.wishlist.length === 0) {
      res.json([]); 
      return;
    }
    const products = await Product.find({ _id: { $in: user.wishlist } });

    res.json(products);

  } catch (error) {
    console.error("Wishlist Backend Error:", error); 
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
