import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircleHelp,
  ExternalLink,
  Folder,
  Mail,
  NotebookText,
  Search,
  User,
  X,
} from "lucide-react";
import { visibleProjects, safeProjectWebsiteUrl } from "@/lib/projects";
import { mailtoLink } from "@/lib/vcard";

type Command = {
  id: string;
  label: string;
  detail: string;
  keywords: string;
  icon: typeof Search;
  href?: string;
  external?: boolean;
  action?: "assistant";
};

type Props = {
  open: boolean;
  onClose: () => void;
  onRequestOpen: () => void;
  onOpenAssistant: () => void;
};

const baseCommands: Command[] = [
  {
    id: "assistant",
    label: "Preparer mon besoin",
    detail: "Diagnostic guide en trois etapes",
    keywords: "aide probleme diagnostic urgence",
    icon: CircleHelp,
    action: "assistant",
  },
  {
    id: "assistance",
    label: "Assistance",
    detail: "Choisir une situation",
    keywords: "service installation infection lenteur",
    icon: CircleHelp,
    href: "#assistance",
  },
  {
    id: "projects",
    label: "Projets",
    detail: "Voir les realisations publiques",
    keywords: "portfolio github contribution",
    icon: Folder,
    href: "#projects",
  },
  {
    id: "notes",
    label: "Notes du terrain",
    detail: "Consulter les conseils pratiques",
    keywords: "articles guides ressources",
    icon: NotebookText,
    href: "#notes",
  },
  {
    id: "contact",
    label: "Contact",
    detail: "Choisir un canal",
    keywords: "whatsapp telephone email vcard",
    icon: User,
    href: "#contact",
  },
  {
    id: "email",
    label: "Envoyer un e-mail",
    detail: "Ouvrir votre application de messagerie",
    keywords: "mail message",
    icon: Mail,
    href: mailtoLink() ?? "#contact",
  },
];

export function HubCommandPalette({ open, onClose, onRequestOpen, onOpenAssistant }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const commands = useMemo<Command[]>(() => {
    const projects = visibleProjects().flatMap((project) => {
      const href = safeProjectWebsiteUrl(project);
      if (!href) return [];
      return [
        {
          id: `project-${project.id}`,
          label: project.title,
          detail: project.summary,
          keywords: `projet ${project.status} ${project.category}`,
          icon: Folder,
          href,
          external: true,
        } satisfies Command,
      ];
    });
    return [...baseCommands, ...projects];
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    if (!needle) return commands;
    return commands.filter((item) =>
      `${item.label} ${item.detail} ${item.keywords}`.toLocaleLowerCase("fr").includes(needle),
    );
  }, [commands, query]);

  useEffect(() => {
    const openWithSlash = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches("input, textarea, select, [contenteditable='true']");
      if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        onRequestOpen();
      }
    };
    window.addEventListener("keydown", openWithSlash);
    return () => window.removeEventListener("keydown", openWithSlash);
  }, [onRequestOpen, open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const returnFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());

    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) => (results.length ? (value + 1) % results.length : 0));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) => (results.length ? (value - 1 + results.length) % results.length : 0));
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          "input, button:not([disabled]), a[href]",
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keys);
      returnFocus?.focus();
    };
  }, [open, onClose, results.length]);

  if (!open) return null;

  const execute = (command: Command) => {
    onClose();
    if (command.action === "assistant") {
      onOpenAssistant();
      return;
    }
    if (!command.href) return;
    if (command.external) window.open(command.href, "_blank", "noopener,noreferrer");
    else window.location.href = command.href;
  };

  return (
    <div className="command-backdrop" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <small>Navigation rapide</small>
            <h2 id="command-title">Que voulez-vous faire ?</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer la recherche">
            <X />
          </button>
        </header>
        <label className="command-search">
          <Search />
          <span className="sr-only">Rechercher dans le hub</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Services, projets, notes, contact..."
          />
        </label>
        <div className="command-results" role="listbox" aria-label="Resultats de recherche">
          {results.length ? (
            results.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={index === active ? "is-active" : ""}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => execute(item)}
                >
                  <Icon />
                  <span>
                    <b>{item.label}</b>
                    <small>{item.detail}</small>
                  </span>
                  {item.external ? <ExternalLink /> : null}
                </button>
              );
            })
          ) : (
            <p className="command-empty">
              Aucun resultat. Essayez probleme, projet, note ou contact.
            </p>
          )}
        </div>
        <footer>
          <span>
            <kbd>/</kbd> ouvrir
          </span>
          <span>
            <kbd>Esc</kbd> fermer
          </span>
          <span>
            <kbd>Enter</kbd> choisir
          </span>
        </footer>
      </section>
    </div>
  );
}
