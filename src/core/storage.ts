import fs from "fs";
import path from "path";

// ⭐ 永远指向“项目根目录”
const dataPath = path.join(process.cwd(), "src/data/energy.json");

export function readEnergy(): number {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data).energy;
  } catch (e) {
    return 50;
  }
}

export function writeEnergy(value: number) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify({ energy: value }, null, 2)
  );
}