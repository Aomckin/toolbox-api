import fs from "fs";
import path from "path";

const logPath = path.join(process.cwd(), "src/data/logs.json");

interface LogEntry {
  type: string;
  detail: string;
}

export function writeLog(entry: LogEntry) {
  let logs = [];

  try {
    logs = JSON.parse(fs.readFileSync(logPath, "utf-8"));
  } catch {
    logs = [];
  }

  logs.push({
    ...entry,
    time: new Date().toISOString()
  });

  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
}

export function getLogs() {
  try {
    return JSON.parse(fs.readFileSync(logPath, "utf-8"));
  } catch {
    return [];
  }
}