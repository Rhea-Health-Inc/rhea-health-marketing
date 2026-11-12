import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/rhea-logo.png";
import { appLink, siteLink } from "@/lib/app-url";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/70">
      <div className="container-clinik flex items-center justify-between h-16">
        <Link to="/" className="flex items-center" aria-label="Rhea home">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href={siteLink("/#product")} className="hover:text-foreground transition-colors">
            Platform
          </a>
          <a href={siteLink("/#scribe")} className="hover:text-foreground transition-colors">
            Solutions
          </a>
          <Link
            to="/pricing"
            className="hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground" }}
          >
            Pricing
          </Link>
          <a href={siteLink("/#security")} className="hover:text-foreground transition-colors">
            Technology
          </a>
          <Link
            to="/about"
            className="hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground" }}
          >
            Company
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={appLink("/signin")}
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 py-2"
          >
            Sign in
          </a>
          <a
            href={appLink("/signin")}
            className="inline-flex items-center h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Request demo
          </a>
        </div>
      </div>
    </header>
  );
}

export function Logo({ className = "", height = 36 }: { className?: string; height?: number }) {
  return (
    <img
      src={logoUrl}
      alt="Rhea Health"
      height={height}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}
