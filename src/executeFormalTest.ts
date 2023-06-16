import { Express } from "express";
import Prando from "prando";
import { Coverage } from "./types/Coverage";
import { Fulfillment } from "./types/Fulfillment";
import { FormalTestResult } from "./types/FormalTestResult";

export function executeFormalTest(
  app: Express,
  ruleSet: { numberOfRules: number }
) {
  app.post("/execute", async (_req, res) => {
    const generator = new Prando(Math.random());
    const numberOfRules = ruleSet.numberOfRules;

    const { formalRequirementName, coverage, fulfillment } =
      getRandomProperties(generator);
    const results: FormalTestResult[] = [];
    for (let i = 0; i < numberOfRules; i++) {
      const result: FormalTestResult = {
        coverage,
        executionStatus: "done",
        formalRequirementName,
        fulfillment,
      };
      results.push(result);
    }
    res.json({ results: results });
  });
}

export function getRandomProperties(generator: Prando) {
  return {
    formalRequirementName: `${generator.nextString()}${generator.nextInt()}`,
    coverage: generator.nextArrayItem(Object.values(Coverage)),
    fulfillment: generator.nextArrayItem(Object.values(Fulfillment)),
  };
}
