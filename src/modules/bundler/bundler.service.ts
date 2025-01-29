import {
  createWalletClient,
  createPublicClient,
  encodeFunctionData,
  http,
} from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import ENTRY_POINT_ABI from "../../abis/EntryPointAbi.json";
import { env } from "../../config/env";

const ENTRY_POINT_ADDRESS = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789";

const walletClient1 = createWalletClient({
  chain: sepolia,
  transport: http(env.RPC_URL),
  account: privateKeyToAccount(`0x${env.PRIVATE_KEY_1}`),
});

const walletClient2 = createWalletClient({
  chain: sepolia,
  transport: http(env.RPC_URL),
  account: privateKeyToAccount(`0x${env.PRIVATE_KEY_2}`),
});

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(env.RPC_URL),
});

let pick = 0;

function pickWalletClient() {
  pick = 1 - pick; // flip 0 -> 1, 1 -> 0
  return pick === 0 ? walletClient1 : walletClient2;
}

export async function handleSingleUserOp(userOp: any) {
  try {
    const walletClient = pickWalletClient();
    const [beneficiary] = await walletClient.getAddresses();

    const data = encodeFunctionData({
      abi: ENTRY_POINT_ABI,
      functionName: "handleOps",
      args: [[userOp], beneficiary],
    });

    console.log("🔹 Encoded handleOps calldata");

    const txHash = await walletClient.sendTransaction({
      to: ENTRY_POINT_ADDRESS,
      data,
    });

    console.log(`Transaction sent: ${txHash}`);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    const safeReceipt = JSON.stringify(
      receipt,
      (key, value) => (typeof value === "bigint" ? value.toString() : value),
      2
    );

    console.log("Transaction Receipt:", safeReceipt);

    return {
      transactionHash: txHash,
    };
  } catch (err) {
    console.error("Error in handleSingleUserOp:", err);
    if (err instanceof Error) {
      console.error("Revert reason:", err.message);
    }
    throw err;
  }
}
