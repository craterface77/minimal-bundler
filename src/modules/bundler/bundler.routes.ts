import { Router } from "express";
import type { Request, Response } from "express";

export const bundlerRouter = Router();

bundlerRouter.post("/", async (req: Request, res: Response) => {
  res.send("Hello from bundler");
});
