import { z } from "zod";

export const userOperationSchema = z.object({
  jsonrpc: z.string().default("2.0"),
  id: z.number(),
  method: z.literal("eth_sendUserOperation"),
  params: z.tuple([
    z.object({
      sender: z.string().length(42, "Invalid sender address"),
      nonce: z.string().regex(/^0x[a-fA-F0-9]+$/, "Invalid nonce"),
      initCode: z.string(),
      callData: z.string(),
      signature: z.string(),
      paymasterAndData: z.string(),
      maxFeePerGas: z
        .string()
        .regex(/^0x[a-fA-F0-9]+$/, "Invalid maxFeePerGas"),
      maxPriorityFeePerGas: z
        .string()
        .regex(/^0x[a-fA-F0-9]+$/, "Invalid maxPriorityFeePerGas"),
      verificationGasLimit: z
        .string()
        .regex(/^0x[a-fA-F0-9]+$/, "Invalid verificationGasLimit"),
      callGasLimit: z
        .string()
        .regex(/^0x[a-fA-F0-9]+$/, "Invalid callGasLimit"),
      preVerificationGas: z
        .string()
        .regex(/^0x[a-fA-F0-9]+$/, "Invalid preVerificationGas"),
    }),
    z.string().length(42, "Invalid EntryPoint address"),
  ]),
});

export type UserOperation = z.infer<typeof userOperationSchema>;
