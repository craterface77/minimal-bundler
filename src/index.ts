import express from "express";
import { env } from "./config/env";

async function main() {
  const app = express();
  app.use(express.json());

  const port = Number(env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Bundler listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
