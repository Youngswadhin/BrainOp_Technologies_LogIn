import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";

import { userRouter } from "./route/user";
import { postRouter } from "./route/posts";

dotenv.config();

const app = express();

const corsOpt: CorsOptions = {
  origin: [process.env.FRONTEND_URL??"**"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOpt));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
