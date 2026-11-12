import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { siteLink } from "@/lib/app-url";
import logo from "@/assets/loop-logo.png";
import imgRender from "@/assets/loop-render.jpg";
import imgMorning from "@/assets/loop-morning.jpg";
import imgWork from "@/assets/loop-work.jpg";
import imgGym from "@/assets/loop-gym.jpg";
import imgEvening from "@/assets/loop-evening.jpg";
import imgSleep from "@/assets/loop-sleep.jpg";
import imgHero from "@/assets/loop-hero.jpg";
import imgCharge from "@/assets/loop-charge.jpg";
import imgProduct from "@/assets/loop-product.jpg";
import imgActivity from "@/assets/loop-activity.jpg";
import imgBox from "@/assets/loop-box.jpg";

export const Route = createFileRoute("/loop")({
  head: () => ({
    meta: [
      { title: "Loop — the wearable that keeps you and your doctor in the loop" },
      {
        name: "description",
        content:
          "Loop is a light, screen-free wearable that tracks sleep, activity and recovery — and, only with your permission, shares trends with your care team. Join the waitlist.",
      },
      { property: "og:title", content: "Loop — by Rhea Health" },
      {
        property: "og:description",
        content:
          "A screen-free wearable for sleep, activity and recovery — and a closer connection to your care team, on your terms.",
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
    accent: "bg-[#2F6B4F] text-white",
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
        tone === "green" ? "text-[#2F6B4F]" : "text-white/60"
      }`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

function LoopPage() {
  return (
    <div className="loop-root bg-[#FAF9F6] text-black antialiased overflow-x-hidden">
      <style>{`
        .loop-root { font-family: "Geist", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", sans-serif; }
        .loop-root h1,.loop-root h2,.loop-root h3 { letter-spacing: -0.035em; line-height: 1.02; font-weight: 500; }
        .loop-num { font-variant-numeric: tabular-nums; letter-spacing: -0.03em; }
        .loop-rail { scrollbar-width: none; }
        .loop-rail::-webkit-scrollbar { display: none; }
      `}</style>

      <Announcement />
      <TopNav />
      <Hero />
      <WaitlistBand />
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
    <div className="flex w-full items-center justify-center gap-3 bg-[#2F6B4F] px-6 py-2.5 text-center text-[13px] text-white">
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
          <img src={logo} alt="Loop" className="h-8 w-auto sm:h-9" />
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

function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 pb-20 pt-14 sm:px-10 lg:grid-cols-2 lg:pb-28 lg:pt-20">
        <Rise>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] text-black/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F6B4F]" />
            Loop · a wearable by Rhea Health
          </div>
          <h1 className="mt-7 max-w-[12ch] text-[clamp(2.9rem,6vw,5.6rem)] font-medium">
            Your health, in the loop.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-black/60 sm:text-[19px]">
            Loop is a light, screen-free band that follows your sleep, activity and recovery around
            the clock — and, only when you choose, keeps your doctor in the loop between visits.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
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
        </Rise>

        <Rise delay={120}>
          <div className="relative">
            <div className="overflow-hidden rounded-[32px] bg-[#EFEDE8]">
              <img
                src={imgRender}
                alt="The Loop band"
                className="h-full max-h-[560px] w-full object-cover"
              />
            </div>
            <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-5 py-4 shadow-[0_12px_32px_rgba(16,24,20,0.10)] backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
                Last night
              </p>
              <p className="loop-num mt-1 text-[22px] font-medium">Sleep 7 h 42 min</p>
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2.5 rounded-full bg-[#173F2C] py-2.5 pl-3.5 pr-5 text-white shadow-[0_12px_32px_rgba(16,24,20,0.22)]">
              <span className="h-2 w-2 rounded-full bg-[#7FD8A4]" />
              <span className="text-[13px] font-medium">Shared with your care team · On</span>
            </div>
          </div>
          <p className="mt-3 text-right text-[12px] text-black/35">
            Illustrative app data. Sharing is always opt-in.
          </p>
        </Rise>
      </div>
    </section>
  );
}

function WaitlistBand() {
  return (
    <section id="how" className="border-y border-black/8 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-6 px-6 py-12 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[26px] font-medium">Be first in line when Loop ships</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-black/60">
            Waitlist members get first access to Loop, its charging accessory and the Rhea App —
            with no commitment today.
          </p>
        </div>
        <ButtonLink href="#waitlist" variant="dark" className="shrink-0">
          Reserve yours
        </ButtonLink>
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
      title: "A clearer read on your body",
      body: "Train, sleep and recover with the full picture: how hard you worked, how well you rested, and whether you're ready to go again — without a screen asking for your attention.",
      link: "See what Loop tracks",
      href: "#metrics",
    },
    {
      img: imgMorning,
      alt: "Starting the day with Loop",
      eyebrow: "For your care team",
      title: "So a visit isn't the whole story",
      body: "An appointment is a snapshot; your health is everything in between. When you connect Loop to your clinician, they can follow the trends that matter between visits — and you decide exactly what they see.",
      link: "How sharing works",
      href: "#sharing",
    },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>One band, two jobs</Eyebrow>
          <h2 className="mt-5 max-w-[22ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Made for your day — and for the people who care for you.
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
                  <h3 className="mt-4 text-[26px] font-medium">{c.title}</h3>
                  <p className="mt-3 flex-1 text-[16px] leading-relaxed text-black/60">{c.body}</p>
                  <a
                    href={c.href}
                    className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#2F6B4F]"
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
    body: "Heart-rate zones and training load — from runs to reps.",
  },
  {
    img: imgMorning,
    title: "Recovery & readiness",
    body: "HRV and resting heart rate, read against your own baseline.",
  },
  {
    img: imgWork,
    title: "Heart, around the clock",
    body: "Continuous heart rate, day and night — not just at the clinic.",
  },
  {
    img: imgEvening,
    title: "Trends, not snapshots",
    body: "Weeks and months of context behind every number.",
  },
];

function MetricRail() {
  return (
    <section id="metrics" className="bg-white py-20 sm:py-28">
      <span id="signals" className="block h-0 scroll-mt-24" aria-hidden />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>What Loop tracks</Eyebrow>
          <h2 className="mt-5 max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            The signals that shape your day.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-black/60">
            Loop quietly follows the measures that say the most about how you&apos;re doing — then
            shows you what changed, and what it might mean.
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
      body: "Your data lives in your Rhea App, under your Rhea ID. It is yours first — Loop works fully on its own.",
    },
    {
      n: "02",
      title: "Choose your clinician",
      body: "Connect a participating doctor or clinic, and pick exactly which trends they can see. Nothing is shared before you say so.",
    },
    {
      n: "03",
      title: "They see the trend, not the noise",
      body: "Your care team follows sleep, activity and recovery patterns between visits, so appointments start from what's actually been happening.",
    },
  ];
  const rows: { label: string; state: string; on: boolean }[] = [
    { label: "Sleep trends", state: "Shared", on: true },
    { label: "Activity & recovery", state: "Shared", on: true },
    { label: "Heart trends", state: "Shared", on: true },
    { label: "Location", state: "Never shared", on: false },
  ];
  return (
    <section id="sharing" className="bg-[#173F2C] py-20 text-white sm:py-28">
      <span id="care-team" className="block h-0 scroll-mt-24" aria-hidden />
      <span id="privacy" className="block h-0 scroll-mt-24" aria-hidden />
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 sm:px-10 lg:grid-cols-2">
        <Rise>
          <Eyebrow tone="white">Sharing, on your terms</Eyebrow>
          <h2 className="mt-5 max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Keep your doctor in the loop — only if you want them there.
          </h2>
          <div className="mt-12 space-y-10">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="loop-num text-[14px] font-semibold text-[#7FD8A4]">{s.n}</span>
                <div>
                  <h3 className="text-[20px] font-medium">{s.title}</h3>
                  <p className="mt-2 max-w-md text-[16px] leading-relaxed text-white/65">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-12 space-y-3 text-[16px] text-white/80">
            <li>Sharing is always opt-in — never on by default.</li>
            <li>Pause or disconnect a clinician at any time.</li>
            <li>You can always see exactly who has access.</li>
          </ul>
        </Rise>

        <Rise delay={120}>
          <div className="rounded-[28px] bg-white p-8 text-black shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-10">
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
                      r.on ? "bg-[#2F6B4F]/10 text-[#2F6B4F]" : "bg-black/5 text-black/45"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${r.on ? "bg-[#2F6B4F]" : "bg-black/30"}`}
                    />
                    {r.state}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] leading-relaxed text-black/50">
              An illustration of the controls you&apos;ll have. Change or revoke access whenever you
              like — it takes effect immediately.
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
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Rise>
          <Eyebrow>Your baseline</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Normal is personal.
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-black/60">
            Loop learns what&apos;s usual for you — your resting heart rate, your HRV, your sleep —
            so a change is measured against you, not against everyone. And when something drifts,
            you see it early, in plain language.
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
            <p className="loop-num mt-3 text-[clamp(2.4rem,5vw,3.6rem)] font-medium">+8%</p>
            <p className="mt-1 text-[15px] text-black/55">above your usual range</p>

            <svg ref={ref} viewBox="0 0 600 200" className="mt-8 w-full">
              <path
                d="M0 140 C 80 130, 140 150, 220 138 S 360 128, 440 132 S 540 126, 600 130"
                fill="none"
                stroke="rgba(23,63,44,0.14)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M0 145 C 90 138, 150 150, 230 142 S 370 150, 450 120 S 540 78, 600 66"
                fill="none"
                stroke="#2F6B4F"
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

const CHAIN = ["Loop", "Rhea App", "Rhea ID", "Health record", "Rhea AI", "Care team"];

function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-[#F5F5F3] py-20 sm:py-28">
      <span id="rhea-id" className="block h-0 scroll-mt-24" aria-hidden />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>Part of Rhea</Eyebrow>
          <h2 className="mt-5 max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            One band, connected to your care.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-black/60">
            Loop collects the signals. The Rhea App makes sense of them. Your Rhea ID carries them
            with you — and your care team sees them only with your permission.
          </p>
        </Rise>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHAIN.map((c, i) => (
            <Rise key={c} delay={i * 60}>
              <div className="flex h-full items-center gap-4 rounded-2xl bg-white px-6 py-6 ring-1 ring-black/5 transition-transform duration-500 hover:scale-[1.02]">
                <span className="loop-num text-[13px] font-semibold text-[#2F6B4F]">
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
    <section id="box" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Rise>
          <Eyebrow>In the box</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Everything you need, nothing you don&apos;t
          </h2>
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
    <section id="membership" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>Get Loop</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            One band. One membership.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-black/60">
            Everything is included — the band, the app and care-team sharing. Pricing will be
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
    "Most trackers stop at your phone. Loop can also — with your explicit permission — share long-term trends with your doctor through Rhea, so your care team can follow along between visits. Sharing is optional, and always under your control.",
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
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <Rise>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Questions, answered
          </h2>
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#173F2C]/90 via-[#173F2C]/60 to-[#173F2C]/20" />
        <div className="relative z-10 flex min-h-[480px] flex-col justify-center px-8 py-20 sm:px-14">
          <h2 className="max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium text-white">
            Stay in the loop.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/80">
            Join the waitlist for first access to Loop — for your own health, and for the people who
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
          <img src={logo} alt="Loop" className="h-6 w-auto self-start opacity-80" />
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
