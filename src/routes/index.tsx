import { createFileRoute } from "@tanstack/react-router";
import { Nav, Logo } from "@/components/clinik/Nav";
import { Footer } from "@/components/clinik/Footer";
import { Reveal } from "@/components/clinik/Reveal";
import { Portrait, TeamRow, PORTRAITS } from "@/components/clinik/Portraits";
import heroVideo from "@/assets/hero-clinic.mp4.asset.json";
import imgConsult from "@/assets/mkt-consult.jpg";
import imgTeam from "@/assets/mkt-team.jpg";
import imgHospital from "@/assets/mkt-hospital.jpg";
import imgReview from "@/assets/mkt-review.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rhea - Every Patient Conversation, Instantly Documented" },
      {
        name: "description",
        content:
          "Rhea is the AI medical scribe for modern hospitals. Turn patient conversations into structured clinical notes and give doctors time back for care.",
      },
      { property: "og:title", content: "Rhea - AI documentation for modern hospitals" },
      {
        property: "og:description",
        content:
          "Turn every patient conversation into structured clinical notes. Enterprise-grade AI documentation, patient communication, and portable health identity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rhea - AI documentation for modern hospitals" },
      {
        name: "twitter:description",
        content: "Give doctors back thousands of hours. Rhea documents every patient conversation.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <div className="relative z-10 -mt-10 sm:-mt-16 rounded-t-[28px] sm:rounded-t-[40px] bg-background shadow-[0_-30px_70px_-30px_rgba(12,20,16,0.55)]">
        <Logos />
        <Problem />
        <Statement />
        <Scribe />
        <ClinicianBand />
        <Patient />
        <Portable />
        <Why />
        <Security />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

/* ---------------- EDITORIAL PRIMITIVES ---------------- */
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

function LabelLight({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="h-px w-8 bg-white/40" />
      <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-white">
        {children}
      </span>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative isolate min-h-[86vh] sm:min-h-[92vh] flex items-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo.url}
        poster={imgConsult}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      {/* elegant overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,16,0.62)_0%,rgba(12,20,16,0.48)_45%,rgba(12,20,16,0.66)_100%)]" />

      <div className="container-clinik relative z-10 py-32 sm:py-40">
        <div className="max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-3.5 py-1.5 text-[12px] tracking-wide text-white mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/90" />
              AI-native clinical documentation
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display text-[46px] sm:text-[68px] lg:text-[84px] leading-[1.02] text-balance text-white">
              Every patient conversation,
              <br />
              <span className="text-white">instantly documented.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 text-[18px] sm:text-[20px] leading-[1.7] text-white max-w-2xl">
              Modern healthcare teams trust Rhea to transform patient interactions into structured
              medical notes.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="inline-flex items-center h-12 px-7 rounded-full bg-primary text-primary-foreground text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Request demo
              </a>
              <a
                href="#"
                className="inline-flex items-center h-12 px-7 rounded-full border border-white/30 text-white text-[15px] font-medium hover:bg-white/10 transition-colors"
              >
                Join early access →
              </a>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-white">
              <span className="inline-flex items-center gap-2">
                <CheckLight /> HIPAA ready
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckLight /> SOC 2 in progress
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckLight /> Deploys in your VPC
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue into next section */}
      <a
        href="#product"
        aria-label="Scroll to next section"
        className="absolute left-1/2 -translate-x-1/2 bottom-14 sm:bottom-16 z-10 hidden sm:flex flex-col items-center gap-3 text-white hover:text-white transition-colors"
      >
        <span className="text-[11px] uppercase tracking-[0.24em]">Scroll</span>
        <span className="relative block h-10 w-px bg-white/25 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-4 bg-white/80 animate-[scrollcue_2s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 7.4l2.6 2.6L11 4.6"
        stroke="var(--color-primary)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CheckLight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 7.4l2.6 2.6L11 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- LOGOS ---------------- */
function Logos() {
  const names = [
    "Meridian Health",
    "Northline Clinics",
    "Vantage Med",
    "St. Kilda Group",
    "Auralis",
    "Kestrel Care",
  ];
  return (
    <section className="py-20">
      <div className="container-clinik">
        <Reveal>
          <p className="text-center text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-12">
            Trusted by clinical teams at forward-thinking hospitals
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-8 items-center">
          {names.map((n, i) => (
            <Reveal key={n} delay={i * 60}>
              <div className="text-center text-[15px] font-medium tracking-tight text-foreground/50 hover:text-foreground/90 transition-colors">
                {n}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROBLEM ---------------- */
function Problem() {
  const stats = [
    {
      k: "6 hrs",
      t: "spent on documentation daily",
      d: "Physicians spend nearly half their working day on notes rather than on patient care.",
      icon: <IconClock />,
    },
    {
      k: "63%",
      t: "of clinicians report burnout",
      d: "Administrative overload is the leading driver of clinician attrition in modern hospitals.",
      icon: <IconHeartPulse />,
    },
    {
      k: "9 systems",
      t: "the average patient record lives in",
      d: "Fragmented records slow diagnosis, waste referrals, and put continuity of care at risk.",
      icon: <IconLayers />,
    },
  ];
  return (
    <section id="product" className="py-28 sm:py-36">
      <div className="container-clinik">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-end mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <Label>Clinical Intelligence</Label>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-display text-[40px] sm:text-[56px] leading-[1.05] text-balance">
                Medicine is drowning in paperwork.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={160}>
              <p className="text-[18px] leading-[1.75] text-foreground">
                Clinicians didn't train for a decade to become typists. Yet documentation,
                referrals, and fragmented records consume most of their day.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border-t border-border/70">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 100}>
              <div className="h-full py-12 md:pr-12 md:pl-12 md:first:pl-0 border-b md:border-b-0 md:border-r last:md:border-r-0 border-border/70">
                <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-8">
                  {s.icon}
                </div>
                <div className="h-display text-[52px] leading-none text-foreground">{s.k}</div>
                <div className="mt-4 text-[17px] font-medium text-foreground">{s.t}</div>
                <p className="mt-3 text-[15px] text-foreground leading-[1.7] max-w-xs">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FULL-BLEED STATEMENT ---------------- */
function Statement() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={imgHospital}
        alt="Clinicians walking through a modern hospital atrium"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,20,16,0.82)_0%,rgba(12,20,16,0.55)_60%,rgba(12,20,16,0.35)_100%)]" />
      <div className="container-clinik relative z-10 py-32 sm:py-44">
        <div className="max-w-3xl">
          <Reveal>
            <LabelLight>Healthcare AI</LabelLight>
          </Reveal>
          <Reveal delay={80}>
            <p className="h-display text-[32px] sm:text-[46px] leading-[1.15] text-white text-balance">
              Rhea listens in the background of care, so clinicians can stay present with the person
              in front of them.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCRIBE ---------------- */
function Scribe() {
  return (
    <section id="scribe" className="py-28 sm:py-36">
      <div className="container-clinik grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <Label>Documentation</Label>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-display text-[38px] sm:text-[50px] leading-[1.06] text-balance">
              Speech becomes structured clinical documentation.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-[18px] leading-[1.75] text-foreground max-w-lg">
              Rhea listens in the background of any consultation, transcribes with clinical
              accuracy, and produces a signed-ready note the physician can approve in seconds.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-5">
            {[
              "Ambient capture across in-person and telehealth visits",
              "Specialty-tuned note templates: SOAP, DAP, H&P, procedure",
              "ICD-10 and CPT suggestions with source-linked evidence",
              "One-click export to Epic, Cerner, and Athenahealth",
            ].map((t, i) => (
              <Reveal key={t} delay={220 + i * 60}>
                <li className="flex items-start gap-3 text-[16px] leading-[1.7]">
                  <span className="mt-1.5">
                    <Check />
                  </span>
                  <span className="text-muted-foreground">{t}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 items-stretch">
          <Reveal delay={120}>
            <div className="h-full rounded-3xl overflow-hidden hairline">
              <img
                src={imgConsult}
                alt="Physician consulting with a patient"
                loading="lazy"
                width={1600}
                height={1200}
                className="w-full h-full object-cover min-h-[320px] transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <ScribeFlow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScribeFlow() {
  return (
    <div className="rounded-3xl bg-card hairline shadow-[var(--shadow-clinik)] p-6 space-y-4">
      {/* Step 1: audio */}
      <div className="rounded-2xl bg-background/60 hairline p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] pulse-dot" /> Recording
            · 02:41
          </div>
          <span className="text-[12px] text-muted-foreground uppercase tracking-wider">
            Room 3B
          </span>
        </div>
        <div className="flex items-end gap-[3px] h-8">
          {Array.from({ length: 42 }).map((_, i) => (
            <span
              key={i}
              className="wave-bar w-[3px] rounded-sm bg-primary/70"
              style={{ height: `${20 + ((i * 37) % 80)}%`, animationDelay: `${(i % 8) * 0.08}s` }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center text-muted-foreground">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden>
          <path
            d="M8 2v14M2 12l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="rounded-2xl bg-background/60 hairline p-5 space-y-2 text-[13px] leading-relaxed">
        <div>
          <span className="text-muted-foreground">Physician: </span>Any new symptoms since last
          visit?
        </div>
        <div>
          <span className="text-muted-foreground">Patient: </span>Some morning stiffness in my
          knees, about twenty minutes.
        </div>
        <div>
          <span className="text-muted-foreground">Physician: </span>Let's continue naproxen and add
          a short PT course.
        </div>
      </div>

      <div className="flex justify-center text-muted-foreground">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden>
          <path
            d="M8 2v14M2 12l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="rounded-2xl bg-background/60 hairline p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-medium">Structured note</span>
          <span className="text-[12px] uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">
            Ready
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          {[
            ["Chief complaint", "Bilateral knee stiffness, AM"],
            ["Assessment", "Osteoarthritis, mild"],
            ["Plan", "Naproxen 500mg BID · PT ×6"],
            ["Codes", "M17.0 · 97110"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border/70 p-2">
              <div className="text-[12px] uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="text-foreground mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- CLINICIAN BAND ---------------- */
function ClinicianBand() {
  const people = [
    { src: PORTRAITS.drChen, name: "Dr. Amelia Chen", role: "Cardiology · Meridian" },
    { src: PORTRAITS.drOkafor, name: "Dr. Femi Okafor", role: "Internal med · Northline" },
    { src: PORTRAITS.nurseRivera, name: "Sofía Rivera, RN", role: "Care coordinator" },
    { src: PORTRAITS.drLindqvist, name: "Dr. Ida Lindqvist", role: "Family medicine" },
    { src: PORTRAITS.drAmari, name: "Dr. Marcus Amari", role: "Emergency · St. Kilda" },
  ];
  return (
    <section className="py-24 sm:py-32 bg-[color-mix(in_oklab,var(--color-background)_50%,white)]">
      <div className="container-clinik grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal>
            <div className="rounded-3xl overflow-hidden hairline">
              <img
                src={imgTeam}
                alt="Nurse and physician reviewing a patient record together"
                loading="lazy"
                width={1600}
                height={1200}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal>
            <Label>Built with clinicians</Label>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="h-display text-[34px] sm:text-[44px] leading-[1.08] text-balance">
              Designed alongside the people who use it every shift.
            </h3>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-[18px] leading-[1.75] text-foreground max-w-lg">
              Every workflow in Rhea has been shaped by physicians, nurses, and care coordinators
              from the hospitals we serve - not by product decks.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10">
              <TeamRow people={people} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PATIENT ---------------- */
function Patient() {
  return (
    <section className="py-28 sm:py-36">
      <div className="container-clinik">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <Reveal>
            <div className="flex justify-center">
              <Label>Patient communication</Label>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-display text-[40px] sm:text-[56px] leading-[1.05] text-balance">
              One thread from the exam room to the couch.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-[18px] leading-[1.75] text-foreground max-w-2xl mx-auto">
              Patients get a calm, secure inbox. Physicians see everything in one dashboard. No
              portals, no lost referrals, no missed follow-ups.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <Reveal>
            <PatientPhone />
          </Reveal>
          <Reveal delay={120}>
            <DoctorDash />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PatientPhone() {
  return (
    <div className="rounded-3xl bg-card hairline shadow-[var(--shadow-clinik)] p-8 h-full flex items-center justify-center">
      <div className="w-[280px] rounded-[36px] hairline bg-background shadow-[var(--shadow-clinik-lg)] p-4">
        <div className="mx-auto w-20 h-1.5 rounded-full bg-border mb-4" />
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Logo className="scale-90" />
          </div>
          <div>
            <div className="text-sm font-semibold">Dr. Chen</div>
            <div className="text-[13px] text-muted-foreground">Cardiology · Meridian</div>
          </div>
        </div>
        <div className="space-y-2">
          <Bubble side="in">
            Hi Marta - your labs from Tuesday look great. Cholesterol is down.
          </Bubble>
          <Bubble side="out">That's such a relief. Should I keep the same dose?</Bubble>
          <Bubble side="in">
            Yes, continue for six weeks. I've booked your follow-up for Apr 18.
          </Bubble>
          <div className="rounded-2xl hairline p-3 bg-background/70">
            <div className="text-[13px] text-muted-foreground mb-1">Appointment</div>
            <div className="text-sm font-medium">Apr 18 · 10:30 AM</div>
            <div className="text-[13px] text-muted-foreground">Meridian Health · Suite 402</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ children, side }: { children: React.ReactNode; side: "in" | "out" }) {
  return (
    <div className={`flex ${side === "out" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] text-[12.5px] leading-snug rounded-2xl px-3 py-2 ${
          side === "out"
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function DoctorDash() {
  return (
    <div className="rounded-3xl bg-card hairline shadow-[var(--shadow-clinik)] p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="text-sm font-semibold">Today · 12 patients</div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] px-2 py-1 rounded-full bg-primary/10 text-primary">
            3 need reply
          </span>
          <span className="text-[13px] px-2 py-1 rounded-full hairline text-muted-foreground">
            Filters
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { n: "Marta Kellner", s: "Labs reviewed · replied", t: "9:12", u: false },
          { n: "James Oduya", s: "New message · post-op day 3", t: "9:41", u: true },
          { n: "Priya Sharma", s: "Refill request · lisinopril", t: "10:05", u: true },
          { n: "Aiden Novak", s: "Follow-up confirmed", t: "10:22", u: false },
          { n: "Lena Whitaker", s: "Sent care plan · awaiting reply", t: "10:48", u: true },
        ].map((p, i) => (
          <div
            key={p.n}
            className={`flex items-center justify-between rounded-2xl p-3 border ${
              i === 1 ? "border-primary/40 bg-primary/5" : "border-transparent hover:bg-muted"
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-muted text-foreground/70 flex items-center justify-center text-xs font-semibold">
                {p.n
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-medium flex items-center gap-2">
                  {p.n}
                  {p.u && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <div className="text-[13px] text-muted-foreground">{p.s}</div>
              </div>
            </div>
            <div className="text-[13px] text-muted-foreground">{p.t}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          ["Avg response", "4m 12s"],
          ["Notes signed", "38 / 41"],
          ["Msgs today", "27"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl hairline p-3">
            <div className="text-[12px] uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="text-sm font-semibold mt-0.5">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PORTABLE ---------------- */
function Portable() {
  return (
    <section className="py-28 sm:py-36 bg-[color-mix(in_oklab,var(--color-background)_50%,white)]">
      <div className="container-clinik">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Label>Portable health identity</Label>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-display text-[38px] sm:text-[50px] leading-[1.06] text-balance">
                The record moves with the patient.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 text-[18px] leading-[1.75] text-foreground max-w-lg">
                Every patient carries a signed, encrypted identity across every hospital they visit.
                No lost history, no duplicated tests, no re-typing at reception.
              </p>
            </Reveal>
            <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8 max-w-xl">
              {[
                [
                  "Signed at source",
                  "Each note is cryptographically signed by the issuing clinician.",
                ],
                ["Patient-owned", "The patient controls who can read, and can revoke at any time."],
                [
                  "Hospital-verified",
                  "Every read is logged and attributable in an immutable audit trail.",
                ],
                ["Standards-first", "FHIR R4, SMART on FHIR, HL7 v2 for legacy integrations."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={200 + i * 60}>
                  <div className="border-t border-border/70 pt-4">
                    <div className="text-[16px] font-medium">{t}</div>
                    <div className="text-[14px] text-muted-foreground mt-2 leading-[1.7]">{d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={120}>
              <PortableDiagram />
            </Reveal>
            <Reveal delay={200}>
              <div className="rounded-3xl overflow-hidden hairline">
                <img
                  src={imgReview}
                  alt="Clinician reviewing AI-generated documentation on a tablet"
                  loading="lazy"
                  width={1408}
                  height={1600}
                  className="w-full h-[260px] object-cover object-top transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortableDiagram() {
  const hospitals = [
    { name: "Meridian Health", sub: "Cardiology" },
    { name: "Northline Clinics", sub: "Primary care" },
    { name: "St. Kilda Group", sub: "Radiology" },
  ];
  return (
    <div className="rounded-3xl bg-card hairline shadow-[var(--shadow-clinik)] p-8">
      <div className="relative h-[420px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-background hairline shadow-[var(--shadow-clinik)] px-5 py-4 w-[220px] text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 text-sm font-semibold">
            MK
          </div>
          <div className="text-sm font-semibold">Marta Kellner</div>
          <div className="text-[13px] text-muted-foreground">Rhea ID · 09821·4A</div>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-primary">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M5 1l3 1v3c0 2-1.5 3.5-3 4-1.5-.5-3-2-3-4V2l3-1z" fill="currentColor" />
            </svg>
            End-to-end encrypted
          </div>
        </div>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 420"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M60 60 Q 200 60 200 200"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
          <path
            d="M340 60 Q 200 60 200 200"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
          <path
            d="M200 370 L 200 240"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
        </svg>

        <HospitalPill className="absolute top-0 left-0" {...hospitals[0]} />
        <HospitalPill className="absolute top-0 right-0" {...hospitals[1]} />
        <HospitalPill className="absolute bottom-0 left-1/2 -translate-x-1/2" {...hospitals[2]} />
      </div>
    </div>
  );
}

function HospitalPill({
  name,
  sub,
  className = "",
}: {
  name: string;
  sub: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} rounded-2xl bg-background hairline px-4 py-3 min-w-[180px] shadow-[var(--shadow-clinik-sm)]`}
    >
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-foreground/90 text-background text-[13px] font-bold flex items-center justify-center">
          H
        </span>
        <div>
          <div className="text-[13px] font-semibold">{name}</div>
          <div className="text-[12px] text-muted-foreground">{sub}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- WHY ---------------- */
function Why() {
  const items = [
    {
      t: "AI Documentation",
      d: "Ambient scribe generates signed-ready notes for every specialty.",
      icon: <IconDoc />,
    },
    {
      t: "Patient Messaging",
      d: "Secure two-way threads that replace portals, SMS, and phone tag.",
      icon: <IconChat />,
    },
    {
      t: "Portable Records",
      d: "One patient identity across every hospital, verified end-to-end.",
      icon: <IconId />,
    },
    {
      t: "Physician Dashboard",
      d: "Every note, message, and follow-up in a single calm workspace.",
      icon: <IconDash />,
    },
    {
      t: "Enterprise Security",
      d: "HIPAA-ready, SOC 2 in progress, deployable in your own VPC.",
      icon: <IconShield />,
    },
    {
      t: "Hospital Integrations",
      d: "Epic, Cerner, Athenahealth, plus FHIR and HL7 out of the box.",
      icon: <IconPlug />,
    },
  ];
  return (
    <section id="customers" className="py-28 sm:py-36">
      <div className="container-clinik">
        <div className="max-w-3xl mb-20">
          <Reveal>
            <Label>Platform</Label>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-display text-[40px] sm:text-[56px] leading-[1.05] text-balance">
              One platform. Every touchpoint of care.
            </h2>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 border-t border-border/70">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={(i % 3) * 80}>
              <div className="group h-full py-10 border-b border-border/70">
                <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-7 transition-colors group-hover:bg-primary/15">
                  {it.icon}
                </div>
                <div className="text-[19px] font-medium">{it.t}</div>
                <p className="mt-3 text-[15px] text-foreground leading-[1.7]">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECURITY ---------------- */
function Security() {
  const items = [
    {
      t: "HIPAA Ready",
      d: "BAAs signed, PHI safeguards, full breach-notification workflows.",
      icon: <IconShield />,
    },
    {
      t: "End-to-End Encryption",
      d: "AES-256 at rest, TLS 1.3 in transit, per-tenant key isolation.",
      icon: <IconLock />,
    },
    {
      t: "Audit Logs",
      d: "Immutable, exportable trails of every read and write, tied to identity.",
      icon: <IconList />,
    },
    {
      t: "Role-Based Permissions",
      d: "Fine-grained roles across departments, teams, and delegated care.",
      icon: <IconUsers />,
    },
  ];
  return (
    <section
      id="security"
      className="py-28 sm:py-36 bg-[color-mix(in_oklab,var(--color-background)_50%,white)]"
    >
      <div className="container-clinik">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 mb-16 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Label>Enterprise Ready</Label>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-display text-[40px] sm:text-[56px] leading-[1.05] text-balance">
                Built for the standards hospitals demand.
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <div className="rounded-3xl bg-card hairline p-8 h-full shadow-[var(--shadow-clinik-sm)] hover:shadow-[var(--shadow-clinik)] transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-7">
                  {it.icon}
                </div>
                <div className="text-[17px] font-medium">{it.t}</div>
                <p className="mt-3 text-[15px] text-foreground leading-[1.7]">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section id="cta" className="relative isolate overflow-hidden">
      <img
        src={imgConsult}
        alt="Physician and patient in consultation"
        loading="lazy"
        width={1600}
        height={1200}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,16,0.78)_0%,rgba(12,20,16,0.7)_100%)]" />
      <div className="container-clinik relative z-10 py-32 sm:py-44 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-3.5 py-1.5 text-[12px] text-white mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/90" />
            Now onboarding health systems
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h-display text-[46px] sm:text-[72px] leading-[1.03] text-balance max-w-4xl mx-auto text-white">
            Bring time back to medicine.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 text-[18px] leading-[1.75] text-white max-w-2xl mx-auto">
            See how Rhea reduces documentation load by 70% and returns your clinicians to the work
            only they can do.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center h-12 px-7 rounded-full bg-primary text-primary-foreground text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Request demo
            </a>
            <a
              href="#"
              className="inline-flex items-center h-12 px-7 rounded-full border border-white/30 text-white text-[15px] font-medium hover:bg-white/10 transition-colors"
            >
              Talk to sales →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- ICONS ---------------- */
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconHeartPulse() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10h3l1.5-2 2 5L11 8l1.5 2H18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2.5l7 3.5-7 3.5-7-3.5 7-3.5zM3 10l7 3.5 7-3.5M3 13.5l7 3.5 7-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 2.5h6l4 4V17a.5.5 0 01-.5.5h-9A.5.5 0 015 17V2.5z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M11 2.5V6.5h4M7.5 10h5M7.5 13h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 4.5h14v9H8.5L5 16.5v-3H3v-9z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconId() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect
        x="2.5"
        y="4.5"
        width="15"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="7.5" cy="10" r="1.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11.5 9h4M11.5 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconDash() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect
        x="2.5"
        y="2.5"
        width="6.5"
        height="8"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="11"
        y="2.5"
        width="6.5"
        height="5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="11"
        y="9.5"
        width="6.5"
        height="8"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="2.5"
        y="12.5"
        width="6.5"
        height="5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2.5l6 2v5c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8v-5l6-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10l1.75 1.75L12.5 8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconPlug() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M8 2v4M12 2v4M6 6h8v4a4 4 0 01-8 0V6zM10 14v4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 9V6.5a3.5 3.5 0 017 0V9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 5.5h12M4 10h12M4 14.5h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="7.5" cy="7" r="2.75" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.5 16c0-2.5 2.2-4.25 5-4.25S12.5 13.5 12.5 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13.5 5.5a2.5 2.5 0 010 5M15 15.5c0-2-1-3.25-2.5-3.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
