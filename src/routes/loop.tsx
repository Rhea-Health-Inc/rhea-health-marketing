import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Moon, Zap, HeartPulse } from "lucide-react";

import { siteLink } from "@/lib/app-url";
import imgMorning from "@/assets/loop-morning.jpg";
import imgWork from "@/assets/loop-work.jpg";
import imgGym from "@/assets/loop-gym.jpg";
import imgSleep from "@/assets/loop-sleep.jpg";
import imgHero from "@/assets/loop-hero.jpg";
import imgCharge from "@/assets/loop-charge.jpg";
import imgProduct from "@/assets/loop-product.jpg";
import imgActivity from "@/assets/loop-activity.jpg";
import imgBox from "@/assets/loop-box.jpg";

export const Route = createFileRoute("/loop")({
  head: () => ({
    meta: [
      { title: "Loop: the wearable that keeps you and your doctor in the loop" },
      {
        name: "description",
        content:
          "Loop is a light, screen-free wearable that tracks sleep, activity and recovery, and, only with your permission, shares trends with your care team. Join the waitlist.",
      },
      { property: "og:title", content: "Loop by Rhea Health" },
      {
        property: "og:description",
        content:
          "A screen-free wearable for sleep, activity and recovery, and a closer connection to your care team, on your terms.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Loop" },
      {
        name: "twitter:description",
        content: "Your health, in the loop. A screen-free wearable by Rhea Health.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: LoopPage,
});

/* ------------------------------------------------------------------ */
/* hooks + primitives                                                  */
/* ------------------------------------------------------------------ */

function useInView<T extends Element>(threshold = 0.2) {
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
  const { ref, seen } = useInView<HTMLDivElement>(0.15);
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

const BTN_BASE =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform duration-300 hover:scale-[1.03]";

function ButtonLink({
  href,
  children,
  variant = "dark",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "accent" | "outlineLight" | "outlineDark";
  size?: "md" | "lg";
  className?: string;
}) {
  const variants: Record<string, string> = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    accent: "bg-black text-white",
    outlineLight: "border border-white/45 text-white hover:bg-white hover:text-black",
    outlineDark: "border border-black/25 text-black hover:bg-black hover:text-white",
  };
  const sizes = { md: "h-11 px-7", lg: "h-14 px-10 text-[14px]" };
  return (
    <a href={href} className={`${BTN_BASE} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </a>
  );
}

function Eyebrow({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "white" }) {
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${
        tone === "green" ? "text-black/45" : "text-white/60"
      }`}
    >
      {children}
    </p>
  );
}

const H2 = "text-[clamp(1.85rem,3.2vw,2.75rem)] font-medium";

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

function LoopPage() {
  return (
    <div className="loop-root bg-[#FAF9F6] text-black antialiased overflow-x-hidden">
      <style>{`
        .loop-root { font-family: "Geist", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", sans-serif; }
        .loop-root h1,.loop-root h2,.loop-root h3 { letter-spacing: -0.035em; line-height: 1.05; font-weight: 500; }
        .loop-num { font-variant-numeric: tabular-nums; letter-spacing: -0.03em; }
        .loop-rail { scrollbar-width: none; }
        .loop-rail::-webkit-scrollbar { display: none; }
      `}</style>

      <Announcement />
      <TopNav />
      <Hero />
      <Scores />
      <TwoPaths />
      <MetricRail />
      <Sharing />
      <Baseline />
      <Ecosystem />
      <InBox />
      <GetLoop />
      <Faq />
      <ClosingCta />
      <LoopFooter />
    </div>
  );
}

/* --------------------------- CHROME -------------------------------- */

function Announcement() {
  return (
    <div className="flex w-full items-center justify-center gap-3 bg-black px-6 py-2.5 text-center text-[13px] text-white">
      <span>Loop is coming soon. Join the waitlist for first access.</span>
      <a href="#waitlist" className="whitespace-nowrap underline underline-offset-4">
        Join the waitlist
      </a>
    </div>
  );
}

const NAV = [
  { label: "Overview", href: "#top" },
  { label: "What it tracks", href: "#metrics" },
  { label: "Sharing", href: "#sharing" },
  { label: "In the box", href: "#box" },
  { label: "FAQ", href: "#faq" },
];

function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/8 bg-[#FAF9F6]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-6 px-6 sm:px-10">
        <a href="#top" className="shrink-0">
          <span className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-black">
            Loop
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.14em] text-black/60 transition-colors hover:text-black"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <ButtonLink href="#waitlist" variant="accent" className="shrink-0">
          Join waitlist
        </ButtonLink>
      </div>
    </header>
  );
}

/* ---------------------------- HERO --------------------------------- */

const SIGNALS = [
  { label: "Sleep", dot: "#8B7CF6" },
  { label: "Activity", dot: "#F59E0B" },
  { label: "Heart rate", dot: "#F26076" },
  { label: "HRV", dot: "#4FA3E3" },
  { label: "Blood oxygen", dot: "#38B6C9" },
  { label: "Skin temperature", dot: "#F08A4B" },
  { label: "Respiratory rate", dot: "#6C7BE0" },
  { label: "Recovery", dot: "#E56AA8" },
];

function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-14 sm:px-10 lg:pb-20 lg:pt-20">
        <Rise>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] text-black/70">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              Loop · a wearable by Rhea Health
            </div>
            <h1 className="mt-7 max-w-[16ch] text-[clamp(2.6rem,4.6vw,4rem)] font-medium">
              Your health, in the loop.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-black/60 sm:text-[19px]">
              Loop is a light, screen-free band that tracks your sleep, activity and recovery around
              the clock, and turns it into simple scores you can actually use. Push when your body
              says go, rest when it says recover, and only when you choose, keep your doctor in the
              loop between visits.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="#waitlist" variant="accent" size="lg">
                Join the waitlist
              </ButtonLink>
              <ButtonLink href="#sharing" variant="outlineDark" size="lg">
                How sharing works
              </ButtonLink>
            </div>
            <p className="mt-8 text-[13px] uppercase tracking-[0.16em] text-black/40">
              Screen-free · Worn day and night · iOS &amp; Android
            </p>
          </div>
        </Rise>

        <Rise delay={140}>
          <div className="mt-14 overflow-hidden rounded-[32px] bg-[#EFEDE8] ring-1 ring-black/5">
            <img
              src={imgActivity}
              alt="Out for a run with Loop on her wrist"
              className="h-[46vh] max-h-[560px] min-h-[320px] w-full object-cover"
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {SIGNALS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-medium text-black/75 ring-1 ring-black/8"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.dot }} />
                {s.label}
              </span>
            ))}
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ---------------------------- SCORES -------------------------------- */

