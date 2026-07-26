import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, Copy, Mail, MessageCircle, RotateCcw, X } from "lucide-react";
import {
  buildNeedContactLinks,
  buildNeedSummary,
  getNeedAdvice,
  NEED_DEVICES,
  NEED_INTENTIONS,
  type NeedAnswers,
  type NeedDevice,
  type NeedIntent,
} from "@/lib/need-assistant";

type NeedAssistantProps = {
  onClose?: () => void;
  initialIntent?: NeedIntent;
  className?: string;
};

const EMPTY_ANSWERS: NeedAnswers = { intent: "", device: "", details: "" };
const DETAILS_LIMIT = 500;

export function NeedAssistant({ onClose, initialIntent, className = "" }: NeedAssistantProps) {
  const titleId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const progressId = useId();
  const [step, setStep] = useState(initialIntent ? 2 : 1);
  const [answers, setAnswers] = useState<NeedAnswers>({
    ...EMPTY_ANSWERS,
    intent: initialIntent ?? "",
  });
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  const isSummary = step === 4;
  const progressStep = Math.min(step, 3);
  const canContinue =
    (step === 1 && Boolean(answers.intent)) ||
    (step === 2 && Boolean(answers.device)) ||
    (step === 3 && answers.details.trim().length >= 5);
  const contactLinks = useMemo(() => buildNeedContactLinks(summary), [summary]);

  useEffect(() => {
    if (!onClose) return;
    const root = rootRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root?.querySelector<HTMLElement>("button:not([disabled]), textarea")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !root) return;
      const focusable = [
        ...root.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], textarea"),
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
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const continueToNext = () => {
    setStatus("");
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }
    setSummary(buildNeedSummary(answers));
    setStep(4);
  };

  const restart = () => {
    setAnswers({ ...EMPTY_ANSWERS, intent: initialIntent ?? "" });
    setSummary("");
    setStatus("Diagnostic recommencé.");
    setStep(initialIntent ? 2 : 1);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Résumé copié. Vous pouvez maintenant le coller dans le canal de votre choix.");
    } catch {
      setStatus("La copie automatique est indisponible. Sélectionnez le résumé pour le copier.");
    }
  };

  const chooseIntent = (intent: NeedIntent) => {
    setAnswers((current) => ({ ...current, intent }));
    setStatus("");
  };

  const chooseDevice = (device: NeedDevice) => {
    setAnswers((current) => ({ ...current, device }));
    setStatus("");
  };

  return (
    <section
      ref={rootRef}
      className={`need-assistant ${className}`.trim()}
      aria-labelledby={titleId}
      data-step={isSummary ? "summary" : step}
    >
      <header className="need-assistant__header">
        <div>
          <p className="need-assistant__eyebrow">Diagnostic guidé local</p>
          <h2 id={titleId}>{isSummary ? "Votre demande est prête" : "Préparons votre besoin"}</h2>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} aria-label="Fermer le diagnostic guidé">
            <X aria-hidden="true" />
          </button>
        ) : null}
      </header>

      {!isSummary ? (
        <>
          <div
            className="need-assistant__progress"
            role="progressbar"
            aria-labelledby={progressId}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={progressStep}
            aria-valuetext={`Étape ${progressStep} sur 3`}
          >
            <span id={progressId}>Étape {progressStep} sur 3</span>
            <span aria-hidden="true" style={{ width: `${(progressStep / 3) * 100}%` }} />
          </div>

          {step === 1 ? (
            <fieldset>
              <legend>Que voulez-vous faire ?</legend>
              <div className="need-assistant__choices">
                {NEED_INTENTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    aria-pressed={answers.intent === option.value}
                    onClick={() => chooseIntent(option.value)}
                  >
                    {answers.intent === option.value ? <Check aria-hidden="true" /> : null}
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset>
              <legend>Quel appareil ou contexte est concerné ?</legend>
              <div className="need-assistant__choices">
                {NEED_DEVICES.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    aria-pressed={answers.device === option.value}
                    onClick={() => chooseDevice(option.value)}
                  >
                    {answers.device === option.value ? <Check aria-hidden="true" /> : null}
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 3 ? (
            <div className="need-assistant__details">
              <label htmlFor={`${titleId}-details`}>Décrivez brièvement ce que vous observez</label>
              <textarea
                id={`${titleId}-details`}
                value={answers.details}
                maxLength={DETAILS_LIMIT}
                rows={5}
                placeholder="Ex. : l’ordinateur ralentit après quelques minutes et affiche…"
                onChange={(event) =>
                  setAnswers((current) => ({ ...current, details: event.target.value }))
                }
                aria-describedby={`${titleId}-advice ${titleId}-count`}
              />
              <small id={`${titleId}-count`}>
                {answers.details.length}/{DETAILS_LIMIT} caractères — ne partagez aucun mot de
                passe.
              </small>
              <p id={`${titleId}-advice`} className="need-assistant__advice">
                {getNeedAdvice(answers.intent)}
              </p>
            </div>
          ) : null}

          <footer className="need-assistant__controls">
            {step > 1 ? (
              <button type="button" onClick={() => setStep((current) => current - 1)}>
                <ArrowLeft aria-hidden="true" />
                Retour
              </button>
            ) : (
              <span />
            )}
            <button type="button" disabled={!canContinue} onClick={continueToNext}>
              {step === 3 ? "Préparer mon résumé" : "Continuer"}
            </button>
          </footer>
        </>
      ) : (
        <div className="need-assistant__summary">
          <p>
            Vérifiez et modifiez ce message avant de l’envoyer. Rien n’est transmis ni enregistré
            automatiquement.
          </p>
          <label htmlFor={`${titleId}-summary`}>Résumé de votre besoin</label>
          <textarea
            id={`${titleId}-summary`}
            value={summary}
            rows={10}
            onChange={(event) => {
              setSummary(event.target.value);
              setStatus("");
            }}
          />
          <p className="need-assistant__advice">{getNeedAdvice(answers.intent)}</p>
          <div className="need-assistant__actions">
            {contactLinks.whatsapp ? (
              <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                Ouvrir WhatsApp
              </a>
            ) : null}
            {contactLinks.email ? (
              <a href={contactLinks.email}>
                <Mail aria-hidden="true" />
                Préparer l’e-mail
              </a>
            ) : null}
            <button type="button" onClick={copySummary}>
              <Copy aria-hidden="true" />
              Copier
            </button>
          </div>
          <div className="need-assistant__controls">
            <button type="button" onClick={() => setStep(3)}>
              <ArrowLeft aria-hidden="true" />
              Modifier mes réponses
            </button>
            <button type="button" onClick={restart}>
              <RotateCcw aria-hidden="true" />
              Recommencer
            </button>
          </div>
        </div>
      )}

      <p className="need-assistant__status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
      <p className="need-assistant__privacy">
        Vos réponses restent dans cette page jusqu’à ce que vous choisissiez un canal.
      </p>
    </section>
  );
}
