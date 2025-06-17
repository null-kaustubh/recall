import { Router, Request, Response } from "express";
const shareRouter = Router();

shareRouter.get("/:shareLink", async function (req: Request, res: Response) {});

shareRouter.post("/share", async function (req: Request, res: Response) {});

export default shareRouter;