const SCORES = [
  {
    icon: Moon,
    tint: "bg-[#F1EAFB]",
    title: "Sleep score",
    body: "How well you slept, in one number: duration, timing, stages, and how consistent you have been lately.",
  },
  {
    icon: Zap,
    tint: "bg-[#FDEBD3]",
    title: "Readiness",
    body: "Your green light, or your rest day. Sleep, HRV and resting heart rate read together each morning, so you know whether to push or take it easy.",
  },
  {
    icon: HeartPulse,
    tint: "bg-[#E0EDFB]",
    title: "Recovery",
    body: "How your body is bouncing back from effort, stress and short nights, and whether a trend is worth a closer look.",
  },
];

function Scores() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Every morning</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Wake up knowing.</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-black/60">
              No charts to decode before coffee. Loop turns a night and a day of signals into three
              plain scores, and tells you what to do with them.
            </p>
          </div>
        </Rise>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {SCORES.map((s, i) => (
            <Rise key={s.title} delay={i * 90}>
              <div
                className={`flex h-full flex-col rounded-[28px] p-8 transition-transform duration-500 hover:scale-[1.02] sm:p-9 ${s.tint}`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-black ring-1 ring-black/5">
                  <s.icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 text-[22px] font-medium">{s.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-black/65">{s.body}</p>
              </div>
            </Rise>
          ))}
        </div>
        <Rise delay={120}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[16.5px] leading-relaxed text-black/65">
            The same scores power your care, too. Share them with your clinician and your next visit
            starts from how you have actually been doing.{" "}
            <a
              href="#sharing"
              className="whitespace-nowrap font-medium text-black underline decoration-black/30 underline-offset-4"
            >
              See how sharing works <span aria-hidden>→</span>
            </a>
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* --------------------------- TWO PATHS ------------------------------ */

function TwoPaths() {
  const cards = [
    {
      img: imgGym,
      alt: "Training with Loop",
      eyebrow: "For your everyday",
      title: "Know your body, day to day",
      body: "Train, sleep and recover with the full picture: how hard you worked, how well you rested, and whether you are ready to go again. No screen, no buzzing, nothing asking for your attention.",
      link: "See what Loop tracks",
      href: "#metrics",
    },
    {
      img: imgMorning,
      alt: "Starting the day with Loop",
      eyebrow: "For your care team",
      title: "So a visit is not the whole story",
      body: "An appointment is a snapshot; your health is everything in between. Connect Loop to your clinician and they can follow the trends that matter between visits, and you decide exactly what they see.",
      link: "How sharing works",
      href: "#sharing",
    },
  ];
  return (
    <section id="how" className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>One band, two jobs</Eyebrow>
          <h2 className={`mt-5 max-w-[24ch] ${H2}`}>
            Made for your day, and for the people who care for you.
          </h2>
        </Rise>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Rise key={c.eyebrow} delay={i * 90}>
              <div className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-black/8">
                <div className="overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="h-[300px] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8 sm:p-10">
                  <Eyebrow>{c.eyebrow}</Eyebrow>
                  <h3 className="mt-4 text-[24px] font-medium">{c.title}</h3>
                  <p className="mt-3 flex-1 text-[16px] leading-relaxed text-black/60">{c.body}</p>
                  <a
                    href={c.href}
                    className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-black underline decoration-black/30 underline-offset-4"
                  >
                    {c.link} <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- METRIC RAIL ----------------------------- */

const TILES = [
  {
    img: imgSleep,
    title: "Sleep, properly understood",
    body: "Duration, timing, consistency and overnight breathing trends.",
  },
  {
    img: imgActivity,
    title: "Activity & movement",
    body: "Steps, distance, active minutes and everyday energy.",
  },
  {
    img: imgGym,
    title: "Workouts & effort",
    body: "Heart-rate zones and training load, from runs to reps.",
  },
  {
    img: imgMorning,
    title: "Recovery & readiness",
    body: "HRV and resting heart rate, read against your own baseline.",
  },
  {
    img: imgWork,
    title: "Heart, around the clock",
    body: "Continuous heart rate, day and night, not just at the clinic.",
  },
];

function MetricRail() {
  return (
    <section id="metrics" className="bg-white py-20 sm:py-24">
      <span id="signals" className="block h-0 scroll-mt-24" aria-hidden />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>What Loop tracks</Eyebrow>
          <h2 className={`mt-5 max-w-[22ch] ${H2}`}>The signals that shape your day.</h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-black/60">
            Loop quietly follows the measures that say the most about how you are doing, then shows
            you what changed, and what it might mean.
          </p>
        </Rise>

        <div className="loop-rail -mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10">
          {TILES.map((t, i) => (
            <Rise
              key={t.title}
              delay={i * 60}
              className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]"
            >
              <div className="overflow-hidden rounded-[24px] bg-black/[0.04]">
                <img
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                  className="h-[46vh] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.05]"
                />
              </div>
              <h3 className="mt-5 text-[20px] font-medium">{t.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-black/55">{t.body}</p>
            </Rise>
          ))}
          <Rise delay={300} className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]">
            <div className="flex h-[46vh] flex-col justify-between rounded-[24px] bg-black p-8">
              <p className="text-[26px] font-medium leading-snug text-white">
                Trends, not snapshots.
              </p>
              <p className="text-[15px] leading-relaxed text-white/65">
                Weeks and months of context behind every number, so a good week and a bad night both
                land in perspective.
              </p>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- SHARING -------------------------------- */

function Sharing() {
  const steps = [
    {
      n: "01",
      title: "Wear Loop",
      body: "Your data lives in your Rhea App, under your Rhea ID. It is yours first, and Loop works fully on its own.",
    },
    {
      n: "02",
      title: "Choose your clinician",
      body: "Connect a participating doctor or clinic, and pick exactly which trends they can see. Nothing is shared before you say so.",
    },
    {
      n: "03",
      title: "They see the trend, not the noise",
      body: "Your care team follows your sleep, activity and recovery patterns between visits, so appointments start from what has actually been happening, not from memory.",
    },
  ];
  const rows: { label: string; state: string; on: boolean }[] = [
    { label: "Sleep trends", state: "Shared", on: true },
    { label: "Activity & recovery", state: "Shared", on: true },
    { label: "Heart trends", state: "Shared", on: true },
    { label: "Location", state: "Never shared", on: false },
  ];
  return (
    <section id="sharing" className="bg-[#F5F5F3] py-20 sm:py-24">
      <span id="care-team" className="block h-0 scroll-mt-24" aria-hidden />
      <span id="privacy" className="block h-0 scroll-mt-24" aria-hidden />
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 sm:px-10 lg:grid-cols-2">
        <Rise>
          <Eyebrow>Sharing, on your terms</Eyebrow>
          <h2 className={`mt-5 max-w-[20ch] ${H2}`}>
            A checkup is a snapshot. Loop is the whole story.
          </h2>
          <div className="mt-12 space-y-10">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="loop-num text-[14px] font-semibold text-black/40">{s.n}</span>
                <div>
                  <h3 className="text-[20px] font-medium">{s.title}</h3>
                  <p className="mt-2 max-w-md text-[16px] leading-relaxed text-black/60">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-12 space-y-3 text-[16px] text-black/70">
            <li>Sharing is always opt-in, never on by default.</li>
            <li>Pause or disconnect a clinician at any time.</li>
            <li>You can always see exactly who has access.</li>
          </ul>
        </Rise>

        <Rise delay={120}>
          <div className="rounded-[28px] bg-white p-8 text-black ring-1 ring-black/10 sm:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-black/45">
              Sharing with
            </p>
            <p className="mt-3 text-[22px] font-medium">Your connected clinician</p>
            <p className="mt-1 text-[15px] text-black/55">Via Rhea · connected by you</p>
            <div className="mt-8 divide-y divide-black/8">
              {rows.map((r) => (
                <div key={r.label} className="flex items-center justify-between py-4">
                  <span className="text-[16px]">{r.label}</span>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                      r.on ? "bg-black text-white" : "bg-black/5 text-black/45"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${r.on ? "bg-white" : "bg-black/30"}`}
                    />
                    {r.state}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] leading-relaxed text-black/50">
              An illustration of the controls you will have. Change or revoke access whenever you
              like, it takes effect immediately.
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* -------------------------- BASELINE -------------------------------- */

function Baseline() {
  const { ref, seen } = useInView<SVGSVGElement>(0.4);
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Rise>
          <Eyebrow>Your baseline</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Normal is personal.</h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-black/60">
            Loop learns what is usual for you: your resting heart rate, your HRV, your sleep. So a
            change is measured against you, not against everyone. And when something drifts, you see
            it early, in plain language.
          </p>
          <ButtonLink href="#faq" variant="outlineDark" className="mt-8">
            Questions
          </ButtonLink>
        </Rise>

        <Rise delay={100}>
          <div className="rounded-[28px] border border-black/8 bg-white p-8 sm:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-black/45">
              Resting heart rate
            </p>
            <p className="loop-num mt-3 text-[clamp(2.2rem,4.4vw,3.2rem)] font-medium">+8%</p>
            <p className="mt-1 text-[15px] text-black/55">above your usual range</p>

            <svg ref={ref} viewBox="0 0 600 200" className="mt-8 w-full">
              <path
                d="M0 140 C 80 130, 140 150, 220 138 S 360 128, 440 132 S 540 126, 600 130"
                fill="none"
                stroke="rgba(0,0,0,0.10)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M0 145 C 90 138, 150 150, 230 142 S 370 150, 450 120 S 540 78, 600 66"
                fill="none"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1200"
                strokeDashoffset={seen ? 0 : 1200}
                style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1)" }}
              />
            </svg>
            <p className="mt-6 text-[12px] uppercase tracking-[0.18em] text-black/35">
              Illustrative example only
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* -------------------------- ECOSYSTEM -------------------------------- */

const CHAIN = ["Loop", "Rhea App", "Rhea ID", "Health record", "Insights", "Care team"];

function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-[#F5F5F3] py-20 sm:py-24">
      <span id="rhea-id" className="block h-0 scroll-mt-24" aria-hidden />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>Part of Rhea</Eyebrow>
          <h2 className={`mt-5 max-w-[22ch] ${H2}`}>One band, connected to your care.</h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-black/60">
            Loop collects the signals. The Rhea App makes sense of them. Your Rhea ID carries them
            with you, and your care team sees them only with your permission.
          </p>
        </Rise>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHAIN.map((c, i) => (
            <Rise key={c} delay={i * 60}>
              <div className="flex h-full items-center gap-4 rounded-2xl bg-white px-6 py-6 ring-1 ring-black/5 transition-transform duration-500 hover:scale-[1.02]">
                <span className="loop-num text-[13px] font-semibold text-black/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-[18px] font-medium">{c}</span>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- IN THE BOX ----------------------------- */

function InBox() {
  return (
    <section id="box" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Rise>
          <Eyebrow>In the box</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Everything you need, nothing you don&apos;t</h2>
          <ul className="mt-8 space-y-4 text-[17px] text-black/70">
            <li>Loop band</li>
            <li>Charging accessory</li>
            <li>Quick start guide</li>
          </ul>
          <p className="mt-8 text-[13px] text-black/45">
            Final contents will be confirmed closer to launch.
          </p>
        </Rise>
        <Rise delay={100}>
          <div className="grid grid-cols-2 gap-5">
            <img
              src={imgBox}
              alt="Loop, band, charging accessory and quick start guide"
              loading="lazy"
              className="h-[52vh] w-full rounded-[28px] object-cover"
            />
            <img
              src={imgCharge}
              alt="Loop on its charging accessory"
              loading="lazy"
              className="mt-10 h-[52vh] w-full rounded-[28px] object-cover"
            />
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ---------------------------- GET LOOP ------------------------------- */

function GetLoop() {
  return (
    <section id="membership" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>Get Loop</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>One band. One membership.</h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-black/60">
            Everything is included: the band, the app and care-team sharing. Pricing will be
            announced ahead of launch, and the waitlist hears first.
          </p>
        </Rise>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Rise>
            <div className="h-full overflow-hidden rounded-[28px]">
              <img
                src={imgProduct}
                alt="Close-up of the Loop sensor module"
                loading="lazy"
                className="h-full min-h-[340px] w-full object-cover"
              />
            </div>
          </Rise>
          <Rise delay={100}>
            <div className="flex h-full flex-col rounded-[28px] border border-black/10 p-8 sm:p-10">
              <h3 className="text-[24px] font-medium">Loop</h3>
              <p className="mt-2 text-[15px] text-black/55">
                Continuous health and fitness monitoring, day and night.
              </p>
              <ul className="mt-8 space-y-3 text-[16px] text-black/70">
                <li>Loop device and band</li>
                <li>Charging accessory</li>
                <li>Rhea App access</li>
                <li>Care-team sharing (always opt-in)</li>
                <li>Rhea ID integration</li>
              </ul>
              <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-black/45">
                Coming soon
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="#waitlist" variant="accent">
                  Join the waitlist
                </ButtonLink>
                <ButtonLink href="#faq" variant="outlineDark">
                  Learn more
                </ButtonLink>
              </div>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ------------------------------------ */

const FAQS = [
  [
    "What is Loop?",
    "A light, screen-free wearable from Rhea Health that continuously follows everyday health and wellness signals, and pairs with the Rhea App.",
  ],
  [
    "What does Loop track?",
    "Heart rate, heart-rate variability, respiratory rate, blood oxygen, skin temperature, movement, activity and sleep.",
  ],
  [
    "How is Loop different from a regular fitness tracker?",
    "Most trackers stop at your phone. Loop can also share long-term trends with your doctor through Rhea, with your explicit permission, so your care team can follow along between visits. Sharing is optional, and always under your control.",
  ],
  [
    "Does my doctor see everything?",
    "No. You choose which clinician can see your information and which trends they can see. You can pause or disconnect sharing at any time, and you can always see exactly who has access.",
  ],
  [
    "Do I need a Rhea doctor to use Loop?",
    "No. Loop works on its own as a fitness and wellness wearable. Connecting a care team is entirely optional.",
  ],
  [
    "Does Loop diagnose medical conditions?",
    "No. Loop is a health and wellness monitoring device, not a diagnostic device.",
  ],
  [
    "What is a Rhea ID?",
    "A persistent health identity that lets your information move with you across the Rhea ecosystem.",
  ],
  ["How long does the battery last?", "Battery specifications will be confirmed ahead of launch."],
  ["Is Loop waterproof?", "Water-resistance ratings will be confirmed ahead of launch."],
  [
    "Does it work with iPhone and Android?",
    "The Rhea App is planned for both iOS and Android at launch.",
  ],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Questions, answered</h2>
        </Rise>
        <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {FAQS.map(([q, a], i) => (
            <div key={q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[18px] font-medium">{q}</span>
                <span className="shrink-0 text-[22px] leading-none text-black/40">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <p className="-mt-1 max-w-2xl pb-6 text-[16px] leading-relaxed text-black/60">
                  {a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- CLOSING CTA ------------------------------ */

function ClosingCta() {
  return (
    <section id="waitlist" className="px-6 pb-24 sm:px-10">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[32px]">
        <img
          src={imgHero}
          alt="Loop worn on a wrist"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="relative z-10 flex min-h-[480px] flex-col justify-center px-8 py-20 sm:px-14">
          <h2 className="max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium text-white">
            Stay in the loop.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/80">
            Join the waitlist for first access to Loop, for your own health, and for the people who
            look after it.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#waitlist" variant="light" size="lg">
              Join the waitlist
            </ButtonLink>
            <ButtonLink href="#sharing" variant="outlineLight" size="lg">
              How sharing works
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FOOTER --------------------------------- */

function LoopFooter() {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Loop",
      links: [
        { label: "Loop", href: "#top" },
        { label: "Health metrics", href: "#metrics" },
        { label: "Rhea App", href: "#ecosystem" },
        { label: "Rhea ID", href: "#rhea-id" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Sharing & privacy", href: "#sharing" },
        { label: "For your care team", href: "#sharing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Rhea Health",
      links: [
        { label: "Home", href: siteLink("/") },
        { label: "Platform", href: siteLink("/#product") },
        { label: "Solutions", href: siteLink("/#scribe") },
        { label: "Pricing", href: siteLink("/pricing") },
        { label: "Company", href: siteLink("/about") },
      ],
    },
  ];
  return (
    <footer className="bg-[#F5F5F3] py-16 text-black">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <span className="self-start text-[26px] font-semibold leading-none tracking-[-0.02em] text-black">
            Loop
          </span>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-black/45">
                {c.title}
              </p>
              <ul className="mt-4 space-y-3 text-[15px] text-black/70">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition-colors hover:text-black">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-14 text-[13px] text-black/40">
          Loop is a health and wellness monitoring device. It is not intended to diagnose, treat or
          prevent any disease.
        </p>
      </div>
    </footer>
  );
}
