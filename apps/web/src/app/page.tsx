"use client";

import { FormEvent, useEffect, useState } from "react";

type Consultant = {
  name: string;
  role: string;
  disclosure: string;
  expertise: string[];
};

type Workflow = {
  id: string;
  name: string;
  purpose: string;
  humanReview: "optional" | "recommended" | "required";
};

const fallbackWorkflows: Workflow[] = [
  {
    id: "architecture-assessment",
    name: "Arkitekturvurdering",
    purpose: "Kartlegg nåsituasjon, risiko og prioriterte forbedringer.",
    humanReview: "recommended",
  },
  {
    id: "solution-options",
    name: "Løsningsalternativer",
    purpose: "Sammenlign alternativer med tydelige premisser og konsekvenser.",
    humanReview: "required",
  },
  {
    id: "vendor-evaluation",
    name: "Leverandørvurdering",
    purpose: "Strukturer krav og vurder leverandører på et etterprøvbart grunnlag.",
    humanReview: "required",
  },
];

const expertiseLabels: Record<string, string> = {
  "digital strategy": "Digital strategi",
  "enterprise architecture": "Virksomhetsarkitektur",
  "solution architecture": "Løsningsarkitektur",
  "retail business capabilities": "Forretningsevner i retail",
  "procurement and vendor evaluation": "Anskaffelser og leverandører",
  "IT leadership and transformation": "IT-ledelse og transformasjon",
};

const reviewLabels: Record<Workflow["humanReview"], string> = {
  optional: "valgfri",
  recommended: "anbefalt",
  required: "påkrevd",
};

export default function Home() {
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>(fallbackWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState(fallbackWorkflows[0].id);
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch("/api/v1/consultant", { signal: controller.signal }).then((response) => {
        if (!response.ok) throw new Error("Consultant profile unavailable");
        return response.json() as Promise<Consultant>;
      }),
      fetch("/api/v1/workflows", { signal: controller.signal }).then((response) => {
        if (!response.ok) throw new Error("Workflow catalog unavailable");
        return response.json() as Promise<{ items: Workflow[] }>;
      }),
    ])
      .then(([profile, catalog]) => {
        setConsultant(profile);
        setWorkflows(catalog.items);
        if (catalog.items[0]) setSelectedWorkflow(catalog.items[0].id);
      })
      .catch(() => {
        // The entry experience remains useful while readiness is visible to operators.
      });

    return () => controller.abort();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const workflow = workflows.find((item) => item.id === selectedWorkflow);
    setConfirmation(
      `${workflow?.name ?? "Valgt rådgivningsløp"} er klargjort. Samtaler og innlogging kobles til i neste pilotinkrement.`,
    );
  }

  return (
    <main>
      <nav className="topbar" aria-label="Hovednavigasjon">
        <a className="brand" href="#top" aria-label="EL Råger, gå til toppen">
          <span className="brand-mark" aria-hidden="true">ER</span>
          <span>EL Råger</span>
        </a>
        <div className="nav-links">
          <a href="#kompetanse">Kompetanse</a>
          <a href="#start">Start oppdrag</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Value Retail Consulting · Digital rådgivning</p>
          <h1>Fra retail-idé til <em>gjennomførbar arkitektur.</em></h1>
          <p className="lead">
            Møt EL Råger – en digital virksomhets- og løsningsarkitekt som gjør komplekse
            veivalg tydelige, dokumenterte og enklere å handle på.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#start">Start en vurdering</a>
            <a className="button secondary" href="#kompetanse">Se kompetansen</a>
          </div>
          <div className="trust-note" role="note">
            <span aria-hidden="true">AI</span>
            <p>
              <strong>Åpenhet først.</strong> EL Råger er en AI-rådgiver, ikke et menneske.
              Konsekvensrike anbefalinger skal kvalitetssikres av kvalifiserte fagpersoner.
            </p>
          </div>
        </div>

        <div className="portrait-card" aria-label="Digital profil for EL Råger">
          <div className="portrait-grid" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <div className="avatar">
              <span className="avatar-eye left" />
              <span className="avatar-eye right" />
              <span className="avatar-line" />
            </div>
          </div>
          <div className="portrait-caption">
            <div>
              <span className="availability"><i /> Pilotmodus</span>
              <h2>{consultant?.name ?? "EL Råger"}</h2>
              <p>Digital virksomhets- og løsningsarkitekt for retail</p>
            </div>
            <span className="monogram" aria-hidden="true">01</span>
          </div>
        </div>
      </section>

      <section className="expertise" id="kompetanse">
        <div className="section-heading">
          <p className="eyebrow">Helhetlig retailkompetanse</p>
          <h2>Råd som kobler forretning, mennesker og teknologi.</h2>
        </div>
        <div className="expertise-grid">
          {(consultant?.expertise ?? [
            "Digital strategi",
            "Virksomhetsarkitektur",
            "Løsningsarkitektur",
            "Anskaffelser og leverandører",
            "Program- og IT-ledelse",
            "Forretningsutvikling",
          ]).slice(0, 6).map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <h3>{expertiseLabels[item] ?? item}</h3>
              <p>Strukturert analyse med synlige antakelser, evidens, risiko og neste steg.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="intake" id="start">
        <div className="intake-copy">
          <p className="eyebrow">Start riktig</p>
          <h2>Hva trenger virksomheten din å avklare?</h2>
          <p>
            Velg et rådgivningsløp. EL Råger bruker en fast, sporbar arbeidsform og viser når
            menneskelig kvalitetssikring er anbefalt eller påkrevd.
          </p>
        </div>
        <form className="intake-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Velg rådgivningsløp</legend>
            <div className="workflow-options">
              {workflows.slice(0, 4).map((workflow) => (
                <label key={workflow.id} className="workflow-option">
                  <input
                    type="radio"
                    name="workflow"
                    value={workflow.id}
                    checked={selectedWorkflow === workflow.id}
                    onChange={() => setSelectedWorkflow(workflow.id)}
                  />
                  <span>
                    <strong>{workflow.name}</strong>
                    <small>{workflow.purpose}</small>
                    <b>Menneskelig kontroll: {reviewLabels[workflow.humanReview]}</b>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="context-label" htmlFor="context">
            Kort om situasjonen
            <textarea id="context" name="context" rows={4} placeholder="Eksempel: Vi skal modernisere butikk- og netthandelsplattformen …" />
          </label>
          <label className="consent">
            <input type="checkbox" required />
            <span>Jeg forstår at dette er en AI-tjeneste og vil ikke dele sensitive personopplysninger.</span>
          </label>
          <button className="button primary submit" type="submit">Forbered rådgivningen</button>
          <p className="form-status" aria-live="polite">{confirmation}</p>
        </form>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark" aria-hidden="true">ER</span><span>EL Råger</span></div>
        <p>En digital rådgiver fra Value Retail Consulting.</p>
        <a href="https://valueretail.no/personvern">Personvern</a>
      </footer>
    </main>
  );
}
