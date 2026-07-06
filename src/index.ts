import express from "express";
import energyRouter from "./routes/energy";
import noteRouter from "./routes/note";
import logRouter from "./routes/log";
import documentRouter from "./routes/document";

const app = express();

app.use(express.json());

// 注册 note 模块
app.use("/note", noteRouter);

// 注册 energy 模块
app.use("/energy", energyRouter);

// 注册 log 模块
app.use("/log", logRouter);

// 注册 document 模块
app.use("/document", documentRouter);

app.get("/", (req, res) => {
  res.send("ToolBox API v0.1 ⚡");
});

app.listen(3000, () => {
  console.log("ToolBox running on http://localhost:3000");
});