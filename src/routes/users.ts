import express from "express";
import { User } from "../model/user";
import { Product } from "../model/product"; 

const router = express.Router();

// 1. Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// 2. Delete User
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});


// 3. Add/Remove Wishlist Item (PUT) - Fixed Version
router.put("/wishlist", async (req, res): Promise<void> => {
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
});


// 4. Get User Wishlist (ආරක්ෂිතම ක්‍රමය)
router.get("/wishlist/:email", async (req, res) => {
  try {
    // 1. User ව හොයාගන්නවා
    const user: any = await User.findOne({ email: req.params.email });

    // User කෙනෙක් නැත්නම් හිස් ලිස්ට් එකක් යවනවා (Error එවන්නේ නෑ)
    if (!user) {
      res.json([]);
      return;
    }

    // 2. Wishlist එක තියෙනවද කියලා බලනවා
    if (!user.wishlist || user.wishlist.length === 0) {
      res.json([]); // Wishlist එක හිස් නම් හිස් Array එකක් යවනවා
      return;
    }

    // 3. Product IDs ටික අරගෙන, Product Table එකෙන් විස්තර හොයනවා
    // (මෙතන Product Import කරලා තියෙන්න ඕනේ උඩින්)
    const products = await Product.find({ _id: { $in: user.wishlist } });

    res.json(products);

  } catch (error) {
    console.error("Wishlist Backend Error:", error); // Terminal එකේ Error එක පෙන්නනවා
    res.status(500).json({ message: "Error fetching wishlist" });
  }
});

export default router;