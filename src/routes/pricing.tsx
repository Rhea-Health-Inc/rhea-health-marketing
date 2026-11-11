import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, ChevronDown } from "lucide-react";
import { Nav, Logo } from "@/components/clinik/Nav";
import { Reveal } from "@/components/clinik/Reveal";
import { Eyebrow } from "@/components/clinik/Eyebrow";
import { appLink } from "@/lib/app-url";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing - Rhea Health clinical documentation plans" },
      {
        name: "description",
        content:
          "Simple pricing for every stage of care. Plans for independent physicians, group practices, and health systems, with AI documentation included at every tier.",
      },
      { property: "og:title", content: "Pricing - Rhea Health" },
      {
        property: "og:description",
        content:
          "Professional, Team, and Enterprise plans for AI clinical documentation. Monthly or annual billing with 15% savings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing - Rhea Health" },
      {
        name: "twitter:description",
        content:
          "Plans for physicians, practices, and health systems. Reduce documentation time from day one.",
      },
    ],
  }),
  component: PricingPage,
});

type Billing = "monthly" | "annual";

function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Plans billing={billing} setBilling={setBilling} />
      <Comparison />
      <ROI />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="pt-20 pb-14 sm:pt-28 sm:pb-16">
      <div className="container-clinik max-w-3xl text-center mx-auto">
        <Reveal>
          <div className="flex justify-center">
            <Eyebrow>Pricing</Eyebrow>
          </div>
          <h1 className="h-display text-[44px] sm:text-[64px] leading-[1.05] text-balance">
            Simple pricing for every stage of care.
          </h1>
          <p className="mt-6 text-[17px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Whether you're an independent physician, a growing practice, or a healthcare
            organization, Rhea Health is designed to reduce documentation time and help clinicians
            focus on patient care.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={appLink("/signin")}
              className="inline-flex items-center h-12 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </a>
            <a
              href="#contact"
              className="inline-flex items-center h-12 px-6 rounded-full hairline bg-card text-sm font-medium hover:bg-muted transition-colors"
            >
              Talk to Sales
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- PLANS ---------------- */
const PRO_FEATURES = [
  "Unlimited AI clinical documentation",
  "Unlimited patient recordings",
  "AI-generated SOAP notes",
  "Narrative clinical notes",
  "Referral letters",
  "Discharge summaries",
  "AI Clinical Assistant",
  "Patient history timeline",
  "Secure patient messaging",
  "Documentation search",
  "Auto-save",
  "Export and print",
  "Email support",
];

const TEAM_FEATURES = [
  "Shared patient directory",
  "Team documentation",
  "Practice administration",
  "Role & permission management",
  "Shared scheduling",
  "Team messaging",
  "Practice analytics",
  "Organization dashboard",
  "Staff management",
  "Priority support",
];

const ENT_FEATURES = [
  "Unlimited clinicians",
  "Multi-location deployments",
  "Department management",
  "Enterprise administration",
  "Single Sign-On (SSO)",
  "Audit logs",
  "Advanced permissions",
  "EHR integrations",
  "API access",
  "Compliance support",
  "Dedicated Customer Success Manager",
  "SLA-backed support",
  "Custom AI workflows",
];

