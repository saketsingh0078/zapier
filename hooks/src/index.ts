import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.get("/", (req, res) => {
  res.json({
    msg: " Hello ",
  });
});

// some password logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  // store in a new trigger
  await client.$transaction(async (tx) => {
    const run = await client.zapRun.create({
      data: {
        zapId,
        metaData: body,
      },
    });

    await client.zapRunOutBox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({
    msg: "webhook received",
  });

  // push it on to a kafka / redis
});

app.listen("3000", () => {
  console.log("Server connected");
});
