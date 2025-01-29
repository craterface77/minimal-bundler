import { http, type Hex, createWalletClient, parseEther } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import chalk from "chalk";
import {
  type SupportedSigner,
  createSmartAccountClient,
} from "@biconomy/account";
import config from "./helpers/config.json";

export const nativeTransfer = async (to: string, amount: number) => {
  // ----- 1. Generate EOA from private key
  const account = privateKeyToAccount(config.privateKey as Hex);
  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });
  const eoa = client.account.address;
  console.log(chalk.blue(`EOA address: ${eoa}`));

  // ------ 2. Create biconomy smart account instance
  const smartAccount = await createSmartAccountClient({
    signer: client as SupportedSigner,
    bundlerUrl: config.bundlerUrl,
  });
  const scwAddress = await smartAccount.getAccountAddress();
  console.log("SCW Address", scwAddress);

  // ------ 3. Generate transaction data
  const txData = {
    to,
    value: parseEther(amount.toString()),
  };

  // ------ 4. Generate userOp (buildUserOp).
  console.log(chalk.yellow("Building UserOp..."));
  const userOp = await smartAccount.buildUserOp([txData]);
  console.log(chalk.green("Generated UserOp:"), userOp);
  const userOperation = await smartAccount.signUserOp(userOp);
  console.log(chalk.green("Signed UserOp:"), userOperation);

  // // ------ 5. Send userOp in local Bundler
  const localBundlerUrl = "http://localhost:3000/";
  const entryPoint = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789";

  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_sendUserOperation",
    params: [userOp, entryPoint],
  };

  console.log(chalk.magenta("Sending UserOp to local bundler..."));

  const response = await fetch(localBundlerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log(chalk.cyan("Local Bundler response:"), result);
};

nativeTransfer(config.toAddress, 0.001);