function Plans({ billing, setBilling }: { billing: Billing; setBilling: (b: Billing) => void }) {
  return (
    <section className="pb-24">
      <div className="container-clinik">
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 rounded-full hairline bg-card p-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`h-9 px-5 rounded-full text-[13px] font-medium transition-colors ${
                  billing === b
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={billing === b}
              >
                {b === "monthly" ? "Monthly" : "Annual (Save 15%)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <Reveal>
            <PlanCard
              name="Professional"
              tagline="For individual physicians and specialists."
              price={billing === "monthly" ? "$199" : "$169"}
              unit="/month"
              note={billing === "monthly" ? "Billed monthly" : "Billed annually"}
              description="Everything you need to automate documentation and reclaim time with patients."
              featuresLead="Included"
              features={PRO_FEATURES}
              cta="Start Free Trial"
            />
          </Reveal>

          <Reveal delay={80}>
            <PlanCard
              highlighted
              badge="Most Popular"
              name="Team"
              tagline="For clinics, group practices, and urgent care centers."
              pricePrefix="Starting at"
              price={billing === "monthly" ? "$179" : "$152"}
              unit=" per clinician/month"
              note={billing === "monthly" ? "Minimum 5 seats" : "Billed annually · Minimum 5 seats"}
              description="Built for collaborative healthcare teams with centralized management and shared workflows."
              featuresLead="Everything in Professional, plus"
              features={TEAM_FEATURES}
              cta="Start Team Trial"
            />
          </Reveal>

          <Reveal delay={160}>
            <PlanCard
              name="Enterprise"
              tagline="For hospitals and health systems."
              price="Custom Pricing"
              customPrice
              description="Designed for hospitals, health systems, and enterprise healthcare organizations requiring advanced integrations, security, and administrative controls."
              featuresLead="Everything in Team, plus"
              features={ENT_FEATURES}
              cta="Contact Sales"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  name,
  tagline,
  price,
  pricePrefix,
  unit,
  note,
  customPrice,
  description,
  featuresLead,
  features,
  cta,
  highlighted,
  badge,
}: {
  name: string;
  tagline: string;
  price: string;
  pricePrefix?: string;
  unit?: string;
  note?: string;
  customPrice?: boolean;
  description: string;
  featuresLead: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative rounded-[28px] p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "bg-primary/[0.04] border border-primary/30 shadow-[var(--shadow-clinik)] hover:shadow-[var(--shadow-clinik-lg)]"
          : "bg-card hairline hover:shadow-[var(--shadow-clinik)]"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-8 rounded-full bg-primary text-primary-foreground text-[12px] font-medium px-3 py-1">
          {badge}
        </div>
      )}
      <div className="text-[17px] font-medium">{name}</div>
      <p className="mt-1 text-[13px] text-muted-foreground">{tagline}</p>

      <div className="mt-7 min-h-[86px]">
        {pricePrefix && <div className="text-[13px] text-muted-foreground mb-1">{pricePrefix}</div>}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className={`h-display ${customPrice ? "text-[32px]" : "text-[42px]"} leading-none`}>
            {price}
          </span>
          {unit && <span className="text-[14px] text-muted-foreground">{unit}</span>}
        </div>
        {note && <div className="mt-2 text-[13px] text-muted-foreground">{note}</div>}
      </div>

      <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{description}</p>

      <a
        href={cta === "Contact Sales" ? "#contact" : appLink("/signin")}
        className={`mt-7 inline-flex items-center justify-center h-11 rounded-full text-sm font-medium transition-opacity ${
          highlighted || cta === "Contact Sales"
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "hairline bg-card hover:bg-muted"
        }`}
      >
        {cta}
      </a>

      <div className="mt-8 pt-7 border-t border-border/70">
        <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-4">
          {featuresLead}
        </div>
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex gap-3 text-[14px] leading-snug">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- COMPARISON ---------------- */
const COMPARISON: { label: string; pro: boolean; team: boolean; ent: boolean }[] = [
  { label: "AI Documentation", pro: true, team: true, ent: true },
  { label: "Unlimited Recordings", pro: true, team: true, ent: true },
  { label: "SOAP Notes", pro: true, team: true, ent: true },
  { label: "Narrative Notes", pro: true, team: true, ent: true },
  { label: "Referral Letters", pro: true, team: true, ent: true },
  { label: "Discharge Summaries", pro: true, team: true, ent: true },
  { label: "AI Clinical Assistant", pro: true, team: true, ent: true },
  { label: "Patient Messaging", pro: true, team: true, ent: true },
  { label: "Patient Timeline", pro: true, team: true, ent: true },
  { label: "Search", pro: true, team: true, ent: true },
  { label: "Team Management", pro: false, team: true, ent: true },
  { label: "Shared Patients", pro: false, team: true, ent: true },
  { label: "Practice Analytics", pro: false, team: true, ent: true },
  { label: "Organization Dashboard", pro: false, team: true, ent: true },
  { label: "Admin Controls", pro: false, team: true, ent: true },
  { label: "API Access", pro: false, team: false, ent: true },
  { label: "EHR Integrations", pro: false, team: false, ent: true },
  { label: "SSO", pro: false, team: false, ent: true },
  { label: "Audit Logs", pro: false, team: false, ent: true },
  { label: "Dedicated Support", pro: false, team: false, ent: true },
];

function Cell({ on }: { on: boolean }) {
  return (
    <td className="py-4 text-center">
      {on ? (
        <Check className="w-4 h-4 text-primary mx-auto" />
      ) : (
        <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />
      )}
    </td>
  );
}

function Comparison() {
  return (
    <section className="py-24 border-t border-border/70">
      <div className="container-clinik">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Compare plans</Eyebrow>
            <h2 className="h-display text-[36px] sm:text-[44px] text-balance">
              Everything included, wherever you start.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10 rounded-[28px] bg-card hairline overflow-x-auto">
            <table className="w-full min-w-[600px] text-[14px]">
              <thead>
                <tr className="border-b border-border/70">
                  <th className="text-left font-medium py-5 px-7 text-[13px] uppercase tracking-[0.14em] text-muted-foreground">
                    Feature
                  </th>
                  {["Professional", "Team", "Enterprise"].map((h) => (
                    <th key={h} className="py-5 px-4 font-medium text-[14px] w-[140px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((r, i) => (
                  <tr key={r.label} className={i % 2 ? "bg-background/60" : ""}>
                    <td className="py-4 px-7 text-foreground">{r.label}</td>
                    <Cell on={r.pro} />
                    <Cell on={r.team} />
                    <Cell on={r.ent} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- ROI ---------------- */
function ROI() {
  const items = [
    { t: "Hours Saved", d: "Reduce documentation time and administrative work every week." },
    {
      t: "Faster Documentation",
      d: "Generate structured clinical notes in minutes instead of manually writing them.",
    },
    {
      t: "Improved Team Efficiency",
      d: "Help clinicians collaborate with shared documentation workflows.",
    },
    {
      t: "Enterprise Ready",
      d: "Built with security, scalability, and healthcare organizations in mind.",
    },
  ];
  return (
    <section className="py-24 border-t border-border/70">
      <div className="container-clinik">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <Eyebrow>Why Rhea</Eyebrow>
            <h2 className="h-display text-[36px] sm:text-[44px] text-balance">
              More time with patients. Less time documenting.
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <div className="rounded-3xl bg-card hairline p-7 h-full">
                <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-6">
                  <Check className="w-4 h-4" />
                </div>
                <div className="text-[15px] font-medium">{it.t}</div>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  {
    q: "Can I try Rhea Health before subscribing?",
    a: "Yes. Every plan starts with a free trial so your team can document real visits before committing. No card is required to begin.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Monthly plans can be cancelled at any time and remain active through the end of the billing period. Annual plans renew yearly and can be cancelled before renewal.",
  },
  {
    q: "Do you integrate with electronic health record systems?",
    a: "Yes. Enterprise plans include EHR integrations, including major systems such as Epic and Cerner, along with API access for custom workflows.",
  },
  {
    q: "How is patient data secured?",
    a: "Data is encrypted in transit and at rest, access is role-scoped and audited, and our platform is built to support HIPAA obligations with a signed BAA.",
  },
  {
    q: "Can hospitals deploy Rhea across multiple departments?",
    a: "Yes. Enterprise deployments support multiple locations and departments with centralized administration, permissions, and reporting.",
  },
  {
    q: "Do you offer onboarding and training?",
    a: "Team plans include guided onboarding. Enterprise organizations receive a dedicated Customer Success Manager and tailored clinician training.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual plans are billed once per year at a 15% discount against the monthly rate, with seats adjustable at renewal.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 border-t border-border/70">
      <div className="container-clinik grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="h-display text-[36px] text-balance">Frequently asked questions.</h2>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-[28px] bg-card hairline divide-y divide-border/70">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left px-7 py-5"
                  aria-expanded={open === i}
                >
                  <span className="text-[15px] font-medium">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-6 text-[14px] text-muted-foreground leading-relaxed max-w-2xl">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section id="contact" className="pb-24">
      <div className="container-clinik">
        <Reveal>
          <div className="rounded-[32px] bg-primary text-primary-foreground px-8 py-20 sm:py-24 text-center">
            <h2 className="h-display text-[40px] sm:text-[56px] text-balance max-w-3xl mx-auto">
              Spend less time documenting. More time caring.
            </h2>
            <p className="mt-5 text-[17px] text-primary-foreground/80 max-w-xl mx-auto">
              See how Rhea Health can help clinicians reduce administrative burden and improve the
              patient experience.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={appLink("/signin")}
                className="inline-flex items-center h-12 px-6 rounded-full bg-background text-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start Free Trial
              </a>
              <a
                href="mailto:sales@rhea.health"
                className="inline-flex items-center h-12 px-6 rounded-full border border-primary-foreground/30 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border/70 py-12">
      <div className="container-clinik flex flex-wrap items-center justify-between gap-6">
        <Logo height={32} />
        <div className="text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} Rhea Health. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
