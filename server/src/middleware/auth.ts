/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export const MiddleWare = (req: any, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  const token = cookies.token;

  if (!token) {
    return res.json({
      success: false,
      data: null,
      msg: "No token, authorization denied",
    });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded as JwtPayload; // Ensure the type is correctly inferred
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      data: null,
      msg: "Token is not valid",
    });
  }
};
