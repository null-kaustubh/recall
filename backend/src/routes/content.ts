import { Router, Request, Response } from "express";
import authMiddleware from "../middleware";
import { ContentModel } from "../db";
const contentRouter = Router();

contentRouter.get(
  "/content",
  authMiddleware,
  async function (req: Request, res: Response) {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
      userId: userId,
    }).populate("userId", "username");

    if (content.length) {
      res.status(200).json({
        content,
      });
    } else {
      res.json({
        noContent: "Add recalls",
      });
    }
  }
);

contentRouter.post(
  "/content",
  authMiddleware,
  async function (req: Request, res: Response) {
    const title = req.body.title;
    const link = req.body.link;
    await ContentModel.create({
      title: title,
      link: link,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });
    res.status(200).json({
      message: "Recall added",
    });
  }
);

contentRouter.delete(
  "/content",
  authMiddleware,
  async function (req: Request, res: Response) {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;

    let err = false;
    try {
      await ContentModel.deleteMany({
        id: contentId,
        userId: userId,
      });
    } catch (e) {
      err = true;
      res.status(403).json({
        message: "Error in deleting recall",
      });
    }
    if (!err) {
      res.status(200).json({
        message: "Recall deleted",
      });
    }
  }
);

export default contentRouter;
