/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { MiddleWare } from "../middleware/auth";
import { body, validationResult } from "express-validator";

export const postRouter = express.Router();

postRouter.get("/", MiddleWare, async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      take: 5,
      select: {
        author: {
          select: {
            name: true,
            username: true,
            profilePicture: true,
          },
        },
        content: true,
        title: true,
        comments: {
          select: {
            content: true,
            author: {
              select: {
                name: true,
                username: true,
                profilePicture: true,
              },
            },
          },
        },
      },
    });
    const count = await prisma.post.count({});
    return res.status(200).json({
      success: true,
      data: { posts, count },
      msg: "Fetched Successfully",
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ success: false, data: null, msg: "Server error" });
  }
});

postRouter.post(
  "/",
  MiddleWare,
  [
    body("content").not().isEmpty(),
    body("title").not().isEmpty(),
    body("userId").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, data: null, msg: errors.array()[0].msg });
    }

    const { content, title, userId } = req.body;
    try {
      const post = await prisma.post.create({
        data: {
          content,
          title,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });

      console.log(post)

      if (!post)
        return res
          .status(400)
          .json({ success: false, data: null, msg: "Server error" });

      return res
        .status(200)
        .json({ success: true, data: post, msg: "Successfully Created" });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ success: false, data: null, msg: "Server error" });
    }
  }
);
