import express from "express";
import energyRouter from "./routes/energy";

const app = express();

app.use(express.json());

// 注册 energy 模块
app.use("/energy", energyRouter);

app.get("/", (req, res) => {
  res.send("ToolBox API v0.1 ⚡");
});

app.listen(3000, () => {
  console.log("ToolBox running on http://localhost:3000");
});