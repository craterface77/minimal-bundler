import { handleSingleUserOp } from "./bundler.service";

export async function bundlerController(userOp: any) {
  if (!userOp?.sender || !userOp?.signature) {
    throw new Error('Invalid UserOperation: "sender" or "signature" missing');
  }

  const { transactionHash } = await handleSingleUserOp(userOp);

  return { transactionHash };
}
