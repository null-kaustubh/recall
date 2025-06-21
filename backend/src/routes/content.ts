import { Router, Request, Response } from "express";
import authMiddleware from "../middleware";
import { ContentModel } from "../db";
import { Types } from "mongoose";
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
    const note = req.body.note;
    const tags = req.body.tags;
    await ContentModel.create({
      title: title,
      link: link,
      note: note,
      //@ts-ignore
      userId: req.userId,
      tags: tags,
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

    try {
      const result = await ContentModel.deleteMany({
        _id: contentId,
        userId: userId,
      });

      if (result.deletedCount === 0) {
        res.status(404).json({
          message:
            "Content not found or you don't have permission to delete it",
        });
      }
      res.status(200).json({
        message: "Recall deleted",
      });
    } catch (e) {
      res.status(403).json({
        message: "Error in deleting recall",
      });
    }
  }
);

export default contentRouter;
