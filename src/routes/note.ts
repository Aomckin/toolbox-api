import express from "express";
import fs from "fs";
import path from "path";
import { writeLog } from "../core/logger";

const router = express.Router();

const dataPath = path.join(process.cwd(), "src/data/notes.json");

// 读取
function readNotes() {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

// 写入
function writeNotes(notes: any) {
  fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));
}

// 获取所有笔记
router.get("/", (req, res) => {
  res.json(readNotes());
});

// 添加笔记
router.post("/add", (req, res) => {
  const { content } = req.body;

  if (typeof content !== "string" || content.trim() === "") {
    res.status(400).json({
      message: "content must be a non-empty string"
    });
    return;
  }

  const notes = readNotes();

  const newNote = {
    id: Date.now(),
    content,
    time: new Date().toISOString()
  };

  notes.push(newNote);
  writeNotes(notes);

  writeLog({
  type: "note_add",
  detail: content
  });

  res.json({
    message: "note added",
    note: newNote
  });
});

export default router;