import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "How it Works", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/70 py-12 px-4 md:px-6">
    <div className="container-max">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-primary-foreground"
          >
            <Sparkles className="w-5 h-5" />
            Eatly
          </Link>
          <p className="text-sm leading-relaxed">
            AI-powered menu intelligence. Eat smarter everywhere you go.
          </p>
        </div>

        {/* Links */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm hover:text-primary-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs">© 2026 Eatly. All rights reserved.</p>
        <div className="flex gap-4">
          {["Twitter", "LinkedIn", "Instagram"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-xs hover:text-primary-foreground transition-colors"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
