import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Check,
  ArrowRight,
  Mic,
  FileText,
  PenLine,
  MessagesSquare,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import { siteLink, appLink } from "@/lib/app-url";
import logo from "@/assets/rhea-logo.png";
import heroVideo from "@/assets/hero-clinic.mp4";
import heroPoster from "@/assets/hero-poster.jpg";
import imgConsult from "@/assets/mkt-consult.jpg";
import imgTeam from "@/assets/mkt-team.jpg";
import imgHospital from "@/assets/mkt-hospital.jpg";
import imgActivity from "@/assets/loop-activity.jpg";

export const Route = createFileRoute("/sample")({
  head: () => ({
    meta: [
      { title: "Sample page · Rhea Health" },
      {
        name: "description",
        content: "Concept redesigns and sample screens for the Rhea Health marketing site.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400;1,8..60,500&display=swap",
      },
    ],
  }),
  component: SamplePage,
});

/* ------------------------------------------------------------------ */
/* primitives                                                          */
/* ------------------------------------------------------------------ */

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && (setSeen(true), io.disconnect())),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const INK = "#1A2A22";
const DEEP = "#2F6B4F";
const GREEN = "#2F6B4F";
const GOLD = "#B29049";
const PAPER = "#F6F4EE";

function Eyebrow({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "gold" }) {
  return (
    <p
      className="text-[12px] font-semibold uppercase tracking-[0.22em]"
      style={{ color: tone === "gold" ? GOLD : GREEN }}
    >
      {children}
    </p>
  );
}

function AiChip({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        dark ? "bg-white/10 text-white" : "bg-[#E9EFE7] text-[#2F6B4F]"
      }`}
    >
      <Sparkles size={12} />
      AI draft
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* page shell                                                          */
/* ------------------------------------------------------------------ */

function SamplePage() {
  return (
    <div className="sample-root bg-[#EFECE4] text-[#1A2A22] antialiased">
      <style>{`
        .sample-root { font-family: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif; }
        .sample-root .serif { font-family: "Source Serif 4", Georgia, "Times New Roman", serif; font-weight: 500; letter-spacing: -0.015em; }
        .sample-root ::selection { background: #2F6B4F; color: #F6F4EE; }
      `}</style>
      <SampleBar />
      <ConceptHome />
      <SampleEnd />
    </div>
  );
}

function SampleBar() {
  return (
    <div className="bg-[#10160f] text-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-6 py-3 sm:px-10">
        <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em]">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
          Sample page
          <span className="font-normal normal-case tracking-normal text-white/55">
            Concept redesigns, shown for review. Not part of the live site.
          </span>
        </p>
        <a
          href={siteLink("/")}
          className="text-[13px] font-medium text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          Back to the live homepage
        </a>
      </div>
    </div>
  );
}

function SampleEnd() {
  return (
    <div className="bg-[#10160f] text-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-10">
        <p className="text-[13px] text-white/60">
          End of sample · 01 Homepage concept · Built from the real product, the published pricing
          and Rhea&apos;s own photography library.
        </p>
        <a
          href={siteLink("/")}
          className="text-[13px] font-medium text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          Back to the live homepage
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* concept homepage                                                    */
/* ------------------------------------------------------------------ */

function ConceptHome() {
  return (
    <div style={{ backgroundColor: PAPER }}>
      <ConceptNav />
      <ConceptHero />
      <StatsBand />
      <HowItWorks />
      <NoteStory />
      <InboxStory />
      <LoopStory />
      <DeviceBand />
      <WholePractice />
      <PricingTeaser />
      <ConceptFaq />
      <FinalCta />
      <ConceptFooter />
    </div>
  );
}

function ConceptNav() {
  const links = [
    { t: "How it works", href: "#how" },
    { t: "Product", href: "#product" },
    { t: "Pricing", href: "#pricing" },
    { t: "Loop", href: siteLink("/loop") },
  ];
  return (
    <header className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-5 sm:px-10">
      <a href="#top" className="flex items-center gap-3">
        <img src={logo} alt="Rhea Health" className="h-9 w-auto" />
      </a>
      <nav className="hidden items-center gap-8 lg:flex">
        {links.map((l) => (
          <a
            key={l.t}
            href={l.href}
            className="text-[14.5px] font-medium text-[#1A2A22]/70 transition-colors hover:text-[#1A2A22]"
          >
            {l.t}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <a
          href={appLink("/signin")}
          className="hidden text-[14.5px] font-medium text-[#1A2A22]/80 hover:text-[#1A2A22] sm:block"
        >
          Sign in
        </a>
        <a
          href="#demo"
          className="inline-flex h-11 items-center rounded-full px-6 text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
          style={{ backgroundColor: DEEP }}
        >
          Book a demo
        </a>
      </div>
    </header>
  );
}

/* ------------------------------ HERO -------------------------------- */

function NoteMock({ className = "" }: { className?: string }) {
  const rows: [string, string][] = [
    ["S", "Sleeping better since the new routine. Knee pain down to 2 out of 10."],
    ["O", "Vitals stable. Knee: full range of motion, mild tenderness medially."],
    ["A", "Osteoarthritis of the knee, improving on current plan."],
    ["P", "Continue current plan. Patient instructions drafted. Review in 6 weeks."],
  ];
  return (
    <div
      className={`rounded-[20px] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(18,75,50,0.35)] ring-1 ring-black/8 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[14px] font-semibold" style={{ color: INK }}>
          Visit note
        </p>
        <AiChip />
      </div>
      <p className="mt-1 text-[12.5px] text-black/50">Follow-up visit · 24 min · Draft ready</p>
      <div className="mt-4 space-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <span
              className="serif mt-[1px] w-4 shrink-0 text-[13px] italic"
              style={{ color: GREEN }}
            >
              {k}
            </span>
            <p className="text-[13px] leading-relaxed text-black/65">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
        <span className="text-[12px] text-black/45">Nothing files until you sign</span>
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold text-white"
          style={{ backgroundColor: GREEN }}
        >
          <PenLine size={13} /> Review and sign
        </span>
      </div>
    </div>
  );
}

