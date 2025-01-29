import express from "express";
import { bundlerRouter } from "./modules/bundler/bundler.routes";

async function main() {
  const app = express();
  app.use(express.json());

  app.use("/", bundlerRouter);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Bundler listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
