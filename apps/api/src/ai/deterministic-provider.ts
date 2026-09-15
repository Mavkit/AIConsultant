import type { ConsultationPrompt, ModelProvider, ModelResult } from "./model-provider.js";

export class DeterministicModelProvider implements ModelProvider {
  async generateConsultation(prompt: ConsultationPrompt): Promise<ModelResult> {
    return {
      provider: "deterministic",
      model: "el-rager-fixture-v1",
      answer: {
        summary: `EL Råger har startet ${prompt.workflowName.toLowerCase()} basert på den beskrevne situasjonen.`,
        analysis: [
          `Avklar ønsket forretningsresultat før løsningsvalg låses.`,
          `Kartlegg berørte retail-kapabiliteter, informasjonsflyt og integrasjoner.`,
          `Skill dokumenterte fakta fra hypoteser som må valideres.`,
        ],
        assumptions: [
          "Beskrivelsen er et første utgangspunkt og er ikke kontrollert mot kundens dokumentasjon.",
          "Sikkerhet, personvern, drift og endringsevne inngår i den videre vurderingen.",
        ],
        risks: [
          "En anbefaling uten målbare beslutningskriterier kan favorisere teknologi fremfor forretningsverdi.",
          "Ukjente avhengigheter til data og eksisterende systemer kan endre anbefalingen.",
        ],
        nextSteps: [
          "Bekreft beslutningen som skal tas og hvem som eier den.",
          "Samle systemoversikt, sentrale begrensninger og relevante kvalitetskrav.",
          "Avtal en evidensgjennomgang før anbefalingen brukes som beslutningsgrunnlag.",
        ],
        humanReview: `Menneskelig kvalitetssikring er ${prompt.humanReview} for dette rådgivningsløpet.`,
      },
    };
  }
}
