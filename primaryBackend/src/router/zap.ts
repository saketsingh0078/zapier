import { Router } from "express";
import { zapCreateschema } from "../types";
import { prismClient } from "../db";

const router = Router();

router.post("/", async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const body = req.body;
  const parseData = zapCreateschema.safeParse(body);

  if (!parseData.success) {
    return res.status(411).json({
      msg: " Incorrect input",
    });
  }
  const zapId = await prismClient.$transaction(async (tx) => {
    const zap = await prismClient.zap.create({
      data: {
        userId: id,
        triggerId: "",
        action: {
          create: parseData.data.action.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parseData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await prismClient.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id;
  });

  res.status(200).json({
    zapId,
  });
});

router.get("/", async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const zaps = await prismClient.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      action: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  return res.json({
    zaps,
  });
});

router.get("/:zapId", async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const zapId = req.params.zapId;

  const zap = await prismClient.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      action: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  res.status(200).json({
    zap,
  });
});

export const zapRouter = router;
