export type WorkflowId =
  | "architecture-discovery"
  | "current-state-assessment"
  | "target-architecture"
  | "solution-options"
  | "architecture-review"
  | "vendor-evaluation-preparation";

export interface ConsultingWorkflow {
  id: WorkflowId;
  name: string;
  purpose: string;
  minimumInputs: readonly string[];
  outputs: readonly string[];
  exitCriterion: string;
  humanReview: "optional" | "recommended" | "required";
}

export const consultingWorkflows: readonly ConsultingWorkflow[] = [
  {
    id: "architecture-discovery",
    name: "Architecture discovery and problem framing",
    purpose: "Turn a broad challenge into a confirmed decision and analysis scope.",
    minimumInputs: ["desired outcome", "stakeholders", "current pain", "time horizon"],
    outputs: ["problem statement", "context map", "evidence ledger", "discovery questions"],
    exitCriterion: "The customer confirms the problem statement and material assumptions.",
    humanReview: "optional",
  },
  {
    id: "current-state-assessment",
    name: "Current-state architecture assessment",
    purpose: "Create an evidence-based view of capabilities, systems, data, and risk.",
    minimumInputs: ["scope", "system inventory", "integration overview", "known issues"],
    outputs: ["current-state summary", "capability map", "risk register", "evidence gaps"],
    exitCriterion: "Verified findings and inferences are distinct and reviewed by the customer.",
    humanReview: "recommended",
  },
  {
    id: "target-architecture",
    name: "Target architecture and roadmap",
    purpose: "Define a target direction and dependency-aware transition increments.",
    minimumInputs: ["business outcomes", "principles", "constraints", "current-state findings"],
    outputs: ["target architecture", "transition states", "roadmap", "decision log"],
    exitCriterion: "Accountable stakeholders accept the direction or own open decisions.",
    humanReview: "required",
  },
  {
    id: "solution-options",
    name: "Solution options and trade-off analysis",
    purpose: "Compare credible approaches against explicit decision criteria.",
    minimumInputs: ["decision statement", "constraints", "quality attributes", "candidate options"],
    outputs: ["options paper", "decision matrix", "ADR draft", "validation actions"],
    exitCriterion: "The recommendation is traceable; the customer owns the decision.",
    humanReview: "recommended",
  },
  {
    id: "architecture-review",
    name: "Architecture review and risk assessment",
    purpose: "Challenge a proposal against business, technical, security, and operating needs.",
    minimumInputs: ["proposal", "scope", "architecture views", "quality attributes"],
    outputs: ["review summary", "findings register", "remediation plan"],
    exitCriterion: "Every material finding has an owner, disposition, and validation method.",
    humanReview: "required",
  },
  {
    id: "vendor-evaluation-preparation",
    name: "Vendor and RFP evaluation preparation",
    purpose: "Translate business outcomes into defensible evaluation criteria and evidence requests.",
    minimumInputs: ["business outcomes", "scope", "constraints", "procurement stage"],
    outputs: ["requirements", "evaluation matrix", "vendor questions", "demo scenarios"],
    exitCriterion: "Evaluation criteria are approved before vendor scoring.",
    humanReview: "required",
  },
] as const;

export function getWorkflow(id: string): ConsultingWorkflow | undefined {
  return consultingWorkflows.find((workflow) => workflow.id === id);
}
