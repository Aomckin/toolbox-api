import express from "express";
import { getLogs } from "../core/logger";

const router = express.Router();

// 查看所有日志
router.get("/", (req, res) => {
  res.json(getLogs());
});

export default router;