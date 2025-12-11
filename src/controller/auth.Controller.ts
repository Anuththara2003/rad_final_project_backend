import { Request, Response } from "express";
import { Role, User } from "../model/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import sendEmail from "../utils/sendEmail";


dotenv.config()



const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);


const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

export const registerUser = async (req: Request, res: Response) => {

  try {

    const { username, email, password } = req.body;

    const role = Role.USER;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "USER",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const loginUser = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }


    const isMatch = await bcrypt.compare(password, user.password);



    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }


    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.json({
      message: "Login successful",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ message: "Invalid or expired token" })
    }

    const payload = Jwt.verify(token, JWT_REFRESH_SECRET)
    const user = await User.findById(payload.sub)

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" })
    }

    const accessToken = signAccessToken(user)
    res.status(200).json({ accessToken })


  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" })
  }
}


export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;


    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      res.status(400).json({ message: "Invalid Google Token" });
      return;
    }

    const { email, name, sub } = payload;


    let user = await User.findOne({ email });


    if (!user) {

      const randomPassword = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        username: name,
        email: email,
        password: hashedPassword,
        role: Role.USER,
        wishlist: []
      });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);


    res.json({
      message: "Google Login Successful",
      accessToken,
      refreshToken,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Google Login Failed", error });
  }
};




export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // මෙතන return දැම්මේ නැත්නම් පහලට රන් වෙනවා. ඒකයි Error එක එන්නේ.
      res.status(404).json({ message: "Email not found" });
      return; 
    }

    // Token ජෙනරේට් කිරීම...
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `You requested a password reset. Link: ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Your Giftify Password",
        message: message,
        url: resetUrl,
      });

      // මෙතනත් return දාන්න
      res.status(200).json({ message: "Email sent successfully" });
      return;

    } catch (emailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      // මෙතනත් return දාන්න
      res.status(500).json({ message: "Email could not be sent" });
      return;
    }

  } catch (error) {
    // මෙතනත් return දාන්න
    res.status(500).json({ message: "Server Error", error });
    return;
  }
};




export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      // වැදගත්ම තැන: මෙතන return නැත්නම් පහළට ගිහින් ආයේ res.json කරන්න හදනවා
      res.status(400).json({ message: "Invalid or expired token" });
      return; 
    }

    // Password වෙනස් කිරීම...
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully! Please login." });
    return; // මෙතනත් පුරුද්දට return දාන්න

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    return;
  }
};