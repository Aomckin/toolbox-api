import express from "express";
import { readEnergy, writeEnergy } from "../core/storage";
import { writeLog } from "../core/logger";

const router = express.Router();

// 获取能量
router.get("/", (req, res) => {
  const energy = readEnergy();
  res.json({ energy });
});

// 增加能量
router.post("/add", (req, res) => {
  const { amount } = req.body;

  const current = readEnergy();
  const updated = current + (amount ?? 0);

  writeEnergy(updated);

  writeLog({
  type: "energy_add",
  detail: `added ${amount} energy`
  });

  res.json({
    message: "energy updated",
    energy: updated
  });
});


export default router;