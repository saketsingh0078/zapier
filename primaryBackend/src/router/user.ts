import { Router } from "express";
import { signinSchema, signupSchema } from "../types";
import jwt from "jsonwebtoken";
import { prismClient } from "../db";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parseData = signupSchema.safeParse(body);

  if (!parseData.success) {
    return res.status(411).json({
      msg: "Incorrect Input",
    });
  }

  const userExists = await prismClient.user.findFirst({
    where: { email: body.email },
  });

  if (userExists) {
    return res.status(403).json({
      msg: "User already exists",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prismClient.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      token,
      msg: "User successfully created",
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error while creating User",
    });
  }
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parseData = signinSchema.safeParse(body);

  if (!parseData.success) {
    return res.status(403).json({
      msg: "Incorrect Input",
    });
  }

  const user = await prismClient.user.findFirst({
    where: { email: body.email },
  });

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  // Compare the hashed password
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      msg: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({
    token,
    msg: "Sign-in successful",
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const user = await prismClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRouter = router;