function ConceptHero() {
  return (
    <section id="top" className="mx-auto max-w-[1440px] px-6 pb-24 pt-12 sm:px-10 lg:pt-16">
      <Rise>
        <div className="flex flex-col items-center text-center">
          <p
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium ring-1 ring-black/8"
            style={{ color: INK }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN }} />
            The AI-native clinical platform
          </p>
          <h1
            className="serif mt-8 max-w-[20ch] text-[clamp(2.7rem,5.4vw,4.6rem)] leading-[1.04]"
            style={{ color: INK }}
          >
            More time with patients. <em style={{ color: DEEP }}>Less time documenting.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-[17.5px] leading-relaxed text-black/60">
            Rhea listens to the visit, drafts the note, triages the inbox and keeps care moving
            between appointments, so your clinicians finish on time and your patients get their
            doctor back.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="#demo"
              className="inline-flex h-[52px] items-center rounded-full px-8 text-[15px] font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
              style={{ backgroundColor: DEEP }}
            >
              Book a demo
            </a>
            <a
              href="#how"
              className="inline-flex h-[52px] items-center rounded-full border border-black/20 px-8 text-[15px] font-semibold transition-colors hover:bg-black hover:text-white"
              style={{ color: INK }}
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-[13px] uppercase tracking-[0.16em] text-black/40">
            For solo practices, groups and health systems
          </p>
        </div>
      </Rise>

      <Rise delay={140}>
        <div className="relative mt-14">
          <div className="overflow-hidden rounded-[28px] ring-1 ring-black/10">
            <video
              className="aspect-[16/9] max-h-[780px] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={heroPoster}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <NoteMock className="absolute -bottom-10 right-8 hidden w-[380px] lg:block" />
          <div className="absolute bottom-6 left-8 hidden items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-[12.5px] font-medium text-white backdrop-blur md:inline-flex">
            <Mic size={13} /> Listening with patient consent
          </div>
        </div>
        <NoteMock className="mt-6 lg:hidden" />
      </Rise>
    </section>
  );
}

