import * as dotenv from "dotenv";
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  RPC_URL: process.env.RPC_URL || "https://rpc.ankr.com/eth_sepolia",
  PRIVATE_KEY_1: process.env.PRIVATE_KEY_1 || "",
  PRIVATE_KEY_2: process.env.PRIVATE_KEY_2 || "",
  ENTRY_POINT_ADDRESS: process.env.ENTRY_POINT_ADDRESS || "",
};
