import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserModel } from "./db.js";
import {z} from "zod";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

// Zod schema
const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

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
  // Login logic will go here
  res.send("Login endpoint");
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


