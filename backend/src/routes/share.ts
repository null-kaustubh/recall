import { Router, Request, Response } from "express";
import authMiddleware from "../middleware";
import { ContentModel, LinkModel, UserModel } from "../db";
import random from "../utils";
const shareRouter = Router();

shareRouter.get("/:shareLink", async function (req: Request, res: Response) {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({ hash: hash });
  if (!link) {
    res.status(403).json({
      message: "Invalid link",
    });
    return;
  }

  const content = await ContentModel.find({ userId: link.userId });
  const user = await UserModel.findOne({ _id: link.userId });

  if (!user) {
    res.status(403).json({
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    username: user.username,
    content,
  });
});

shareRouter.post(
  "/share",
  authMiddleware,
  async function (req: Request, res: Response) {
    const share = req.body.share;
    if (share) {
      const link = await LinkModel.findOne({
        //@ts-ignore
        userId: req.userId,
      });
      if (link?.hash) {
        res.status(200).json({
          link: link.hash,
        });
        return;
      }
      //if hash doesn't exist create one
      const hash = random(13);
      await LinkModel.create({
        hash: hash,
        //@ts-ignore
        userId: req.userId,
      });
      res.json({
        message: "Share content enabled",
      });
    } else {
      await LinkModel.deleteOne({
        //@ts-ignore
        userId: req.userId,
      });
      res.json({
        message: "Share content disabled",
      });
    }
  }
);

export default shareRouter;
