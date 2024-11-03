import express from "express";
import { getFeedPosts, getUserPosts, likePost, addComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ - Fetch all feed posts */
router.get("/", verifyToken, getFeedPosts);

/* READ - Fetch posts by a specific user */
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE - Like/Unlike a post */
router.patch("/:id/like", verifyToken, likePost);

/* CREATE - Add a comment to a post */
router.post("/:postId/comments", verifyToken, addComment);

export default router;
