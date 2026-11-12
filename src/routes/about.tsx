import { createFileRoute } from "@tanstack/react-router";
import { appLink, siteLink } from "@/lib/app-url";
import { Nav } from "@/components/clinik/Nav";
import { Reveal } from "@/components/clinik/Reveal";
import { Footer } from "@/components/clinik/Footer";
import { Portrait, PORTRAITS } from "@/components/clinik/Portraits";
import imgTeam from "@/assets/mkt-team.jpg";
import imgHospital from "@/assets/mkt-hospital.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rhea - Building clinical AI infrastructure" },
      {
        name: "description",
        content:
          "Rhea builds AI infrastructure for healthcare. Meet the team returning clinical hours to doctors through structured, trustworthy documentation.",
      },
      { property: "og:title", content: "About Rhea Health" },
      {
        property: "og:description",
        content:
          "Why we build clinical AI infrastructure for hospitals, and the principles that guide every decision at Rhea.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Rhea Health" },
      {
        name: "twitter:description",
        content: "The team building AI infrastructure for modern healthcare.",
      },
    ],
  }),
  component: About,
});

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="h-px w-8 bg-primary/50" />
      <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-primary">
        {children}
      </span>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={imgHospital}
          alt="Modern hospital corridor"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,16,0.78)_0%,rgba(12,20,16,0.62)_100%)]" />
        <div className="container-clinik relative z-10 py-32 sm:py-44">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-white">
                About Rhea
              </span>
            </div>
            <Reveal>
              <h1 className="h-display text-[44px] sm:text-[68px] leading-[1.03] text-balance text-white">
                Clinical AI infrastructure,
                <br />
                <span className="text-white">built for medicine.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 text-[18px] sm:text-[20px] leading-[1.7] text-white max-w-2xl">
                Modern healthcare teams trust Rhea to transform patient interactions into structured
                medical notes. We build the systems underneath that promise: accurate, auditable,
                and safe by design.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-10 sm:-mt-16 rounded-t-[28px] sm:rounded-t-[40px] bg-background shadow-[0_-30px_70px_-30px_rgba(12,20,16,0.55)]">
        {/* Mission */}
        <section className="py-28 sm:py-36">
          <div className="container-clinik grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <Label>Our mission</Label>
              <h2 className="h-display text-[34px] sm:text-[46px] leading-[1.08] text-balance">
                Return time to the people who practice medicine.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-[16px] sm:text-[17px] leading-[1.8] text-foreground">
              <p>
                Documentation was never meant to be the largest part of a clinician's day. Yet
                across health systems, the record has quietly become the work, and care has become
                the thing that fits around it.
              </p>
              <p>
                Rhea exists to reverse that order. Our models listen in the room, understand
                clinical intent, and produce notes that clinicians recognise as their own, ready for
                review in seconds rather than hours.
              </p>
              <p>
                We are building for the long term: infrastructure that health systems can deploy
                inside their own environment, audit end to end, and trust with their most sensitive
                data.
              </p>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="border-y border-border/70 py-20">
          <div className="container-clinik grid sm:grid-cols-3 gap-12">
            {[
              { k: "70%", t: "less documentation time per encounter" },
              { k: "2M+", t: "clinical minutes structured to date" },
              { k: "40+", t: "care settings across three continents" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 90}>
                <div>
                  <div className="h-display text-[44px] sm:text-[56px] leading-none">{s.k}</div>
                  <p className="mt-4 text-[15px] leading-[1.7] text-foreground max-w-xs">{s.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="py-28 sm:py-36">
          <div className="container-clinik">
            <Label>What we believe</Label>
            <h2 className="h-display text-[34px] sm:text-[46px] leading-[1.08] max-w-2xl text-balance">
              Principles behind every decision.
            </h2>
            <div className="mt-16 grid md:grid-cols-3 gap-x-12 gap-y-14">
              {[
                {
                  h: "Clinicians stay in control",
                  d: "Nothing enters the record without a clinician's review. Rhea drafts; the physician decides.",
                },
                {
                  h: "Privacy is architecture",
                  d: "Encryption, isolation, and in-VPC deployment are defaults, not enterprise upsells.",
                },
                {
                  h: "Accuracy over novelty",
                  d: "We optimise for clinical faithfulness and traceability, not for impressive demos.",
                },
                {
                  h: "Built with health systems",
                  d: "Every workflow is shaped alongside the physicians, nurses, and admins who use it daily.",
                },
                {
                  h: "Interoperable by default",
                  d: "Records should travel with the patient, across systems, sites, and borders.",
                },
                {
                  h: "Quietly reliable",
                  d: "The best clinical software disappears into the work. We measure ourselves on that.",
                },
              ].map((p, i) => (
                <Reveal key={p.h} delay={i * 70}>
                  <div>
                    <h3 className="text-[18px] font-medium tracking-tight">{p.h}</h3>
                    <p className="mt-3 text-[15px] leading-[1.75] text-foreground">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team band */}
        <section className="relative isolate overflow-hidden">
          <img
            src={imgTeam}
            alt="Clinical team collaborating"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,20,16,0.85)_0%,rgba(12,20,16,0.55)_70%)]" />
          <div className="container-clinik relative z-10 py-28 sm:py-36">
            <h2 className="h-display text-[34px] sm:text-[48px] leading-[1.08] max-w-2xl text-balance text-white">
              Physicians, engineers, and researchers in one room.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.75] text-white max-w-xl">
              Rhea is built by a team that has practised medicine and shipped production AI systems,
              working side by side on every release.
            </p>
          </div>
        </section>

        {/* People */}
        <section className="py-28 sm:py-36">
          <div className="container-clinik">
            <Label>Leadership</Label>
            <h2 className="h-display text-[34px] sm:text-[46px] leading-[1.08] max-w-2xl text-balance">
              The people building Rhea.
            </h2>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
              {[
                { src: PORTRAITS.drChen, n: "Dr. Elena Chen", r: "Co-founder & Chief Executive" },
                {
                  src: PORTRAITS.drOkafor,
                  n: "Dr. Samuel Okafor",
                  r: "Co-founder & Chief Medical Officer",
                },
                {
                  src: PORTRAITS.drLindqvist,
                  n: "Dr. Anna Lindqvist",
                  r: "Head of Clinical Research",
                },
                { src: PORTRAITS.drAmari, n: "Yusuf Amari", r: "Head of Engineering" },
                { src: PORTRAITS.drMoreau, n: "Claire Moreau", r: "Head of Trust & Security" },
                { src: PORTRAITS.nurseRivera, n: "Maria Rivera, RN", r: "Head of Clinical Design" },
              ].map((p, i) => (
                <Reveal key={p.n} delay={i * 70}>
                  <div className="flex items-center gap-4">
                    <Portrait src={p.src} alt={p.n} size={64} />
                    <div>
                      <div className="text-[16px] font-medium tracking-tight">{p.n}</div>
                      <div className="mt-1 text-[14px] text-muted-foreground">{p.r}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/70 py-28">
          <div className="container-clinik text-center">
            <h2 className="h-display text-[34px] sm:text-[48px] leading-[1.08] max-w-2xl mx-auto text-balance">
              Come build the record layer for healthcare.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.75] text-foreground max-w-xl mx-auto">
              We are hiring across clinical research, engineering, and security, and onboarding new
              health systems every month.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={appLink("/signup")}
                className="inline-flex items-center h-12 px-7 rounded-full bg-primary text-primary-foreground text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Request demo
              </a>
              <a
                href={siteLink("/pricing")}
                className="inline-flex items-center h-12 px-7 rounded-full border border-border text-foreground text-[15px] font-medium hover:bg-muted transition-colors"
              >
                View pricing →
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
