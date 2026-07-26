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

const sections = ["assistance", "projects", "notes", "contact"] as const;

export function MobileNav() {
  const [active, setActive] = useState("top");
  const [contactOpen, setContactOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const { hidden, reveal } = useAutoHideNav(!contactOpen);

  useEffect(() => {
    const updateTop = () => {
      if (window.scrollY < 180) setActive("top");
    };
    updateTop();
    window.addEventListener("scroll", updateTop, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", updateTop);
      observer.disconnect();
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
                <small>Disponible maintenant</small>
                <h2 id="mobile-contact-title">Comment souhaitez-vous me joindre ?</h2>
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
                    WhatsApp<small>Réponse rapide</small>
                  </b>
                </a>
              ) : null}
              {email ? (
                <a href={email}>
                  <Mail />
                  <b>
                    E-mail<small>Décrire mon besoin</small>
                  </b>
                </a>
              ) : null}
              {phone ? (
                <a href={phone}>
                  <Phone />
                  <b>
                    Téléphone<small>Appel direct</small>
                  </b>
                </a>
              ) : null}
              <button type="button" onClick={openVCard}>
                <UserPlus />
                <b>
                  Enregistrer<small>Ajouter la vCard</small>
                </b>
              </button>
            </div>

            <p>Vos informations ne sont ni stockées ni partagées par ce hub.</p>
          </section>
        </div>
      ) : null}
    </>
  );
}
