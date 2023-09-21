import { Response } from "express";

export const errorHandler = (error: unknown, res: Response) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  return res.status(400).send(message);
};
