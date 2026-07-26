import { useEffect, useRef, useState } from "react";
import {
  CircleHelp,
  Folder,
  Home,
  Mail,
  MessageCircle,
  NotebookText,
  Phone,
  UserPlus,
  X,
} from "lucide-react";
import { useAutoHideNav } from "@/hooks/useAutoHideNav";
import { mailtoLink, openVCard, telLink, whatsappLink } from "@/lib/vcard";

const sections = ["assistance", "projects", "notes"] as const;
const BOTTOM_EDGE = 1;

export function MobileNav() {
  const [active, setActive] = useState("top");
  const [contactOpen, setContactOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const { hidden, reveal } = useAutoHideNav(!contactOpen);

  useEffect(() => {
    const updateActive = () => {
      const y = window.scrollY;
      const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_EDGE;
      if (y < 180) {
        setActive("top");
        return;
      }
      if (atBottom) {
        setActive(window.location.hash === "#notes" ? "notes" : "contact");
        return;
      }

      const probe = y + window.innerHeight * 0.82;
      const current = sections.reduce<string>((candidate, id) => {
        const element = document.getElementById(id);
        return element && element.offsetTop <= probe ? id : candidate;
      }, "assistance");
      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("hashchange", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, []);
  useEffect(() => {
    if (!contactOpen) return;
    const previousOverflow = document.body.style.overflow;
    const returnFocus = contactButtonRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
    };
    window.addEventListener("keydown", handleDialogKeys);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeys);
      returnFocus?.focus();
    };
  }, [contactOpen]);

  const whatsapp = whatsappLink("Bonjour Adonaï, je vous contacte depuis le hub DMAMPRO.");
  const email = mailtoLink();
  const phone = telLink();

  const items = [
    { id: "top", label: "Accueil", icon: Home },
    { id: "assistance", label: "Assistance", icon: CircleHelp },
    { id: "projects", label: "Projets", icon: Folder },
    { id: "notes", label: "Notes", icon: NotebookText },
  ] as const;

  return (
    <>
      <nav
        className={`mobile-nav ${hidden ? "is-hidden" : ""}`}
        aria-label="Navigation mobile principale"
        onFocusCapture={reveal}
      >
        <div>
          {items.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "is-active" : ""}
              aria-current={active === id ? "page" : undefined}
              onClick={() => setActive(id)}
            >
              <Icon />
              <span>{label}</span>
            </a>
          ))}
          <button
            ref={contactButtonRef}
            type="button"
            className={contactOpen || active === "contact" ? "is-active is-primary" : "is-primary"}
            aria-expanded={contactOpen}
            aria-controls="mobile-contact-panel"
            onClick={() => setContactOpen(true)}
          >
            <MessageCircle />
            <span>Contact</span>
          </button>
        </div>
      </nav>

      {contactOpen ? (
        <div className="mobile-sheet-backdrop" onMouseDown={() => setContactOpen(false)}>
          <section
            ref={panelRef}
            id="mobile-contact-panel"
            className="mobile-contact-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-contact-title"
            tabIndex={-1}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <small>Selon disponibilité</small>
                <h2 id="mobile-contact-title">Choisissez le canal qui vous convient</h2>
              </div>
              <button type="button" onClick={() => setContactOpen(false)} aria-label="Fermer">
                <X />
              </button>
            </header>

            <div className="mobile-contact-actions">
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noreferrer" className="whatsapp">
                  <MessageCircle />
                  <b>
                    WhatsApp<small>Décrire mon besoin</small>
                  </b>
                </a>
              ) : null}
              {email ? (
                <a href={email}>
                  <Mail />
                  <b>
                    E-mail<small>Envoyer les détails</small>
                  </b>
                </a>
              ) : null}
              {phone ? (
                <a href={phone}>
                  <Phone />
                  <b>
                    Téléphone<small>Appeler si disponible</small>
                  </b>
                </a>
              ) : null}
              <button type="button" onClick={openVCard}>
                <UserPlus />
                <b>
                  Enregistrer<small>Enregistrer le contact</small>
                </b>
              </button>
            </div>

            <p>Le hub ne contient pas de formulaire et ne stocke pas votre message. Celui-ci est envoyé par l’application choisie.</p>
          </section>
        </div>
      ) : null}
    </>
  );
}
