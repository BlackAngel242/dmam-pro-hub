import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BookOpen,
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
  Settings,
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
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adonaï MOUZITA — DMAMPRO · L'Atelier Réseau" },
      {
        name: "description",
        content:
          "Hub personnel de support IT, projets, conseils et solutions numériques d'Adonaï MOUZITA.",
      },
    ],
  }),
  component: Dashboard,
});
const missions = [
  {
    id: "help",
    icon: CircleHelp,
    title: "Obtenir de l'aide",
    detail: "Décrivez votre problème et je vous accompagne pas à pas.",
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
    title: "Désinfecter et sécuriser",
    detail: "Suppression des menaces et protection de votre système.",
    message: "Bonjour Adonaï, je souhaite désinfecter et sécuriser mon appareil.",
  },
  {
    id: "optimise",
    icon: Gauge,
    title: "Optimiser mon système",
    detail: "Amélioration des performances et nettoyage complet.",
    message: "Bonjour Adonaï, je souhaite optimiser les performances de mon appareil.",
  },
] as const;
const notes = [
  [
    "Checklist rapide avant intervention",
    "Vérifications essentielles avant toute prise en main à distance.",
    "Aujourd'hui",
  ],
  [
    "Pourquoi garder ses logiciels à jour ?",
    "Mises à jour, sécurité et stabilité : les bonnes pratiques.",
    "Hier",
  ],
  [
    "Nettoyage système : les bons réflexes",
    "Libérer de l'espace et maintenir les performances.",
    "3 jours",
  ],
  [
    "Sauvegardes : ne pas attendre la panne",
    "Méthodes simples pour sauvegarder efficacement.",
    "5 jours",
  ],
] as const;
const activity = [
  [Check, "Intervention terminée", "Optimisation système", "2 heures"],
  [MessageCircle, "Nouveau message", "Demande d'assistance", "5 heures"],
  [MonitorCog, "Logiciel installé", "Suite bureautique", "Hier"],
  [ShieldCheck, "Système désinfecté", "Menaces supprimées", "Hier"],
  [Folder, "Projet mis à jour", "DrShop — Solutions numériques", "Hier"],
] as const;
const nav = [
  [Home, "Accueil", "#top"],
  [BriefcaseBusiness, "Services", "#services"],
  [Folder, "Projets", "#projects"],
  [NotebookText, "Notes", "#notes"],
  [User, "Contacts", "#contact"],
  [BookOpen, "Ressources", "#notes"],
  [Settings, "Réglages", "#contact"],
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
  const wa = whatsappLink(selected.message);
  const projects = visibleProjects().slice(0, 3);
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
            Disponible<small>Réponse rapide garantie</small>
          </p>
          <a className="top-icon" href="#projects" aria-label="Voir les projets">
            <Search />
          </a>
          <a className="top-icon" href="#notes" aria-label="Voir les notes récentes">
            <Bell />
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
                <strong>Votre conseiller informatique dédié.</strong>
                <p>
                  Je vous accompagne à distance pour résoudre vos problèmes, installer vos
                  logiciels, désinfecter votre système, optimiser vos performances et vous apporter
                  des conseils adaptés.
                </p>
                <ul>
                  {[
                    "Assistance à distance sécurisée",
                    "Intervention rapide et efficace",
                    "Solutions claires et personnalisées",
                    "Confidentialité et fiabilité assurées",
                  ].map((x) => (
                    <li key={x}>
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Mission selected={selected} setSelected={setSelected} wa={wa} />
          </section>
          <section className="mid">
            <div className="cover">
              <div>
                <h1>Bonjour, je suis Adonaï.</h1>
                <p>Bienvenue dans votre hub personnel.</p>
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
              <h2>Besoin d'une assistance rapide et efficace ?</h2>
              <p>
                Expliquez-moi votre besoin en quelques mots. Je vous réponds rapidement et nous
                trouvons la meilleure solution ensemble.
              </p>
              <div>
                <a href={wa ?? "#contact"}>
                  Expliquer mon besoin <ArrowRight />
                </a>
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
                  <small>Service pratique, clair et sécurisé.</small>
                </div>
              ))}
            </div>
            <div className="secure">
              <ShieldCheck />
              <b>
                Sécurité et confidentialité avant tout
                <small>Vos données sont traitées avec le plus haut niveau de sécurité.</small>
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
            <Featured project={projects[0]} />
            <Projects projects={projects} />
            <div className="rightstack">
              <Tip />
              <Notes />
            </div>
          </section>
          <section className="midcontent">
            <Projects projects={projects} />
            <Notes />
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
          <p>Je suis disponible et prêt à vous aider.</p>
          <span>● Disponible</span>
          <span>
            <Zap />
            Réponse rapide garantie
          </span>
          <span>
            <LockKeyhole />
            Confidentialité assurée
          </span>
        </div>
      </aside>
    </div>
  );
}
function Mission({
  selected,
  setSelected,
  wa,
}: {
  selected: (typeof missions)[number];
  setSelected: (m: (typeof missions)[number]) => void;
  wa: string | null;
}) {
  return (
    <div className="mission" id="assistance">
      <h2>Que puis-je résoudre pour vous ?</h2>
      <p>Choisissez une mission ou expliquez-moi votre besoin.</p>
      {missions.map((m) => (
        <button
          className={selected.id === m.id ? "sel" : ""}
          aria-pressed={selected.id === m.id}
          onClick={() => setSelected(m)}
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
        <a href={wa ?? "#contact"}>
          <Menu />
          Expliquer mon besoin
        </a>
        <button onClick={openVCard}>
          <UserPlus />
          Ajouter aux contacts
        </button>
      </div>
      <small className="privacy">
        <LockKeyhole />
        Vos données sont traitées avec le plus haut niveau de sécurité et ne sont jamais partagées.
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
  return (
    <section className="module projects" id="projects">
      <header>
        <h2>Mes projets & contributions</h2>
        <a href={VCARD_DATA.github}>
          Voir tous les projets <ArrowRight />
        </a>
      </header>
      <nav>
        <b>En cours 3</b>
        <span>Terminés</span>
        <span>Tous</span>
      </nav>
      {projects.map((p, n) => (
        <article key={p.id}>
          <i className="plogo">{n ? "◉" : "Dr"}</i>
          <div>
            <h3>
              {p.title}
              <em>{p.category === "contribution" ? "Aperçu" : "Public"}</em>
            </h3>
            <p>{p.summary}</p>
            <Tags />
          </div>
          <small>
            Dernière activité<b>● {n ? (n === 1 ? "2 jours" : "5 jours") : "Aujourd'hui"}</b>
          </small>
        </article>
      ))}
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
function Notes() {
  return (
    <section className="module notes" id="notes">
      <header>
        <h2>Notes du terrain</h2>
        <span className="notes-count">4 notes</span>
      </header>
      {notes.map(([t, d, time]) => (
        <article key={t}>
          <NotebookText />
          <p>
            <b>{t}</b>
            <small>{d}</small>
          </p>
          <time>{time}</time>
        </article>
      ))}
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
        <small>Je suis disponible et prêt à vous aider.</small>
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
