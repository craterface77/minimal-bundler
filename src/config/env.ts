import * as dotenv from "dotenv";
dotenv.config();

export const env = {
  RPC_URL: process.env.RPC_URL,
  PRIVATE_KEY_1: process.env.PRIVATE_KEY_1 || "",
  PRIVATE_KEY_2: process.env.PRIVATE_KEY_2 || "",
};
