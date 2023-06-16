import path from "path";
import express, { Express } from "express";
import {
  Method,
  createMiddlewareFromApiSpec,
  CustomImplementation,
} from "swagger-express-middleware-wrapper-lib";
import { createHandlers } from "./createHandlers";
import { executeFormalTest } from "./executeFormalTest";
import { createPrefilledDataStore } from "./helpers/createPrefillesDataStore";

export const API_FILE = path.resolve("./definitions/api.yaml");

async function init() {
  const ruleSet = { numberOfRules: 1 };

  const app: Express = express();

  executeFormalTest(app, ruleSet);
  const handlers = createHandlers();

  const customImplementations: CustomImplementation[] = [
    { method: "POST" as Method, path: "/runs", getHandler: handlers.createRun },
    {
      method: "GET" as Method,
      path: "/runs/:runId/testcases",
      getHandler: handlers.listAllTestCaseResults,
    },
    {
      method: "GET" as Method,
      path: "/runs/:runId/results",
      getHandler: handlers.listAllResults,
    },
  ];

  await createMiddlewareFromApiSpec(
    app,
    { source: API_FILE, specVersion: "openapi_3" },
    createPrefilledDataStore,
    customImplementations
  );

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

init();
