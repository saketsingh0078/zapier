import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const client = new PrismaClient();

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;
  console.log(req.body);

  //store in the db a new trigger
  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId,
        metaData: body,
      },
    });

    await tx.zapOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({
    msg: "webhook recieved",
  });
});

app.listen(3000, () => {
  console.log("connected to hook server at 3000");
});
