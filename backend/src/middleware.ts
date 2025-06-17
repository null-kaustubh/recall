import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const decodedData = jwt.verify(header as string, JWT_SECRET!);
  if (decodedData) {
    //@ts-ignore
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "login to create recalls",
    });
  }
}

export default authMiddleware;
