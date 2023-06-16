import Prando from "prando";
import { store } from "swagger-express-middleware-wrapper-lib";
import { createUUID } from "./helpers/createUUID";
import { calculateResult } from "./calculateResult";
import { TestCase } from "./types/TestCase";
import { InternalError } from "./helpers/InternalError";

export async function startNewExecution(
  randomGenerator: Prando,
  run: {
    runId: string;
    suiteId: string;
    testEnvironmentId: string;
    sutId: string;
  }
) {
  const resources = await store.loadCollection("/testcases");
  if (resources instanceof Error) {
    throw new InternalError("failed to load testcases");
  }
  const testCases = resources
    .map((elem) => (elem as any).data)
    .filter((e) => e.suiteId === run.suiteId) as TestCase[];

  testCases.forEach(async (testCase) => {
    const testCaseResultId = createUUID();
    store.save(`/runs/${run.runId}/testcases`, testCaseResultId, {
      testCaseResultId,
    });

    const result = calculateResult(
      testCaseResultId,
      testCase.scenarioId,
      randomGenerator,
      run
    );
    store.save(`/runs/${run.runId}/results`, result.id, result);
  });
}
