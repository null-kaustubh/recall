import { Router, Request, Response } from "express";
const contentRouter = Router();

contentRouter.get("/content", async function (req: Request, res: Response) {});

contentRouter.post("/content", async function (req: Request, res: Response) {});

contentRouter.delete(
  "/content",
  async function (req: Request, res: Response) {}
);

export default contentRouter;
