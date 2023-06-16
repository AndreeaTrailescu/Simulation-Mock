import Prando from "prando";
import { State } from "./types/State";
import { createUUID } from "./helpers/createUUID";

export function calculateResult(
  testCaseResultId: string,
  scenarioId: string,
  generator: Prando,
  run: { runId: string; testEnvironmentId: string; sutId: string }
) {
  const resultId = createUUID();

  return {
    id: resultId,
    name: "result name",
    runId: run.runId,
    finished: new Date().toISOString(),
    started: new Date().toISOString(),
    systemUnderTestId: run.sutId,
    testEnvironmentId: run.testEnvironmentId,
    testCaseId: testCaseResultId,
    state: getRandomState(generator),
    resultDataFile: {
      uri: new URL(`https://${generator.nextInt().toString()}`),
    },
    description: "new result created",
    scenarioId,
  };
}

function getRandomState(generator: Prando) {
  return generator.nextBoolean() === true ? State.PASSED : State.FAILED;
}
