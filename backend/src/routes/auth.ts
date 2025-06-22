import { Router, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
const authRouter = Router();

authRouter.post("/signup", async function (req: Request, res: Response) {
  const requiredBody = z
    .object({
      username: z.string().min(3).max(10),
      password: z
        .string()
        .min(8)
        .max(20)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#]).*$/),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(411).json({
      error: parsedData.error,
    });
    console.log(parsedData.error);
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  let err = false;
  try {
    const hashedPassword = await bcrypt.hash(password, 7);

    await UserModel.create({
      username: username,
      password: hashedPassword,
    });
  } catch (e) {
    err = true;
    res.status(403).json({
      message: "User already exists. Please signin",
    });
  }

  if (!err) {
    res.status(200).json({
      message: "Signed up successfully, please signin",
    });
  }
});

authRouter.post("/signin", async function (req: Request, res: Response) {
  const requiredBody = z.object({
    username: z.string().min(3).max(10),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#]).*$/),
  });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(411).json({
      error: parsedData.error,
    });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  const user = await UserModel.findOne({
    username: username,
  });

  if (user?.password) {
    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET!
      );
      res.status(200).json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

export default authRouter;
