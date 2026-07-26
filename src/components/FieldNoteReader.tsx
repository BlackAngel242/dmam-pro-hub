import { useEffect, useId, useRef } from "react";
import { ArrowLeft, ArrowRight, Clock3, MessageCircle, X } from "lucide-react";
import type { FieldNote } from "@/lib/field-notes";

type FieldNoteReaderProps = {
  note: FieldNote;
  position: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRequestHelp: () => void;
};

export function FieldNoteReader({
  note,
  position,
  total,
  onClose,
  onPrevious,
  onNext,
  onRequestHelp,
}: FieldNoteReaderProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
      if (event.key !== "Tab" || !dialog) return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]"),
      ];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="reader-backdrop" onMouseDown={onClose}>
      <article
        ref={dialogRef}
        className="field-note-reader"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <p className="reader-kicker">Note du terrain · {note.category}</p>
            <h2 id={titleId}>{note.title}</h2>
            <p className="reader-meta">
              <Clock3 aria-hidden="true" /> {note.readingTime} · Mis à jour le {note.updatedAt}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer le billet">
            <X aria-hidden="true" />
          </button>
        </header>
        <div className="reader-scroll">
          <p className="reader-intro">{note.intro}</p>
          {note.sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <aside>{note.closing}</aside>
          <button className="reader-help" type="button" onClick={onRequestHelp}>
            <MessageCircle aria-hidden="true" /> Ce problème me concerne
          </button>
        </div>
        <footer>
          <button type="button" onClick={onPrevious}>
            <ArrowLeft aria-hidden="true" /> Note précédente
          </button>
          <span>
            {position + 1} / {total}
          </span>
          <button type="button" onClick={onNext}>
            Note suivante <ArrowRight aria-hidden="true" />
          </button>
        </footer>
      </article>
    </div>
  );
}
