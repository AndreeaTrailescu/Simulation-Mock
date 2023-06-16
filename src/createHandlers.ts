import { DataStore } from "swagger-express-middleware-wrapper-lib";
import Prando from "prando";
import { Request, Response } from "express";
import { startNewExecution } from "./startNewExecution";
import { InternalError } from "./helpers/InternalError";
import { createUUID } from "./helpers/createUUID";

const DEFAULT_RANDOM_SEED = Math.random();

export function createHandlers() {
  return {
    createRun: (store: DataStore) => (req: Request, res: Response) =>
      createRun(store, req, res),
    listAllTestCaseResults:
      (store: DataStore) => (req: Request, res: Response) =>
        listAllTestCaseResults(store, req, res),
    listAllResults: (store: DataStore) => (req: Request, res: Response) =>
      listAllResults(store, req, res),
  };
}

async function createRun(store: DataStore, req: Request, res: Response) {
  const generator = new Prando(DEFAULT_RANDOM_SEED);

  const suiteId = "767";
  const sutId = "sut";
  const testEnvironmentId = "testEnvironment";
  const runId = createUUID();
  const newRun = {
    id: runId,
    suiteId,
    name: "run name",
    state: "processing",
    created: new Date().toISOString(),
    sutId,
    testEnvironmentId,
    testCaseIds: ["testcase1", "testcase2"],
    description: "new run created",
    verdict: "",
    verdictReason: "",
  };

  try {
    store.save("/runs", runId, newRun);
    res.status(201).json(newRun);
    await startNewExecution(generator, {
      runId,
      suiteId,
      testEnvironmentId,
      sutId,
    });
  } catch (error) {
    throw new InternalError("cannot start the run");
  }
}

async function listAllTestCaseResults(
  store: DataStore,
  req: Request,
  res: Response
) {
  const runId = req.params.runId as string;

  const resources = await store.loadCollection(`/runs/${runId}/testcases`);

  if (resources instanceof Error) {
    throw new InternalError("cannot load test case results");
  }

  const testCaseResults = resources.map((elem) => (elem as any).data);
  res.json({ items: testCaseResults });
}

async function listAllResults(store: DataStore, req: Request, res: Response) {
  const runId = req.params.runId as string;

  const resources = await store.loadCollection(`/runs/${runId}/results`);

  if (resources instanceof Error) {
    throw new InternalError("cannot load results");
  }

  const results = resources.map((elem) => (elem as any).data);
  res.json({ items: results });
}
