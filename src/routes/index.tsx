import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Download,
  Folder,
  Gauge,
  GitFork,
  Headphones,
  Home,
  Info,
  LayoutGrid,
  Link,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  MonitorCog,
  NotebookText,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  User,
  UserPlus,
  Wrench,
  Video,
  Zap,
} from "lucide-react";
import { openVCard, whatsappLink, mailtoLink, telLink, VCARD_DATA } from "@/lib/vcard";
import { visibleProjects, safeProjectWebsiteUrl } from "@/lib/projects";
import { MobileNav } from "@/components/layout/MobileNav";
import { HubCommandPalette } from "@/components/HubCommandPalette";
import { NeedAssistant } from "@/components/NeedAssistant";
import { FieldNoteReader } from "@/components/FieldNoteReader";
import { FIELD_NOTES } from "@/lib/field-notes";
const SITE_URL = "https://dmam-pro-hub.netlify.app";
const SEO_TITLE = "DMAMPRO — Assistance informatique, projets et conseils";
const SEO_DESCRIPTION =
  "Adonaï MOUZITA vous aide à diagnostiquer, sécuriser, installer et améliorer vos outils numériques, avec une prochaine étape claire.";
const OG_IMAGE = SITE_URL + "/og/dmampro-social-v1.jpg";
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      url: SITE_URL + "/",
      name: "DMAMPRO",
      inLanguage: "fr",
    },
    {
      "@type": "Person",
      "@id": SITE_URL + "/#person",
      name: "Adonaï MOUZITA",
      url: SITE_URL + "/",
      sameAs: ["https://github.com/BlackAngel242"],
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESCRIPTION },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:site_name", content: "DMAMPRO" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Adonaï MOUZITA dans l’atelier numérique DMAMPRO." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO_TITLE },
      { name: "twitter:description", content: SEO_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: "Adonaï MOUZITA dans l’atelier numérique DMAMPRO." },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(STRUCTURED_DATA),
      },
    ],
  }),
  component: Dashboard,
});
const missions = [
  {
    id: "help",
    icon: CircleHelp,
    title: "Résoudre un problème",
    detail: "Décrivez ce qui bloque et commençons par le clarifier.",
    message: "Bonjour Adonaï, j'ai besoin d'aide avec un problème informatique.",
  },
  {
    id: "install",
    icon: Download,
    title: "Installer ou configurer",
    detail: "Installation de logiciels, pilotes, périphériques et réglages.",
    message: "Bonjour Adonaï, j'ai besoin d'aide pour une installation ou une configuration.",
  },
  {
    id: "secure",
    icon: ShieldCheck,
    title: "Vérifier une infection",
    detail: "Identifiez les symptômes avant toute action sur votre appareil.",
    message: "Bonjour Adonaï, je souhaite désinfecter et sécuriser mon appareil.",
  },
  {
    id: "optimise",
    icon: Gauge,
    title: "Comprendre un ralentissement",
    detail: "Repérez ce qui ralentit l’appareil avant de le remplacer.",
    message: "Bonjour Adonaï, je souhaite optimiser les performances de mon appareil.",
  },
] as const;
const missionIntent = {
  help: "problem",
  install: "install",
  secure: "infection",
  optimise: "performance",
} as const;
const activity = [
  [Folder, "DrShop", "Boutique digitale mobile-first", "Projet public"],
  [Folder, "EngageTrack", "Registre public congolais", "Projet public"],
  [GitFork, "BisoMapTech", "Contribution à la communauté tech", "Contribution"],
] as const;
const nav = [
  [Home, "Accueil", "#top"],
  [BriefcaseBusiness, "Services", "#services"],
  [Folder, "Projets", "#projects"],
  [NotebookText, "Notes", "#notes"],
  [User, "Contacts", "#contact"],
] as const;
function Logo({ small = false }: { small?: boolean }) {
  return (
    <a href="#top" className="logo">
      <Headphones />
      <b>DMAMPRO</b>
      {!small && <span>L'Atelier Réseau</span>}
    </a>
  );
}
function Dashboard() {
  const [selected, setSelected] = useState<(typeof missions)[number]>(missions[0]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const wa = whatsappLink(selected.message);
  const projects = visibleProjects();
  const featuredProject = projects.find((project) => project.featured);
  return (
    <div className="shell" id="top">
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <aside className="left">
        <Logo small />
        <b className="work">
          <Headphones />
          L'Atelier Réseau
        </b>
        <nav>
          {nav.map(([I, t, h], i) => (
            <a className={i ? "" : "on"} href={h} key={t}>
              <I />
              {t}
            </a>
          ))}
        </nav>
        <div className="profile">
          <p>
            <User />
            <b>
              DMAMPRO
              <small>
                <i />
                Disponible
              </small>
            </b>
          </p>
          <img src="/assets/drsmoke-320.webp" alt="" width={320} height={320} loading="lazy" />
          <b>Conseil DrSmoke</b>
          <span>Un système propre et à jour, c'est 80 % des problèmes évités.</span>
          <a href="#notes">
            Voir plus de conseils <ArrowRight />
          </a>
        </div>
      </aside>
      <div className="body">
        <header className="top">
          <Logo />
          <nav>
            {["Accueil", "Assistance", "Projets", "Notes", "Contact"].map((x, i) => (
              <a
                className={i ? "" : "on"}
                href={["#top", "#assistance", "#projects", "#notes", "#contact"][i]}
                key={x}
              >
                {x}
              </a>
            ))}
          </nav>
          <p>
            <i />
            Disponible<small>Réponse selon disponibilité</small>
          </p>
          <button
            className="top-icon"
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label="Rechercher dans le hub"
          >
            <Search />
          </button>
          <a className="top-icon" href="#notes" aria-label="Voir les notes récentes">
            <NotebookText />
          </a>
          <button
            className="top-icon"
            onClick={openVCard}
            aria-label="Enregistrer Adonaï dans mes contacts"
          >
            <User />
          </button>
        </header>
        <main id="main">
          <section className="hero">
            <div className="identity">
              <img
                src="/assets/adonai-960.webp"
                srcSet="/assets/adonai-640.webp 640w, /assets/adonai-960.webp 960w, /assets/adonai-1400.webp 1400w"
                sizes="(max-width: 759px) 100vw, (max-width: 1100px) 554px, 46vw"
                width={1400}
                height={1120}
                fetchPriority="high"
                alt="Portrait d'Adonaï MOUZITA"
              />
              <div>
                <span>Bonjour, je suis</span>
                <h1>Adonaï.</h1>
                <strong>Je vous aide à reprendre la main sur vos outils numériques.</strong>
                <p>
                  Je vous accompagne à distance pour résoudre vos problèmes, installer vos
                  logiciels, désinfecter votre système, optimiser vos performances et vous apporter
                  des conseils adaptés.
                </p>
                <ul>
                  {[
                    "Votre besoin reformulé avant toute intervention",
                    "Étapes expliquées en langage clair",
                    "Validation avec vous avant de terminer",
                    "Conseils laissés pour éviter que le problème revienne",
                  ].map((x) => (
                    <li key={x}>
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Mission
              selected={selected}
              setSelected={setSelected}
              wa={wa}
              onOpenAssistant={() => setAssistantOpen(true)}
            />
          </section>
          <section className="mid">
            <div className="cover">
              <div>
                <p className="cover-title">Bonjour, je suis Adonaï.</p>
                <p>Je vous aide à reprendre la main sur vos outils numériques.</p>
                <span>
                  Ici, vous pouvez obtenir de l'aide, suivre vos projets et accéder à mes services
                  d'assistance à distance.
                </span>
              </div>
            </div>
            <h2>Que souhaitez-vous faire ?</h2>
            <div className="intents">
              {[
                [CircleHelp, "Obtenir de l'aide", "#assistance"],
                [BriefcaseBusiness, "Découvrir mes services", "#services"],
                [Folder, "Voir mes projets", "#projects"],
                [NotebookText, "Lire les notes", "#notes"],
              ].map(([I, t, h]) => (
                <a href={h as string} key={t as string}>
                  <I />
                  <ChevronRight />
                  <b>{t as string}</b>
                  <small>Accédez rapidement à cette section.</small>
                </a>
              ))}
            </div>
            <div className="assist">
              <h2>Un problème informatique ? Commençons par le rendre clair.</h2>
              <p>
                Expliquez-moi votre besoin en quelques mots. Je vous réponds rapidement et nous
                trouvons la meilleure solution ensemble.
              </p>
              <div>
                <button type="button" onClick={() => setAssistantOpen(true)}>
                  Préparer mon besoin <ArrowRight />
                </button>
                <button onClick={openVCard}>
                  <UserPlus />
                  Ajouter aux contacts
                </button>
              </div>
            </div>
            <div className="services" id="services">
              {[
                [ShieldCheck, "Assistance à distance"],
                [LayoutGrid, "Logiciels"],
                [Sparkles, "Désinfection"],
                [Gauge, "Optimisation"],
              ].map(([I, t]) => (
                <div key={t as string}>
                  <I />
                  <b>{t as string}</b>
                  <small>Une méthode expliquée, étape par étape.</small>
                </div>
              ))}
            </div>
            <div className="secure">
              <ShieldCheck />
              <b>
                Vous gardez le contrôle
                <small>
                  Les modalités d’accès et de confidentialité sont précisées avant chaque
                  intervention.
                </small>
              </b>
            </div>
          </section>
          <section className="steps">
            <b>
              Mon parcours
              <br />
              d'assistance
            </b>
            {[
              [CircleHelp, "1. Décrivez", "votre besoin"],
              [MonitorCog, "2. Diagnostic", "et solutions"],
              [Sparkles, "3. Intervention", "à distance"],
              [Wrench, "4. Validation", "et conseils"],
              [Phone, "5. Suivi", "et optimisation"],
            ].map(([I, a, b]) => (
              <div key={a as string}>
                <i>
                  <I />
                </i>
                <p>
                  {a as string}
                  <small>{b as string}</small>
                </p>
                <ChevronRight />
              </div>
            ))}
            <span>
              <LockKeyhole />
              Interventions sécurisées
              <br />
              et confidentialité assurée
            </span>
          </section>
          <section className="deskgrid">
            <Featured project={featuredProject} />
            <Projects projects={projects} />
            <div className="rightstack">
              <Tip />
              <Notes onRequestHelp={() => setAssistantOpen(true)} />
            </div>
          </section>
          <section className="midcontent">
            <Projects projects={projects} />
            <Notes onRequestHelp={() => setAssistantOpen(true)} />
            <Contact />
          </section>
        </main>
        <footer className="dock" id="contact">
          <Contact />
        </footer>
        <footer className="midfoot">
          <b>
            DMAMPRO<small>L'Atelier Réseau</small>
          </b>
          <span>
            Assistance • Logiciels • Sécurité • Optimisation
            <br />© 2026 DMAMPRO. Tous droits réservés.
          </span>
          <span>Mentions légales</span>
        </footer>
      </div>
      <aside className="right">
        <b>
          DMAMPRO{" "}
          <small>
            <i />
            Disponible
          </small>
        </b>
        <h3>Activité récente</h3>
        {activity.map(([I, t, d, time], n) => (
          <article key={t as string}>
            <i className={n === 0 || n === 3 ? "green" : ""}>
              <I />
            </i>
            <p>
              <b>{t as string}</b>
              <small>
                {d as string}
                <em>{time as string}</em>
              </small>
            </p>
          </article>
        ))}
        <a className="outline" href="#projects">
          Voir toute l'activité <ArrowRight />
        </a>
        <div className="minicontact">
          <h3>Me contacter</h3>
          <p>Choisissez le canal qui vous convient.</p>
          <span>● Disponible</span>
          <span>
            <Zap />
            Réponse selon disponibilité
          </span>
          <span>
            <LockKeyhole />
            Modalités précisées avant intervention
          </span>
        </div>
      </aside>
      <MobileNav />
      {assistantOpen ? (
        <div className="assistant-backdrop" onMouseDown={() => setAssistantOpen(false)}>
          <div
            className="assistant-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Diagnostic guidé"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <NeedAssistant
              key={selected.id}
              initialIntent={missionIntent[selected.id]}
              onClose={() => setAssistantOpen(false)}
            />
          </div>
        </div>
      ) : null}
      <HubCommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onRequestOpen={() => setCommandOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
      />
    </div>
  );
}
function Mission({
  selected,
  setSelected,
  wa,
  onOpenAssistant,
}: {
  selected: (typeof missions)[number];
  setSelected: (m: (typeof missions)[number]) => void;
  wa: string | null;
  onOpenAssistant: () => void;
}) {
  return (
    <div className="mission" id="assistance">
      <h2>Par quoi voulez-vous commencer ?</h2>
      <p>
        Choisissez la situation la plus proche de la vôtre. Vous pourrez préciser les détails
        ensuite.
      </p>
      {missions.map((m) => (
        <button
          className={selected.id === m.id ? "sel" : ""}
          aria-pressed={selected.id === m.id}
          onClick={() => {
            setSelected(m);
            onOpenAssistant();
          }}
          key={m.id}
        >
          <i>
            <m.icon />
          </i>
          <b>
            {m.title}
            <small>{m.detail}</small>
          </b>
          <ArrowRight />
        </button>
      ))}
      <div className="actions">
        <button type="button" onClick={onOpenAssistant}>
          <Menu />
          Préparer mon besoin
        </button>
        <button onClick={openVCard}>
          <UserPlus />
          Ajouter aux contacts
        </button>
      </div>
      <small className="privacy">
        <LockKeyhole />
        Les modalités d’accès et de confidentialité sont précisées avant chaque intervention.
      </small>
    </div>
  );
}
function Featured({
  project,
}: {
  project: ReturnType<typeof visibleProjects>[number] | undefined;
}) {
  return (
    <article className="module featured">
      <h2>Projet public à la une</h2>
      <div>
        <i className="drlogo">
          Dr<small>SHOP</small>
        </i>
        <section>
          <h3>
            {project?.title ?? "DrShop"} <em>Public</em>
          </h3>
          <p>{project?.summary}</p>
          <Tags />
          {project && safeProjectWebsiteUrl(project) && (
            <a href={safeProjectWebsiteUrl(project)} target="_blank" rel="noreferrer">
              Découvrir DrShop <ArrowRight />
            </a>
          )}
        </section>
      </div>
    </article>
  );
}
function Tags() {
  return (
    <p className="tags">
      <span>E-commerce</span>
      <span>Solutions numériques</span>
      <span>Support</span>
    </p>
  );
}
function Projects({ projects }: { projects: ReturnType<typeof visibleProjects> }) {
  const projectList = projects.filter((project) => !project.featured);
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(projectList.length / pageSize));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayDone, setAutoplayDone] = useState(false);
  const completedLoopsRef = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const visible = projectList.slice(page * pageSize, page * pageSize + pageSize);

  useEffect(() => {
    if (
      pageCount < 2 ||
      paused ||
      autoplayDone ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      setPage((current) => {
        const next = (current + 1) % pageCount;
        if (next === 0) {
          completedLoopsRef.current += 1;
          if (completedLoopsRef.current >= 3) setAutoplayDone(true);
        }
        return next;
      });
    }, 15_000);
    return () => window.clearInterval(timer);
  }, [autoplayDone, pageCount, paused]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    listRef.current?.querySelectorAll("article").forEach((card, index) => {
      card.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 360, delay: index * 70, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" },
      );
    });
  }, [page]);

  const goTo = (next: number) => setPage((next + pageCount) % pageCount);

  return (
    <section className="module projects" id="projects">
      <header>
        <h2>Mes projets & contributions</h2>
        <a href={VCARD_DATA.github} target="_blank" rel="noreferrer">
          Voir tous les projets <ArrowRight />
        </a>
      </header>
      <div
        className="project-deck"
        ref={listRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        {visible.map((project) => {
          const href = safeProjectWebsiteUrl(project);
          return (
            <article key={project.id}>
              {project.image ? (
                <img src={project.image} alt="" width={110} height={110} loading="lazy" />
              ) : (
                <i className="plogo" aria-hidden="true">
                  {project.title.slice(0, 2)}
                </i>
              )}
              <div>
                <h3>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                  <em>
                    {project.category === "contribution"
                      ? "Contribution"
                      : project.visibility === "public"
                        ? "Public"
                        : "Aperçu"}
                  </em>
                </h3>
                <p>{project.summary}</p>
                <p className="tags">
                  {(project.technologies?.slice(0, 3) ?? [project.category, project.status]).map(
                    (tag) => (
                      <span key={tag}>{tag}</span>
                    ),
                  )}
                </p>
              </div>
              <small>
                Statut<b>{project.status}</b>
              </small>
            </article>
          );
        })}
      </div>
      {pageCount > 1 ? (
        <footer className="project-pagination" aria-label="Navigation des projets">
          <button type="button" onClick={() => goTo(page - 1)} aria-label="Projets précédents">
            ‹
          </button>
          <span aria-live="polite">
            {page + 1} / {pageCount}
            <small>
              {autoplayDone
                ? "3 boucles terminées"
                : paused
                  ? "Lecture en pause"
                  : "Rotation toutes les 15 s · 3 boucles max"}
            </small>
          </span>
          <button type="button" onClick={() => goTo(page + 1)} aria-label="Projets suivants">
            ›
          </button>
        </footer>
      ) : null}
      <p className="note">
        <Info />
        Les projets privés n'apparaissent pas dans cette vue.
      </p>
    </section>
  );
}
function Tip() {
  return (
    <article className="module tip">
      <h2>Conseil du jour</h2>
      <div>
        <img src="/assets/drsmoke-320.webp" alt="" width={320} height={320} loading="lazy" />
        <p>
          Prenez 10 minutes chaque semaine pour mettre à jour vos logiciels.
          <br />
          C'est le meilleur moyen d'éviter les failles de sécurité et de garder un système
          performant.<em>DrSmoke</em>
        </p>
      </div>
    </article>
  );
}
function Notes({ onRequestHelp }: { onRequestHelp: () => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedNote = selectedIndex === null ? null : FIELD_NOTES[selectedIndex];
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const openNote = (index: number, trigger: HTMLButtonElement) => {
    closeButtonRef.current = trigger;
    setSelectedIndex(index);
  };
  const closeNote = () => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  };
  const move = (direction: number) => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + direction + FIELD_NOTES.length) % FIELD_NOTES.length,
    );
  };

  return (
    <section className="module notes" id="notes">
      <header>
        <h2>Notes du terrain</h2>
        <span className="notes-count">{FIELD_NOTES.length} notes</span>
      </header>
      {FIELD_NOTES.map((note, index) => (
        <article key={note.slug}>
          <button type="button" onClick={(event) => openNote(index, event.currentTarget)}>
            <NotebookText aria-hidden="true" />
            <span>
              <b>{note.title}</b>
              <small>{note.excerpt}</small>
            </span>
            <time>{note.category}</time>
          </button>
        </article>
      ))}
      {selectedNote && selectedIndex !== null ? (
        <FieldNoteReader
          note={selectedNote}
          position={selectedIndex}
          total={FIELD_NOTES.length}
          onClose={closeNote}
          onPrevious={() => move(-1)}
          onNext={() => move(1)}
          onRequestHelp={() => {
            setSelectedIndex(null);
            onRequestHelp();
          }}
        />
      ) : null}
    </section>
  );
}
function Contact() {
  const items = [
    [MessageCircle, "WhatsApp", "Message rapide", whatsappLink()],
    [Mail, "Email", "Envoyer un message", mailtoLink()],
    [Phone, "Téléphone", "Appel direct", telLink()],
    [CalendarDays, "Planifier un appel", "Choisir un créneau", whatsappLink()],
  ] as const;
  return (
    <div className="contact">
      <p>
        <b>Me contacter</b>
        <small>Choisissez le canal qui vous convient.</small>
      </p>
      {items.map(([I, t, d, h]) => (
        <a href={h ?? "#"} key={t}>
          <I />
          <b>
            {t}
            <small>{d}</small>
          </b>
        </a>
      ))}
      <section>
        <p>
          <b>Suivez-moi</b>
          <small>Restez connecté</small>
        </p>
        <a href={VCARD_DATA.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
          <Link />
        </a>
        <a href={VCARD_DATA.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitFork />
        </a>
        <a href={mailtoLink() ?? "#contact"} aria-label="Envoyer un e-mail">
          <Mail />
        </a>
      </section>
    </div>
  );
}
