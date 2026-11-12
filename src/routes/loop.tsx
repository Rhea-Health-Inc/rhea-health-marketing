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
      { title: "Rhea Loop - The wearable built around your baseline" },
      {
        name: "description",
        content:
          "Rhea Loop is a 24/7 wearable that turns everyday health signals into personal trends you can act on. Join the waitlist.",
      },
      { property: "og:title", content: "Rhea Loop - The wearable built around your baseline" },
      {
        property: "og:description",
        content:
          "Continuous health insights, designed around you. A minimal wearable built for day and night.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rhea Loop" },
      {
        name: "twitter:description",
        content: "Continuous health insights, designed around you.",
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
  variant = "light",
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

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

function LoopPage() {
  return (
    <div className="loop-root bg-white text-black antialiased overflow-x-hidden">
      <style>{`
        .loop-root { font-family: "Geist", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", sans-serif; }
        .loop-root h1,.loop-root h2,.loop-root h3 { letter-spacing: -0.035em; line-height: 1; font-weight: 500; }
        .loop-num { font-variant-numeric: tabular-nums; letter-spacing: -0.03em; }
        .loop-rail { scrollbar-width: none; }
        .loop-rail::-webkit-scrollbar { display: none; }
      `}</style>

      <Announcement />
      <TopNav />
      <Hero />
      <FreeTrialBand />
      <MetricRail />
      <Showcase />
      <Baseline />
      <Ecosystem />
      <CareTeam />
      <Quote />
      <Membership />
      <InBox />
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
      <span>Rhea Loop is coming. Reserve your place on the waitlist.</span>
      <a href="#waitlist" className="whitespace-nowrap underline underline-offset-4">
        Learn more
      </a>
    </div>
  );
}

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Health metrics", href: "#metrics" },
  { label: "Rhea App", href: "#app" },
  { label: "Rhea ID", href: "#ecosystem" },
  { label: "Membership", href: "#membership" },
  { label: "FAQ", href: "#faq" },
];

function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-6 px-6 sm:px-10">
        <a href="#top" className="shrink-0">
          <img src={logo} alt="Rhea Loop" className="h-8 w-auto invert sm:h-9" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors hover:text-white"
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
    <section id="top" className="relative h-[calc(100vh-68px)] min-h-[620px] w-full bg-black">
      <img
        src={imgHero}
        alt="Rhea Loop worn on a wrist"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 sm:px-10">
        <h1 className="max-w-[16ch] text-[clamp(2.8rem,7vw,6.5rem)] font-medium text-white">
          The wearable designed around your baseline
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white sm:text-[19px]">
          Rhea Loop turns 24/7 health signals into personal insight, so you can understand your
          sleep, movement and recovery in the context of you.
        </p>
        <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[13px] text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7FD8A4]" />
          <span className="whitespace-nowrap">Waitlist now open</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center px-6">
        <ButtonLink href="#waitlist" variant="light" size="lg">
          Join the waitlist
        </ButtonLink>
      </div>
    </section>
  );
}

function FreeTrialBand() {
  return (
    <section id="how" className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-6 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[26px] font-medium">Get started when Loop ships</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-black/60">
            Waitlist members get first access to Rhea Loop, the charging accessory and the Rhea App,
            with no commitment today.
          </p>
        </div>
        <ButtonLink href="#waitlist" variant="dark" className="shrink-0">
          Reserve your Loop
        </ButtonLink>
      </div>
    </section>
  );
}

/* -------------------------- METRIC RAIL ----------------------------- */

const TILES = [
  { img: imgSleep, title: "Get better sleep", body: "Duration, consistency and overnight trends." },
  { img: imgGym, title: "Understand your effort", body: "Heart-rate zones, intensity and load." },
  { img: imgMorning, title: "See your recovery", body: "HRV, resting heart rate and readiness." },
  { img: imgActivity, title: "Track everyday movement", body: "Steps, distance and energy use." },
  {
    img: imgWork,
    title: "Follow your heart signals",
    body: "Continuous heart rate, day and night.",
  },
  {
    img: imgEvening,
    title: "Watch long-term trends",
    body: "Weeks and months, not single readings.",
  },
];

