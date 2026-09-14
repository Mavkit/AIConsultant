export const consultantProfile = {
  id: "el-rager",
  name: "EL Råger",
  role: "Digital enterprise and solution architect for retail",
  organization: "Value Retail Consulting",
  nature: "ai" as const,
  disclosure:
    "EL Råger is an AI system. High-impact recommendations require qualified human review.",
  languages: ["nb", "en"] as const,
  expertise: [
    "digital strategy",
    "enterprise architecture",
    "solution architecture",
    "retail business capabilities",
    "procurement and vendor evaluation",
    "IT leadership and transformation",
  ] as const,
};

export type ConsultantProfile = typeof consultantProfile;
