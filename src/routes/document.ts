import express from "express";
import { execFile } from "child_process";
import path from "path";
import { writeLog } from "../core/logger";

const router = express.Router();

interface AnalyzeRequestBody {
  content?: string;
}

router.post("/analyze", (req, res) => {
  const { content } = req.body as AnalyzeRequestBody;

  if (typeof content !== "string" || content.trim() === "") {
    res.status(400).json({
      message: "content must be a non-empty string"
    });
    return;
  }

  const scriptPath = path.join(process.cwd(), "scripts/analyze.py");

  const pythonProcess = execFile(
  "python",
  [scriptPath],
  {
    encoding: "utf8",
    env: {
      ...process.env,
      PYTHONIOENCODING: "utf-8"
    }
  },
  (error, stdout, stderr) => {
      if (error) {
        res.status(500).json({
          message: "failed to run python script",
          error: error.message,
          stderr
        });
        return;
      }

      try {
        const result = JSON.parse(stdout);

        writeLog({
          type: "document_analyze",
          detail: `analyzed text with ${content.length} characters`
        });

        res.json({
          message: "document analyzed",
          result
        });
      } catch {
        res.status(500).json({
          message: "failed to parse python result",
          rawOutput: stdout
        });
      }
    }
  );

  pythonProcess.stdin?.write(JSON.stringify({ content }), "utf8");
  pythonProcess.stdin?.end();
});

export default router;