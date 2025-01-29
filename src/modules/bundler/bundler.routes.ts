import { Router } from "express";
import { bundlerController } from "./bundler.controller";
import { userOperationSchema } from "./bundler.schemas";

export const bundlerRouter = Router();

bundlerRouter.post("/", async (req: any, res: any) => {
  try {
    const parsedBody = userOperationSchema.parse(req.body);
    const { jsonrpc, method, params, id } = parsedBody;

    if (method !== "eth_sendUserOperation") {
      return res.status(400).json({
        jsonrpc,
        id,
        error: { code: -32601, message: "Method not found" },
      });
    }

    const userOp = params[0];
    const result = await bundlerController(userOp);

    return res.json({ jsonrpc, id, result });
  } catch (error) {
    console.error("Validation Error:", error);

    let details = [];
    if (typeof error === "object" && error !== null && "errors" in error) {
      details = (error as any).errors;
    }

    return res.status(400).json({
      jsonrpc: req.body.jsonrpc || "2.0",
      id: req.body.id || null,
      error: {
        code: -32602, // Invalid params
        message: "Invalid UserOperation structure",
        details,
      },
    });
  }
});
