import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  try {
    const { fullname, emailId, phoneNumber, password, role } = req.body;
    if (!fullname || !emailId || !phoneNumber || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields ",
        success: false,
      });
    }
    const user = await User.findOne({ emailId });
    if (user) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      emailId,
      password: hashedPassword,
      role,
      phoneNumber,
    });
    await newUser.save();
    res.status(200).json({
      message: `Account created successfully ${fullname}`,
      success: true,
    });
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
};
export const login = async (req, res) => {
  try {
    const { emailId, password, role } = req.body;
    if (!emailId || !password || !role) {
      return res.status(400).json({
        message: "Email , password and Role are required",
        success: false,
      });
    }
    let user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).json({
        message: "Invalid  credential",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid  credential",
        success: false,
      });
    }
    if (user.role !== role) {
      return res.status(404).json({
        msg: "invalid Credentials",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Logged in successfully",
        success: "true",
        user,
      });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", null, {
    maxAge: 0 * 0 * 0 * 0,
  });
  res.send("Logout successfully");
};

export const update = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["phoneNumber", "bio", "skills", "fullname"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
       const updateData = {};
       if (data.fullname) updateData.fullname = data.fullname;
       if (data.phoneNumber) updateData.phoneNumber = data.phoneNumber;
       if (data.bio) updateData["profile.bio"] = data.bio;
       if (data.skills) updateData["profile.skills"] = data.skills;
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
   

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
