import express from "express";
import { createComment, getPostComment } from "../controllers/comment.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:postId", getPostComment);

export default router;