function MetricRail() {
  return (
    <section id="metrics" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <h2 className="max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Know what your body needs, every day.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-black/60">
            With continuous monitoring across sleep, movement, stress and heart signals, Rhea Loop
            gives you a complete view of your health.
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

/* --------------------------- SHOWCASE -------------------------------- */

function Showcase() {
  const items = [
    {
      img: imgCharge,
      title: "Get 24/7 health insights",
      body: "Personalized insight on sleep, activity, recovery and heart signals.",
      tall: true,
    },
    {
      img: imgProduct,
      title: "Built to be worn continuously",
      body: "Minimal, light and comfortable enough to forget you have it on.",
    },
    {
      img: imgGym,
      title: "Measure every step and rep",
      body: "Understand how effort today affects how you feel tomorrow.",
    },
    {
      img: imgHero,
      title: "Made for real life",
      body: "Designed to fit your day without asking for your attention.",
    },
  ];
  return (
    <section id="app" className="bg-black py-20 text-white sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <h2 className="max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            The wearable for better health
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/65">
            A daily understanding of your body, and insight that compounds over time.
          </p>
          <ButtonLink href="#waitlist" variant="light" className="mt-8">
            Join the waitlist
          </ButtonLink>
        </Rise>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <Rise key={it.title} delay={i * 80}>
              <div className="group relative h-[52vh] min-h-[340px] overflow-hidden rounded-[28px]">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="max-w-[18ch] text-[24px] font-medium text-white">{it.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/75">
                    {it.body}
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

/* -------------------------- BASELINE -------------------------------- */

function Baseline() {
  const { ref, seen } = useInView<SVGSVGElement>(0.4);
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Rise>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#2F6B4F]">
            Personal baseline
          </p>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Your normal is personal.
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-black/60">
            Rhea learns your patterns over time, so a change is measured against you rather than a
            population average.
          </p>
          <ButtonLink href="#faq" variant="outlineDark" className="mt-8">
            How it works
          </ButtonLink>
        </Rise>

        <Rise delay={100}>
          <div className="rounded-[28px] bg-black p-8 text-white sm:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Resting heart rate
            </p>
            <p className="loop-num mt-3 text-[clamp(2.4rem,5vw,3.6rem)] font-medium">+8%</p>
            <p className="mt-1 text-[15px] text-white/60">above your usual range</p>

            <svg ref={ref} viewBox="0 0 600 200" className="mt-8 w-full">
              <path
                d="M0 140 C 80 130, 140 150, 220 138 S 360 128, 440 132 S 540 126, 600 130"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M0 145 C 90 138, 150 150, 230 142 S 370 150, 450 120 S 540 78, 600 66"
                fill="none"
                stroke="#7FD8A4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1200"
                strokeDashoffset={seen ? 0 : 1200}
                style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1)" }}
              />
            </svg>
            <p className="mt-6 text-[12px] uppercase tracking-[0.18em] text-white/35">
              Illustrative example only
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* -------------------------- ECOSYSTEM -------------------------------- */

const CHAIN = ["Rhea Loop", "Rhea App", "Rhea ID", "Health record", "Rhea AI", "Care team"];

function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-[#F5F5F3] py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <h2 className="max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            One device. One health identity.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-black/60">
            Rhea Loop collects the signals. The Rhea App makes them understandable. Your Rhea ID
            carries them with you, always under your control.
          </p>
        </Rise>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHAIN.map((c, i) => (
            <Rise key={c} delay={i * 60}>
              <div className="flex h-full items-center gap-4 rounded-2xl bg-white px-6 py-6 transition-transform duration-500 hover:scale-[1.02]">
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

function CareTeam() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Rise>
          <img
            src={imgMorning}
            alt="Rhea Loop worn during everyday life"
            loading="lazy"
            className="h-[54vh] w-full rounded-[28px] object-cover"
          />
        </Rise>
        <Rise delay={100}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#2F6B4F]">
            For your care team
          </p>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">
            Your doctor sees more than one moment.
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-black/60">
            A clinical visit is a snapshot. Your health happens every day. With your permission,
            Rhea can share meaningful long-term trends with participating providers.
          </p>
          <ul className="mt-8 space-y-3 text-[16px] text-black/70">
            <li>You choose who can access your information.</li>
            <li>You can disconnect a provider at any time.</li>
            <li>Access is always visible to you.</li>
          </ul>
        </Rise>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="bg-black py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1100px] px-6 text-center sm:px-10">
        <Rise>
          <h2 className="text-[clamp(1.9rem,4vw,3.2rem)] font-medium">
            “The value isn't a single number. It's finally seeing the pattern.”
          </h2>
          <p className="mt-8 text-[13px] uppercase tracking-[0.2em] text-white/50">
            Rhea Loop early access programme
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* -------------------------- MEMBERSHIP -------------------------------- */

function Membership() {
  return (
    <section id="membership" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <Rise>
          <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">Choose your Rhea Loop</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-black/60">
            One device, one membership. Pricing will be announced ahead of launch.
          </p>
        </Rise>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Rise>
            <div className="overflow-hidden rounded-[28px] bg-[#F5F5F3] p-8 sm:p-10">
              <img
                src={imgRender}
                alt="Rhea Loop product render"
                loading="lazy"
                className="mx-auto w-full max-w-xl"
              />
            </div>
          </Rise>
          <Rise delay={100}>
            <div className="flex h-full flex-col rounded-[28px] border border-black/10 p-8 sm:p-10">
              <h3 className="text-[24px] font-medium">Rhea Loop</h3>
              <p className="mt-2 text-[15px] text-black/55">Continuous health monitoring.</p>
              <ul className="mt-8 space-y-3 text-[16px] text-black/70">
                <li>Rhea Loop device</li>
                <li>Charging accessory</li>
                <li>Rhea App access</li>
                <li>Rhea ID integration</li>
              </ul>
              <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-black/45">
                Coming soon
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="#waitlist" variant="dark">
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

function InBox() {
  return (
    <section className="bg-[#F5F5F3] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Rise>
          <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">What's in the box</h2>
          <ul className="mt-8 space-y-4 text-[17px] text-black/70">
            <li>Rhea Loop</li>
            <li>Band</li>
            <li>Charging accessory</li>
            <li>Quick start guide</li>
          </ul>
          <p className="mt-8 text-[13px] text-black/45">
            Final contents will be confirmed closer to launch.
          </p>
        </Rise>
        <Rise delay={100}>
          <img
            src={imgBox}
            alt="Rhea Loop, band, charging accessory and quick start guide"
            loading="lazy"
            className="h-[52vh] w-full rounded-[28px] object-cover"
          />
        </Rise>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ------------------------------------ */

const FAQS = [
  [
    "What is Rhea Loop?",
    "A minimal wearable that continuously measures everyday health and wellness signals and pairs with the Rhea App.",
  ],
  [
    "What does Rhea Loop track?",
    "Heart rate, heart-rate variability, respiratory rate, blood oxygen, skin temperature, movement, activity and sleep.",
  ],
  [
    "Does Rhea Loop diagnose medical conditions?",
    "No. Rhea Loop is a health and wellness monitoring device, not a diagnostic device.",
  ],
  [
    "What is a Rhea ID?",
    "A persistent health identity that lets your information move with you across the Rhea ecosystem.",
  ],
  [
    "Can my doctor see my Rhea Loop data?",
    "Only if you connect with a participating provider and authorize access. You can disconnect at any time.",
  ],
  ["How long does the battery last?", "Battery specifications will be confirmed ahead of launch."],
  ["Is Rhea Loop waterproof?", "Water-resistance ratings will be confirmed ahead of launch."],
  [
    "Does it work with iPhone and Android?",
    "The Rhea App is planned for both iOS and Android at launch.",
  ],
  [
    "Can I use Rhea Loop without a Rhea provider?",
    "Yes. Connecting with a healthcare provider is entirely optional.",
  ],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <Rise>
          <h2 className="text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium">Questions, answered</h2>
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
    <section id="waitlist" className="relative h-[80vh] min-h-[520px] w-full bg-black">
      <img
        src={imgProduct}
        alt="Close-up of the Rhea Loop sensor module"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/40" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col items-center justify-center px-6 text-center sm:px-10">
        <h2 className="max-w-[20ch] text-[clamp(2.2rem,5.5vw,4.4rem)] font-medium text-white">
          Know your health. Wherever life takes you.
        </h2>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/80">
          Rhea Loop gives you a clearer view of your health today, and the foundation for a more
          connected healthcare experience tomorrow.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="#waitlist" variant="light" size="lg">
            Join the waitlist
          </ButtonLink>
          <ButtonLink href="#app" variant="outlineLight" size="lg">
            Explore Rhea App
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function LoopFooter() {
  const topLinks = (labels: string[]) => labels.map((label) => ({ label, href: "#top" }));
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    { title: "Rhea Loop", links: topLinks(["Rhea Loop", "Health metrics", "Rhea App", "Rhea ID"]) },
    { title: "Learn", links: topLinks(["How it works", "For your care team", "Privacy", "FAQ"]) },
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
    <footer className="bg-black py-16 text-white">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <img src={logo} alt="Rhea Loop" className="h-6 w-auto self-start invert opacity-80" />
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {c.title}
              </p>
              <ul className="mt-4 space-y-3 text-[15px] text-white/75">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-14 text-[13px] text-white/40">
          Rhea Loop is a health and wellness monitoring device. It is not intended to diagnose,
          treat or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
