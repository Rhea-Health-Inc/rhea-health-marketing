import { Logo } from "@/components/clinik/Nav";
import { siteLink } from "@/lib/app-url";

export function Footer() {
  const cols: { h: string; l: { t: string; href: string }[] }[] = [
    {
      h: "Product",
      l: [
        { t: "AI Scribe", href: "#" },
        { t: "Messaging", href: "#" },
        { t: "Portable ID", href: "#" },
        { t: "Dashboard", href: "#" },
        { t: "Integrations", href: "#" },
        { t: "Rhea Loop", href: "/loop" },
      ],
    },
    {
      h: "Rhea Loop",
      l: [
        { t: "Rhea Loop", href: "/loop" },
        { t: "Rhea App", href: "/loop#ecosystem" },
        { t: "Rhea ID", href: "/loop#rhea-id" },
        { t: "Health Metrics", href: "/loop#signals" },
        { t: "For Patients", href: "/loop#care-team" },
        { t: "Privacy", href: "/loop#privacy" },
        { t: "FAQ", href: "/loop#faq" },
      ],
    },
    {
      h: "Company",
      l: [
        { t: "About", href: "/about" },
        { t: "Careers", href: "#" },
        { t: "Press", href: "#" },
        { t: "Contact", href: "#" },
      ],
    },
    {
      h: "Resources",
      l: [
        { t: "Docs", href: "#" },
        { t: "Security", href: "#" },
        { t: "Trust center", href: "#" },
        { t: "Changelog", href: "#" },
      ],
    },
    {
      h: "Legal",
      l: [
        { t: "Privacy", href: "#" },
        { t: "Terms", href: "#" },
        { t: "BAA", href: "#" },
        { t: "HIPAA", href: "#" },
      ],
    },
  ];
  return (
    <footer className="border-t border-border/70 py-20">
      <div className="container-clinik">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-12">
          <div className="col-span-2">
            <div className="flex items-center mb-5">
              <Logo height={36} />
            </div>
            <p className="text-[15px] leading-[1.7] text-foreground max-w-xs">
              The AI-native clinical platform giving hospitals their time back.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4">
                {c.h}
              </div>
              <ul className="space-y-3 text-[15px]">
                {c.l.map((x) => (
                  <li key={x.t}>
                    <a
                      href={x.href.startsWith("/") ? siteLink(x.href) : x.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {x.t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-border/70 flex flex-wrap items-center justify-between gap-4 text-[13px] font-medium text-muted-foreground">
          <div>© {new Date().getFullYear()} Rhea, Inc. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span>HIPAA Ready</span>
            <span>SOC 2 (in progress)</span>
            <span>GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
