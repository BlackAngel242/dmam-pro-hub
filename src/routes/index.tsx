import type * as React from "react";
import { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  UserPlus,
  ArrowUpRight,
  LifeBuoy,
  Download as InstallIcon,
  ShieldCheck,
  Gauge,
  Mail,
  Phone,
  CalendarClock,
  ShoppingBag,
  BookOpen,
  Lightbulb,
} from "lucide-react";

import {
  openVCard,
  whatsappLink,
  mailtoLink,
  telLink,
  siteUrl,
  isContactFieldConfigured,
  VCARD_DATA,
} from "@/lib/vcard";
import {
  visibleProjects,
  projectsByCategory,
  safeProjectWebsiteUrl,
  projectActionLabel,
  type Project,
} from "@/lib/projects";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
      <path d="M13.5 21v-7.5H16l.5-3.5h-3V7.75c0-1 .3-1.75 1.8-1.75H16.7V3.15c-.3 0-1.4-.15-2.6-.15-2.6 0-4.35 1.6-4.35 4.5V10H7v3.5h2.75V21h3.75z" />
    </svg>
  );
}
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adonaï MOUZITA — Support IT & solutions numériques · DMAMPRO" },
      {
        name: "description",
        content:
          "Assistance à distance, installation, désinfection, optimisation et conseil informatique. Le hub personnel d'Adonaï MOUZITA (DMAMPRO).",
      },
      { property: "og:title", content: "Adonaï MOUZITA — DMAMPRO" },
      {
        property: "og:description",
        content:
          "Support IT, produits numériques et conseils pratiques. Décrivez votre problème, avançons vers une solution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type MissionKey = "aide" | "install" | "secure" | "optim";

const missions: {
  key: MissionKey;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  message: string;
}[] = [
  {
    key: "aide",
    icon: LifeBuoy,
    title: "Obtenir de l'aide",
    desc: "Décrivez votre problème et avançons vers une solution claire.",
    message:
      "Bonjour Adonaï, j'ai besoin d'aide sur un problème informatique. Voici la situation :",
  },
  {
    key: "install",
    icon: InstallIcon,
    title: "Installer ou configurer",
    desc: "Logiciels, pilotes, périphériques et réglages.",
    message:
      "Bonjour Adonaï, j'ai besoin d'aide pour installer ou configurer un logiciel/périphérique. Détails :",
  },
  {
    key: "secure",
    icon: ShieldCheck,
    title: "Désinfecter et sécuriser",
    desc: "Détection des menaces, nettoyage et protection.",
    message:
      "Bonjour Adonaï, je pense que mon appareil est infecté ou peu sécurisé. Voici ce que j'observe :",
  },
  {
    key: "optim",
    icon: Gauge,
    title: "Optimiser mon appareil",
    desc: "Performances, espace disponible et stabilité.",
    message: "Bonjour Adonaï, mon appareil est lent / instable. J'aimerais l'optimiser. Contexte :",
  },
];

const servicesGroups: { heading: string; items: string[] }[] = [
  {
    heading: "Support & assistance",
    items: ["Assistance à distance", "Diagnostic de problèmes", "Conseil informatique"],
  },
  {
    heading: "Installation & entretien",
    items: [
      "Installation et configuration",
      "Désinfection et sécurisation",
      "Optimisation des performances",
    ],
  },
  {
    heading: "Offre commerciale",
    items: ["Vente de services IT", "Produits numériques dématérialisés"],
  },
];

const NAV_ITEMS = [
  { href: "#mission", label: "Assistance" },
  { href: "#services", label: "Services" },
  { href: "#drshop", label: "DrShop" },
  { href: "#projets", label: "Projets" },
  { href: "#notes", label: "Notes" },
  { href: "#contact", label: "Contact" },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark min-w-0">
      <span aria-hidden className="brand-glyph">
        <span>D</span>
        <span className="brand-glyph-accent">M</span>
      </span>
      <span className="flex flex-col leading-tight min-w-0">
        <span className="brand-word truncate">DMAMPRO</span>
        {!compact && <span className="brand-sub truncate hidden sm:inline">Atelier réseau</span>}
      </span>
    </span>
  );
}

