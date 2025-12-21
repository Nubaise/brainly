import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();

app.post("/api/v1/signup", async (req, res) => {
  // Signup logic will go here
  res.send("Signup endpoint");
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