/* ---------------------------- STATS --------------------------------- */

function StatsBand() {
  const stats = [
    {
      n: "49.2%",
      label: "of the office day is spent on EHR and desk work",
      src: "Sinsky et al., Annals of Internal Medicine, 2016",
    },
    {
      n: "27%",
      label: "of the day is spent in direct face time with patients",
      src: "Sinsky et al., Annals of Internal Medicine, 2016",
    },
    {
      n: "51.9% → 38.8%",
      label: "clinician burnout before and after 30 days with an ambient scribe",
      src: "JAMA Network Open, 2025",
    },
  ];
  return (
    <section style={{ backgroundColor: DEEP }} className="text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20">
        <Rise>
          <Eyebrow tone="gold">Why Rhea exists</Eyebrow>
          <h2 className="serif mt-4 max-w-[26ch] text-[clamp(1.7rem,3vw,2.5rem)] leading-snug">
            The paperwork was never the job. It just took the job over.
          </h2>
        </Rise>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {stats.map((s, i) => (
            <Rise key={s.label} delay={i * 90}>
              <p className="serif text-[clamp(2rem,3.6vw,3rem)] leading-none">{s.n}</p>
              <p className="mt-4 max-w-[30ch] text-[15.5px] leading-relaxed text-white/75">
                {s.label}
              </p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-white/40">{s.src}</p>
            </Rise>
          ))}
        </div>
        <p className="mt-12 text-[12.5px] text-white/40">
          Independent research on documentation burden and ambient AI scribes, cited here because it
          is the problem Rhea is built to solve. Rhea did not conduct these studies.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- HOW IT WORKS ----------------------------- */

function HowItWorks() {
  const steps = [
    {
      icon: Mic,
      n: "01",
      title: "Listen",
      body: "With the patient's consent, Rhea captures the conversation: in the room with a Rhea device, or on the go from the app. No typing, no templates, no one talking to a screen.",
    },
    {
      icon: FileText,
      n: "02",
      title: "Draft",
      body: "Within moments the visit becomes a structured note in your format, with the assessment, plan and patient instructions drafted alongside it.",
    },
    {
      icon: PenLine,
      n: "03",
      title: "Review and sign",
      body: "The clinician stays the author. Read it, adjust anything, sign. Most notes close the same hour as the visit, not the same evening.",
    },
    {
      icon: HeartPulse,
      n: "04",
      title: "Stay in the loop",
      body: "Messages, follow-ups and, when patients choose it, Loop trends between visits keep the whole practice working from the same picture.",
    },
  ];
  return (
    <section id="how" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Rise>
          <div className="lg:sticky lg:top-10">
            <Eyebrow>How Rhea works</Eyebrow>
            <h2
              className="serif mt-5 text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08]"
              style={{ color: INK }}
            >
              From conversation to signed note, in four steps.
            </h2>
            <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-black/60">
              Nothing about the visit changes. Your clinicians talk to their patients the way they
              always have. Rhea does the writing, the sorting and the chasing.
            </p>
            <a
              href="#demo"
              className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold underline decoration-black/25 underline-offset-4"
              style={{ color: DEEP }}
            >
              Watch it on your own visits <ArrowRight size={15} />
            </a>
          </div>
        </Rise>
        <div>
          {steps.map((s, i) => (
            <Rise key={s.n} delay={i * 70}>
              <div className="flex gap-6 border-t border-black/10 py-9 first:border-t-0 first:pt-0 sm:gap-10">
                <span className="serif text-[15px] italic" style={{ color: GOLD }}>
                  {s.n}
                </span>
                <div>
                  <h3
                    className="flex items-center gap-3 text-[21px] font-semibold"
                    style={{ color: INK }}
                  >
                    <s.icon size={19} style={{ color: GREEN }} /> {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-black/60">
                    {s.body}
                  </p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- NOTE STORY ------------------------------ */

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-3.5">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[15.5px] text-black/70">
          <span
            className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: GREEN }}
          >
            <Check size={12} strokeWidth={3} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

function NoteStory() {
  return (
    <section id="product" className="bg-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-2">
        <Rise>
          <div className="overflow-hidden rounded-[28px]">
            <img
              src={imgConsult}
              alt="A clinician listening to her patient"
              loading="lazy"
              className="h-[54vh] max-h-[540px] w-full object-cover"
            />
          </div>
        </Rise>
        <Rise delay={100}>
          <Eyebrow>Ambient scribe</Eyebrow>
          <h2
            className="serif mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1]"
            style={{ color: INK }}
          >
            The note writes itself. <em style={{ color: DEEP }}>You stay the author.</em>
          </h2>
          <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-black/60">
            Rhea turns the conversation into a complete, structured draft before you have left the
            room. You read it the way you would read a good resident's note: quickly, and with final
            say on every line.
          </p>
          <CheckList
            items={[
              "Structured SOAP notes, in your practice's format",
              "Assessment, plan and patient instructions drafted too",
              "Nothing is final, or filed, until a clinician signs it",
            ]}
          />
        </Rise>
      </div>
    </section>
  );
}

/* --------------------------- INBOX STORY ----------------------------- */

function InboxMock() {
  const rows = [
    {
      init: "MR",
      name: "M. Rivera",
      text: "Lab results question, wants to know if she should adjust her dose",
      tag: "Needs reply",
      tagCls: "bg-[#FDEBD3] text-[#8A5A12]",
      ai: true,
    },
    {
      init: "JT",
      name: "J. Thompson",
      text: "Refill request for the prescription from his last visit",
      tag: "Draft ready",
      tagCls: "bg-[#E9EFE7] text-[#2F6B4F]",
      ai: true,
    },
    {
      init: "AK",
      name: "A. Khan",
      text: "Rescheduling Thursday's appointment to next week",
      tag: "Front desk",
      tagCls: "bg-black/6 text-black/55",
      ai: false,
    },
  ];
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(18,75,50,0.30)] ring-1 ring-black/8 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2.5 text-[15px] font-semibold" style={{ color: INK }}>
          <MessagesSquare size={17} style={{ color: GREEN }} /> Practice inbox
        </p>
        <span className="rounded-full bg-black/6 px-3 py-1 text-[12px] font-medium text-black/55">
          3 need attention
        </span>
      </div>
      <div className="mt-5 divide-y divide-black/7">
        {rows.map((r) => (
          <div key={r.name} className="flex items-start gap-4 py-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12.5px] font-semibold text-white"
              style={{ backgroundColor: GREEN }}
            >
              {r.init}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold"
                style={{ color: INK }}
              >
                {r.name}
                {r.ai && <Sparkles size={13} style={{ color: GOLD }} />}
              </p>
              <p className="mt-0.5 text-[13.5px] leading-relaxed text-black/55">{r.text}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-[11.5px] font-semibold ${r.tagCls}`}
            >
              {r.tag}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-black/8 pt-4 text-[12.5px] leading-relaxed text-black/45">
        Patient mail reaches the inbox only when it matches a patient on file, and replies are
        drafted for your team to approve, never sent on their own.
      </p>
    </div>
  );
}

function InboxStory() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-2">
      <Rise>
        <Eyebrow>Practice inbox</Eyebrow>
        <h2
          className="serif mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1]"
          style={{ color: INK }}
        >
          The inbox that <em style={{ color: DEEP }}>triages itself.</em>
        </h2>
        <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-black/60">
          Patient messages land in one shared inbox, matched to the right chart and sorted by what
          they actually need. Your team opens a reply that is already drafted, not a blank box.
        </p>
        <CheckList
          items={[
            "Every message matched to the patient's chart automatically",
            "Sorted by urgency and assigned across the team",
            "Replies drafted and ready: approve, edit, send",
          ]}
        />
      </Rise>
      <Rise delay={100}>
        <InboxMock />
      </Rise>
    </section>
  );
}

/* ---------------------------- LOOP STORY ----------------------------- */

function LoopStory() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-2">
        <Rise>
          <div className="overflow-hidden rounded-[28px]">
            <img
              src={imgActivity}
              alt="A patient out running, wearing Loop"
              loading="lazy"
              className="h-[54vh] max-h-[540px] w-full object-cover"
            />
          </div>
        </Rise>
        <Rise delay={100}>
          <Eyebrow>Between visits · Loop</Eyebrow>
          <h2
            className="serif mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1]"
            style={{ color: INK }}
          >
            Care does not stop <em style={{ color: DEEP }}>at the door.</em>
          </h2>
          <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-black/60">
            A visit is a snapshot. Loop, Rhea's wearable, follows sleep, activity and recovery
            between appointments, and shares the trend with you only when the patient chooses to. So
            the next visit starts from what has actually been happening.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {["Sleep trend", "Recovery", "Activity"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full bg-[#E9EFE7] px-4 py-2 text-[13px] font-medium"
                style={{ color: DEEP }}
              >
                <HeartPulse size={13} /> {t}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full bg-black/6 px-4 py-2 text-[13px] font-medium text-black/55">
              <ShieldCheck size={13} /> Shared by the patient, always opt-in
            </span>
          </div>
          <a
            href={siteLink("/loop")}
            className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold underline decoration-black/25 underline-offset-4"
            style={{ color: DEEP }}
          >
            Meet Loop <ArrowRight size={15} />
          </a>
        </Rise>
      </div>
    </section>
  );
}

/* --------------------------- DEVICE BAND ----------------------------- */

function DeviceBand() {
  const cols = [
    {
      title: "In the room",
      body: "A small Rhea device sits in the exam room and listens for the visit. No phone on the table, no laptop between you and the patient.",
    },
    {
      title: "On the go",
      body: "Rounding, home visits, telehealth: the Rhea app captures the conversation wherever care happens.",
    },
    {
      title: "Off by default",
      body: "Nothing records until the visit starts and the patient has agreed. Consent is the first step of every encounter, not a setting buried in a menu.",
    },
  ];
  return (
    <section style={{ backgroundColor: INK }} className="text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10">
        <Rise>
          <Eyebrow tone="gold">The device</Eyebrow>
          <h2 className="serif mt-5 max-w-[24ch] text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1]">
            A listener in every room, <em className="text-[#C9B083]">and nowhere else.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-white/65">
            Software alone still asks a clinician to press record. Rhea's hardware makes the visit
            itself the only thing anyone has to think about.
          </p>
        </Rise>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {cols.map((c, i) => (
            <Rise key={c.title} delay={i * 90}>
              <div className="border-t border-white/15 pt-7">
                <h3 className="text-[19px] font-semibold">{c.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/60">{c.body}</p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- WHOLE PRACTICE --------------------------- */

function WholePractice() {
  const cards = [
    {
      title: "For clinicians",
      items: [
        "Notes drafted before you leave the room",
        "A review queue that stays empty",
        "Your evenings, back",
      ],
    },
    {
      title: "For practice teams",
      items: [
        "One inbox for every patient message",
        "Scheduling, patients and follow-ups together",
        "Work shared across the whole team",
      ],
    },
    {
      title: "For health systems",
      items: [
        "Enterprise administration and roles",
        "Permissions and a full audit trail",
        "Every site on the same standard of care",
      ],
    },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10">
      <Rise>
        <div className="overflow-hidden rounded-[28px]">
          <img
            src={imgHospital}
            alt="Clinicians walking through a hospital atrium"
            loading="lazy"
            className="h-[58vh] max-h-[600px] min-h-[320px] w-full object-cover"
          />
        </div>
      </Rise>
      <Rise delay={80}>
        <div className="mt-16 flex flex-col items-center text-center">
          <Eyebrow>One platform</Eyebrow>
          <h2
            className="serif mt-5 max-w-[24ch] text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1]"
            style={{ color: INK }}
          >
            Built for the whole practice, <em style={{ color: DEEP }}>not just the visit.</em>
          </h2>
        </div>
      </Rise>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Rise key={c.title} delay={i * 90}>
            <div className="h-full rounded-[24px] bg-white p-8 ring-1 ring-black/8">
              <h3 className="text-[19px] font-semibold" style={{ color: INK }}>
                {c.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {c.items.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-black/65">
                    <Check
                      size={15}
                      strokeWidth={3}
                      className="mt-[3px] shrink-0"
                      style={{ color: GREEN }}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        ))}
      </div>
      <Rise delay={100}>
        <div className="mt-6 overflow-hidden rounded-[24px]">
          <img
            src={imgTeam}
            alt="A nurse and a doctor reviewing together"
            loading="lazy"
            className="h-[50vh] max-h-[520px] min-h-[300px] w-full object-cover"
          />
        </div>
      </Rise>
    </section>
  );
}

/* ----------------------------- PRICING ------------------------------- */

function PricingTeaser() {
  const plans = [
    {
      name: "Professional",
      price: "$199",
      unit: "/month",
      note: "For individual clinicians",
      items: [
        "Ambient scribe and structured notes",
        "Practice inbox",
        "Scheduling and patients",
        "Loop sharing, when patients opt in",
      ],
      featured: false,
    },
    {
      name: "Team",
      price: "$179",
      unit: "per clinician/month",
      note: "For practices and groups",
      items: [
        "Everything in Professional",
        "Shared team inbox and assignments",
        "Shared note templates",
        "Priority support",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      unit: "",
      note: "For health systems",
      items: [
        "Everything in Team",
        "Enterprise administration",
        "Roles, permissions and audit",
        "Dedicated rollout and support",
      ],
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10">
        <Rise>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2
              className="serif mt-5 max-w-[24ch] text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1]"
              style={{ color: INK }}
            >
              Priced like a colleague, <em style={{ color: DEEP }}>not a licence.</em>
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-black/60">
              One flat rate per clinician. Every plan includes the scribe, the inbox and the
              platform around them.
            </p>
          </div>
        </Rise>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Rise key={p.name} delay={i * 90}>
              <div
                className={`relative flex h-full flex-col rounded-[24px] p-8 ${
                  p.featured ? "text-white" : "bg-[#F6F4EE] ring-1 ring-black/8"
                }`}
                style={p.featured ? { backgroundColor: DEEP } : undefined}
              >
                {p.featured && (
                  <span
                    className="absolute -top-3 left-8 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A2A22]"
                    style={{ backgroundColor: GOLD }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="text-[16px] font-semibold">{p.name}</h3>
                <p className={`mt-1 text-[13px] ${p.featured ? "text-white/60" : "text-black/50"}`}>
                  {p.note}
                </p>
                <p className="serif mt-6 text-[40px] leading-none">
                  {p.price}
                  {p.unit && (
                    <span
                      className={`ml-2 align-middle font-sans text-[13px] ${p.featured ? "text-white/60" : "text-black/50"}`}
                    >
                      {p.unit}
                    </span>
                  )}
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.items.map((t) => (
                    <li
                      key={t}
                      className={`flex items-start gap-3 text-[14.5px] ${p.featured ? "text-white/85" : "text-black/70"}`}
                    >
                      <Check
                        size={15}
                        strokeWidth={3}
                        className="mt-[3px] shrink-0"
                        style={{ color: p.featured ? GOLD : GREEN }}
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          ))}
        </div>
        <Rise delay={120}>
          <p className="mt-10 text-center">
            <a
              href={siteLink("/pricing")}
              className="inline-flex items-center gap-2 text-[15px] font-semibold underline decoration-black/25 underline-offset-4"
              style={{ color: DEEP }}
            >
              See full pricing <ArrowRight size={15} />
            </a>
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ------------------------------- FAQ --------------------------------- */

const CONCEPT_FAQS = [
  [
    "Does Rhea replace our EHR?",
    "No. Rhea sits alongside the systems your practice already runs. Notes are drafted in Rhea, reviewed and signed by the clinician, and filed where your records live.",
  ],
  [
    "Who is the author of the note?",
    "Always the clinician. Rhea drafts, the clinician reads, edits and signs. Nothing is filed unsigned, and the draft history stays visible in the record.",
  ],
  [
    "How is patient consent handled?",
    "Visits are captured only with the patient's consent, and the practice controls when recording happens. A patient can ask for capture to pause at any point in the visit.",
  ],
  [
    "What is Loop, and do our patients need it?",
    "Loop is Rhea's optional wearable. It follows sleep, activity and recovery between visits, and shares trends with the care team only when the patient turns sharing on. Rhea works fully without it.",
  ],
  [
    "How does a practice get started?",
    "With a pilot: a few clinicians, a few rooms, a few weeks. Book a demo and we will map the rollout to how your practice actually works.",
  ],
];

function ConceptFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-[920px] px-6 py-24 sm:px-10">
      <Rise>
        <Eyebrow>Questions</Eyebrow>
        <h2
          className="serif mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1]"
          style={{ color: INK }}
        >
          Asked by every practice. <em style={{ color: DEEP }}>Answered plainly.</em>
        </h2>
      </Rise>
      <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
        {CONCEPT_FAQS.map(([q, a], i) => (
          <div key={q}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-[17.5px] font-medium" style={{ color: INK }}>
                {q}
              </span>
              <span className="shrink-0 text-[22px] leading-none text-black/40">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <p className="-mt-1 max-w-2xl pb-6 text-[15.5px] leading-relaxed text-black/60">
                {a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- FINAL CTA ------------------------------ */

function FinalCta() {
  return (
    <section id="demo" className="px-6 pb-24 sm:px-10">
      <Rise>
        <div
          className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] px-8 py-20 text-center text-white sm:px-14"
          style={{ backgroundColor: DEEP }}
        >
          <h2 className="serif mx-auto max-w-[22ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08]">
            Give your clinicians their <em className="text-[#C9B083]">evenings back.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/70">
            Start with a pilot in a few rooms and measure the hours yourself. If Rhea does not give
            time back, it does not stay.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={appLink("/signup")}
              className="inline-flex h-[52px] items-center rounded-full bg-white px-8 text-[15px] font-semibold transition-transform duration-300 hover:scale-[1.03]"
              style={{ color: DEEP }}
            >
              Start a pilot
            </a>
            <a
              href={siteLink("/pricing")}
              className="inline-flex h-[52px] items-center rounded-full border border-white/40 px-8 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-[#2F6B4F]"
            >
              See pricing
            </a>
          </div>
          <p className="mt-8 text-[12.5px] uppercase tracking-[0.16em] text-white/40">
            Pilots for practices, groups and health systems
          </p>
        </div>
      </Rise>
    </section>
  );
}

function ConceptFooter() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 px-6 py-10 sm:px-10">
        <img src={logo} alt="Rhea Health" className="h-8 w-auto" />
        <nav className="flex flex-wrap gap-7 text-[14px] font-medium text-black/60">
          <a href="#product" className="hover:text-black">
            Product
          </a>
          <a href="#how" className="hover:text-black">
            How it works
          </a>
          <a href={siteLink("/pricing")} className="hover:text-black">
            Pricing
          </a>
          <a href={siteLink("/loop")} className="hover:text-black">
            Loop
          </a>
          <a href={siteLink("/about")} className="hover:text-black">
            About
          </a>
        </nav>
        <p className="text-[12.5px] text-black/40">© 2026 Rhea Health · Sample homepage concept</p>
      </div>
    </footer>
  );
}
