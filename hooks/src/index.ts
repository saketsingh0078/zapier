import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.get("/", (req, res) => {});
// some password logic
app.post("/hooks/catch/:userId/:zapId", (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;

  // store in a new trigger
  await client.zapRun.create({
    data: {},
  });

  // push it on to a kafka / redis
});

app.listen("3000", () => {
  console.log("Server connected");
});