function WhatsAppCTA({
  message,
  label,
  className,
}: {
  message?: string;
  label: React.ReactNode;
  className?: string;
}) {
  const href = whatsappLink(message);
  const base = "btn-primary hover:[background:var(--color-primary-pressed)] " + (className ?? "");
  if (!href) {
    return (
      <button
        type="button"
        aria-disabled="true"
        disabled
        title="WhatsApp bientôt disponible — coordonnée non configurée."
        className={base + " opacity-60 cursor-not-allowed"}
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        WhatsApp bientôt disponible
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={base}>
      <MessageCircle className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}

function Index() {
  const [mission, setMission] = useState<MissionKey>("aide");
  const current = missions.find((m) => m.key === mission)!;
  const missionListRef = useRef<HTMLDivElement>(null);

  const waHref = whatsappLink();
  const mailHref = mailtoLink();
  const telHref = telLink();
  const planHref = whatsappLink(
    "Bonjour Adonaï, j'aimerais planifier un créneau pour une intervention.",
  );
  const canonicalSite = siteUrl();
  const githubConfigured = isContactFieldConfigured(VCARD_DATA.github);
  const facebookConfigured = isContactFieldConfigured(VCARD_DATA.facebook);

  const personal = projectsByCategory("personal");
  const contributions = projectsByCategory("contribution");
  const commercial = projectsByCategory("commercial");
  const featured = visibleProjects().find((p: Project) => p.featured && p.visibility === "public");
  const featuredHref = featured ? safeProjectWebsiteUrl(featured) : null;
  const otherCommercial = commercial.filter((p) => !(featured && p.id === featured.id));

  return (
    <>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--background)]/85 border-b border-border">
        <div className="container-hub grid grid-cols-[auto_minmax(0,1fr)_auto] items-center h-16 gap-4">
          <a href="#top" className="flex items-center min-w-0">
            <BrandMark />
          </a>
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center justify-center gap-1 text-sm text-muted-foreground"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 justify-end">
            <span className="hidden md:inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-support" aria-hidden />
              Assistance à distance
            </span>
            <WhatsAppCTA label="WhatsApp" className="text-sm !py-2 !px-3 !min-h-0" />
          </div>
        </div>
        {/* Mobile nav */}
        <nav aria-label="Sections du site" className="lg:hidden border-t border-border">
          <div className="container-hub">
            <ul className="mobile-nav-scroll">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="shrink-0">
                  <a
                    href={item.href}
                    className="inline-flex items-center min-h-11 px-3 rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:bg-panel transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <div id="top" />

        {/* ============== HERO — poste d'intervention ============== */}
        <section aria-label="Poste d'intervention" className="relative border-b border-border">
          <div className="container-hub py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] gap-6 lg:gap-0 items-stretch">
              {/* IDENTITÉ */}
              <div className="relative lg:pr-10">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-5 lg:gap-6 h-full items-stretch">
                  {/* PORTRAIT */}
                  <div className="relative bg-[color:var(--surface)] aspect-[3/4] sm:aspect-auto sm:min-h-[360px] lg:min-h-[520px] overflow-hidden">
                    <img
                      src="/assets/adonai.png"
                      alt="Portrait d'Adonaï MOUZITA, informaticien spécialisé en support IT"
                      width={720}
                      height={900}
                      decoding="async"
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span
                      aria-hidden
                      className="hidden lg:block absolute -bottom-3 -right-3 h-6 w-6 border-r-2 border-b-2 border-primary"
                    />
                  </div>
                  {/* IDENTITÉ TEXTE */}
                  <div className="flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                      <span className="h-1.5 w-6 bg-primary shrink-0" aria-hidden />
                      Adonaï MOUZITA
                    </div>
                    <h1 className="display-xl text-foreground">
                      Je remets vos outils numériques en état de marche.
                    </h1>
                    <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground max-w-[38ch]">
                      Informaticien spécialisé en support IT — assistance à distance, installation,
                      désinfection, optimisation et conseil.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-2">
                      <a
                        href="#mission"
                        className="btn-primary hover:[background:var(--color-primary-pressed)]"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden />
                        Décrire mon problème
                      </a>
                      <button
                        type="button"
                        onClick={openVCard}
                        className="btn-ghost hover:bg-panel"
                      >
                        <UserPlus className="h-4 w-4" aria-hidden />
                        Ajouter aux contacts
                      </button>
                    </div>
                  </div>
                </div>
                {/* rail vertical de jonction desktop */}
                <span
                  aria-hidden
                  className="hidden lg:block absolute right-0 top-4 bottom-4 rail-v"
                />
              </div>

              {/* MODULE MISSION — tableau d'intervention */}
              <section
                id="mission"
                aria-labelledby="mission-title"
                className="relative bg-[color:var(--surface)] lg:ml-0 -mx-5 sm:mx-0 lg:-mr-5"
              >
                <div className="p-5 sm:p-7 lg:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-primary font-semibold">
                      Poste d'intervention
                    </span>
                    <span className="flex-1 rail-h" aria-hidden />
                  </div>
                  <h2
                    id="mission-title"
                    className="mt-1 text-3xl sm:text-[2rem] lg:text-[2.25rem] font-bold leading-[1.1]"
                  >
                    Que puis-je résoudre pour vous&nbsp;?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-[52ch]">
                    Sélectionnez la mission qui correspond à votre besoin, puis ouvrez la
                    discussion.
                  </p>

                  <div
                    ref={missionListRef}
                    role="radiogroup"
                    aria-label="Choix de mission"
                    className="mt-5 border-t border-border"
                  >
                    {missions.map((m, idx) => {
                      const active = m.key === mission;
                      return (
                        <button
                          key={m.key}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          tabIndex={active ? 0 : -1}
                          onKeyDown={(e) => {
                            if (
                              e.key === "ArrowRight" ||
                              e.key === "ArrowDown" ||
                              e.key === "ArrowLeft" ||
                              e.key === "ArrowUp"
                            ) {
                              e.preventDefault();
                              const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
                              const nextIdx = (idx + dir + missions.length) % missions.length;
                              setMission(missions[nextIdx].key);
                              const target =
                                missionListRef.current?.querySelectorAll<HTMLButtonElement>(
                                  '[role="radio"]',
                                )[nextIdx];
                              target?.focus();
                            }
                          }}
                          onClick={() => setMission(m.key)}
                          className={[
                            "command-row border-b border-border",
                            active ? "command-row-active" : "hover:command-row-hover",
                          ].join(" ")}
                        >
                          <span
                            className={["command-icon", active ? "command-icon-active" : ""].join(
                              " ",
                            )}
                            aria-hidden
                          >
                            <m.icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[15px] font-semibold text-foreground">
                              {m.title}
                            </span>
                            <span className="block text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {m.desc}
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className={[
                              "text-xs font-mono tabular-nums shrink-0 transition-colors",
                              active ? "text-primary" : "text-muted-foreground/50",
                            ].join(" ")}
                          >
                            0{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground max-w-[38ch]">
                      {waHref
                        ? "Le bouton ouvre WhatsApp avec un message adapté à la mission choisie."
                        : "WhatsApp sera activé dès que le numéro sera renseigné."}
                    </p>
                    <WhatsAppCTA message={current.message} label={<>Ouvrir WhatsApp</>} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* ============== PARCOURS ============== */}
        <section className="container-hub py-14 lg:py-16">
          <div className="max-w-2xl">
            <span className="text-[11px] tracking-[0.18em] uppercase text-support font-semibold">
              Parcours d'assistance
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
              De la demande à la résolution, quatre étapes reliées.
            </h2>
          </div>

          <ol className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            {/* ligne de progression */}
            <span
              aria-hidden
              className="hidden lg:block absolute left-0 right-0 top-[10px] h-px bg-border"
            />
            {[
              { n: "01", t: "Décrire", d: "Vous exposez la situation via WhatsApp." },
              { n: "02", t: "Diagnostiquer", d: "J'identifie la cause et le périmètre." },
              { n: "03", t: "Intervenir", d: "Assistance distante, installation ou nettoyage." },
              { n: "04", t: "Stabiliser", d: "Optimisation, conseils et suivi." },
            ].map((s) => (
              <li key={s.n} className="relative min-w-0">
                <span
                  aria-hidden
                  className="relative z-10 grid h-5 w-5 place-items-center rounded-full bg-background border border-primary"
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <div className="mt-3 text-xs font-mono tabular-nums text-primary tracking-widest">
                  {s.n}
                </div>
                <div className="mt-1 text-lg font-semibold text-foreground">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-[28ch]">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ============== SERVICES ============== */}
        <section
          id="services"
          className="container-hub pb-14 lg:pb-16 border-t border-border pt-14 lg:pt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 lg:gap-14 items-start">
            <div>
              <span className="text-[11px] tracking-[0.18em] uppercase text-support font-semibold">
                Prestations
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">Ce que je prends en charge.</h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-[38ch]">
                Un cadre clair, décliné en trois familles. Chaque prestation s'ouvre sur une
                conversation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {servicesGroups.map((g) => (
                <div key={g.heading} className="min-w-0">
                  <div className="text-xs font-semibold text-foreground tracking-wide pb-2 border-b border-border">
                    {g.heading}
                  </div>
                  <ul className="mt-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="py-2 text-sm text-muted-foreground border-b border-border/60 last:border-b-0"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== DRSHOP — bandeau large 70/30 ============== */}
        {featured && featuredHref && (
          <section id="drshop" className="container-hub pb-16">
            <a
              href={featuredHref}
              target="_blank"
              rel="noreferrer"
              className="group block bg-[color:var(--panel)] border border-border hover:border-primary transition-colors"
              aria-label={`${projectActionLabel(featured)} — ${featured.title}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,70fr)_minmax(0,30fr)]">
                <div className="p-6 sm:p-10 lg:p-12 min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-1.5 w-8 bg-primary" aria-hidden />
                    <span className="text-[11px] tracking-[0.18em] uppercase text-primary font-semibold">
                      À la une
                    </span>
                    <span className="chip">{featured.status}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] font-bold">
                    {featured.title}
                    <span className="block text-muted-foreground font-normal text-lg sm:text-xl mt-2">
                      {featured.summary}
                    </span>
                  </h2>
                  <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    {projectActionLabel(featured)}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-[color:var(--surface)] border-l border-border p-8">
                  <div className="grid h-28 w-28 place-items-center rounded-full border border-primary/40 text-primary">
                    <ShoppingBag className="h-10 w-10" aria-hidden />
                  </div>
                </div>
              </div>
            </a>
          </section>
        )}

        {/* ============== REGISTRE DES PROJETS ============== */}
        <section id="projets" className="container-hub py-14 lg:py-16 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-8">
            <div className="min-w-0">
              <span className="text-[11px] tracking-[0.18em] uppercase text-support font-semibold">
                Registre
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                Projets, aperçus et contributions.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-[52ch]">
                Un index tenu à la main. Les entrées publiques sont actionnables, les aperçus
                restent volontairement discrets.
              </p>
            </div>
          </div>

          <ProjectRegister
            groups={[
              { label: "Personnels", projects: personal },
              { label: "Contributions", projects: contributions },
              {
                label: "Commerciaux",
                projects: otherCommercial,
                hint: featured ? "DrShop est mis en avant plus haut." : undefined,
              },
            ]}
          />
        </section>

        {/* ============== NOTES + DRSMOKE ============== */}
        <section id="notes" className="container-hub py-14 lg:py-16 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] gap-8 lg:gap-12">
            <article className="min-w-0">
              <div className="flex items-center gap-2 mb-3 text-support">
                <BookOpen className="h-4 w-4" aria-hidden />
                <span className="text-[11px] tracking-[0.18em] uppercase font-semibold">
                  Notes du terrain
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Retours d'atelier, conseils et petites victoires techniques.
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-[62ch]">
                Cette rubrique accueillera des notes issues du terrain : support IT, sécurité,
                désinfection, optimisation, logiciels utiles et retours d'expérience concrets.
              </p>
              <p className="mt-4 text-sm text-muted-foreground italic max-w-[62ch]">
                Le premier billet paraîtra ici — à son rythme, lorsqu'il aura quelque chose d'utile
                à raconter.
              </p>
            </article>

            <aside
              id="drsmoke"
              aria-labelledby="drsmoke-title"
              className="min-w-0 bg-[color:var(--surface)] border border-border p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Lightbulb className="h-4 w-4" aria-hidden />
                <span className="text-[11px] tracking-[0.18em] uppercase font-semibold">
                  Compagnon
                </span>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-center">
                <img
                  src="/assets/drsmoke.jpg"
                  alt="DrSmoke, mascotte de l'univers DMAMPRO"
                  width={72}
                  height={72}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 rounded-md object-cover border border-border shrink-0"
                />
                <h3 id="drsmoke-title" className="text-lg font-bold min-w-0 leading-tight">
                  Le conseil DrSmoke
                </h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                DrSmoke partage des réflexes pratiques, des outils utiles et des explications
                accessibles issus de l'univers DMAMPRO.
              </p>
            </aside>
          </div>
        </section>

        {/* ============== CONTACT — dock d'intervention ============== */}
        <section id="contact" className="border-t border-border bg-[color:var(--surface)]">
          <div className="container-hub py-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 lg:gap-14 items-start">
              <div className="min-w-0">
                <span className="text-[11px] tracking-[0.18em] uppercase text-primary font-semibold">
                  Dock d'intervention
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-[1.05]">
                  Prenons contact.
                </h2>
                <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-[42ch]">
                  WhatsApp reste le canal le plus rapide. Choisissez sinon un canal réellement
                  configuré ci-contre.
                </p>
                <div className="mt-6">
                  <WhatsAppCTA
                    label="Ouvrir WhatsApp"
                    className="w-full sm:w-auto text-base !min-h-12"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mailHref ? (
                    <a href={mailHref} className="btn-support hover:bg-panel">
                      <Mail className="h-4 w-4" aria-hidden /> Email
                    </a>
                  ) : (
                    <button
                      type="button"
                      aria-disabled="true"
                      disabled
                      title="Email bientôt disponible — adresse non configurée."
                      className="btn-support opacity-60 cursor-not-allowed"
                    >
                      <Mail className="h-4 w-4" aria-hidden /> Email bientôt disponible
                    </button>
                  )}

                  {telHref ? (
                    <a href={telHref} className="btn-ghost hover:bg-panel">
                      <Phone className="h-4 w-4" aria-hidden /> Téléphone
                    </a>
                  ) : (
                    <button
                      type="button"
                      aria-disabled="true"
                      disabled
                      title="Téléphone bientôt disponible — numéro non configuré."
                      className="btn-ghost opacity-60 cursor-not-allowed"
                    >
                      <Phone className="h-4 w-4" aria-hidden /> Téléphone bientôt disponible
                    </button>
                  )}

                  {planHref ? (
                    <a
                      href={planHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost hover:bg-panel"
                    >
                      <CalendarClock className="h-4 w-4" aria-hidden /> Planifier
                    </a>
                  ) : (
                    <button
                      type="button"
                      aria-disabled="true"
                      disabled
                      title="Planification bientôt disponible — WhatsApp non configuré."
                      className="btn-ghost opacity-60 cursor-not-allowed"
                    >
                      <CalendarClock className="h-4 w-4" aria-hidden /> Planifier bientôt disponible
                    </button>
                  )}

                  <button type="button" onClick={openVCard} className="btn-ghost hover:bg-panel">
                    <UserPlus className="h-4 w-4" aria-hidden /> vCard
                  </button>
                </div>

                {(githubConfigured || facebookConfigured) && (
                  <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="text-xs uppercase tracking-widest">Réseaux</span>
                    {githubConfigured && (
                      <a
                        href={VCARD_DATA.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                        aria-label="Profil GitHub d'Adonaï MOUZITA"
                      >
                        <GithubIcon className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    {facebookConfigured && (
                      <a
                        href={VCARD_DATA.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                        aria-label="Page Facebook d'Adonaï MOUZITA"
                      >
                        <FacebookIcon className="h-4 w-4" /> Facebook
                      </a>
                    )}
                  </div>
                )}
                <p className="mt-4 text-xs text-muted-foreground">
                  Selon votre navigateur, la vCard s'ouvrira dans l'application Contacts ou se
                  téléchargera en tant que fichier .vcf.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="container-hub py-8 border-t border-border">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-sm text-muted-foreground">
            <span className="min-w-0 break-words">
              © {new Date().getFullYear()} DMAMPRO · Adonaï MOUZITA
            </span>
            {canonicalSite && (
              <a href={canonicalSite} className="shrink-0 hover:text-foreground" rel="noreferrer">
                {canonicalSite.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </footer>
      </main>
    </>
  );
}

function ProjectRegister({
  groups,
}: {
  groups: { label: string; projects: Project[]; hint?: string }[];
}) {
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <div
          key={g.label}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-4 lg:gap-10"
        >
          <div className="lg:pt-4">
            <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-support">
              {g.label}
            </div>
            {g.hint && (
              <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed">{g.hint}</p>
            )}
            {g.projects.length === 0 && !g.hint && (
              <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed">
                Rien à afficher pour le moment.
              </p>
            )}
          </div>
          {g.projects.length > 0 && (
            <ul className="border-t border-border">
              {g.projects.map((p) => (
                <li key={p.id}>
                  <ProjectLedgerRow p={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectLedgerRow({ p }: { p: Project }) {
  const href = safeProjectWebsiteUrl(p);
  const isPreview = p.visibility === "preview";
  const meta: string[] = [];
  if (p.contributionLabel) meta.push(p.contributionLabel);
  if (p.technologies && p.technologies.length > 0) meta.push(p.technologies.join(" · "));

  const content = (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base sm:text-lg font-bold text-foreground">{p.title}</h3>
          <span
            className={[
              "text-[11px] tracking-widest uppercase font-mono",
              isPreview ? "text-muted-foreground/70" : "text-support",
            ].join(" ")}
          >
            {p.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-[62ch]">
          {p.summary}
        </p>
        {meta.length > 0 && (
          <p className="mt-1.5 text-xs text-muted-foreground/70">{meta.join(" — ")}</p>
        )}
      </div>
      {href ? (
        <span className="inline-flex items-center gap-1 text-sm text-primary font-medium shrink-0 self-center">
          {projectActionLabel(p)}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/60 shrink-0 self-center">
          Aperçu
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block border-b border-border hover:bg-[color:var(--surface)] transition-colors px-1"
        aria-label={`${projectActionLabel(p)} — ${p.title}`}
      >
        {content}
      </a>
    );
  }
  return <div className="border-b border-border px-1">{content}</div>;
}
