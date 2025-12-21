import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

import { UserModel } from "./models/User.js";

import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



dotenv.config();
const app = express();
app.use(express.json());
// Connect to MongoDB
connectDB();

import { signupSchema, signinSchema } from "./schemas/auth.js";

app.post("/api/v1/signup", async (req, res) => {
  try {
    // 1. Validate input
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.issues,
      });
    }

    const { username, password } = parsed.data;

    // 2. Check if user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save user
    await UserModel.create({
      username,
      password: hashedPassword,
    });

    // 5. Respond
    res.json({
      message: "User signed up successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    // 1. Validate input
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.issues,
      });
    }

    const { username, password } = parsed.data;

    // 2. Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 5. Send response
    res.json({
      message: "User Signin successful",
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
app.post("/api/v1/content", async (req, res) => {
  // Create note logic will go here
  res.send("Create note endpoint");
});

app.get("/api/v1/content", async (req, res) => {
  // Get all notes logic will go here
  res.send("Get all notes endpoint");
});

app.delete("/api/v1/content", async (req, res) => {
  // Delete note logic will go here
  res.send("Delete note endpoint");
});

app.post("/api/v1/brain/share", async (req, res) => {
  // Share note logic will go here
  res.send("Share note endpoint");
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  // Get shared note logic will go here
  res.send("Get shared note endpoint");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
