import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController";
import { rateLimitMiddleware } from "../middlewares/rateLimiter";
import {authenticate }from "../middlewares/authMiddleware"; // Adjusted import

const router = express.Router();

// Fetch all users
router.get("/users", authenticate, rateLimitMiddleware, getUsers);

// Fetch a user by ID
router.get("/users:id", authenticate, rateLimitMiddleware, getUserById);

// Create a new user
router.post("/users", authenticate, rateLimitMiddleware, createUser);

// Update user details
router.put("/users:id", authenticate, rateLimitMiddleware, updateUser);

// Delete a user
router.delete("/users:id", authenticate, rateLimitMiddleware, deleteUser);

export default router;
