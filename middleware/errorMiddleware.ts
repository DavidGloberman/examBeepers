import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).send({ message: message });
  };