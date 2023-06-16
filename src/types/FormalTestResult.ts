import { Coverage } from "./Coverage";
import { Fulfillment } from "./Fulfillment";

export interface FormalTestResult {
  executionStatus: string;
  formalRequirementName: string;
  depthOfViolation?: number;
  depthOfFulfillment?: number;
  fulfillment: Fulfillment;
  coverage: Coverage;
}
