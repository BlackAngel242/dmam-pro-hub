import { isContactFieldConfigured, VCARD_DATA, whatsappLink } from "@/lib/vcard";

export const NEED_INTENTIONS = [
  { value: "problem", label: "Résoudre un problème" },
  { value: "install", label: "Installer ou configurer" },
  { value: "infection", label: "Vérifier une infection" },
  { value: "performance", label: "Améliorer les performances" },
] as const;

export const NEED_DEVICES = [
  { value: "computer", label: "Ordinateur" },
  { value: "phone", label: "Téléphone ou tablette" },
  { value: "network", label: "Réseau ou routeur" },
  { value: "other", label: "Autre équipement" },
] as const;

export type NeedIntent = (typeof NEED_INTENTIONS)[number]["value"];
export type NeedDevice = (typeof NEED_DEVICES)[number]["value"];

export type NeedAnswers = {
  intent: NeedIntent | "";
  device: NeedDevice | "";
  details: string;
};

const labelFor = <T extends readonly { value: string; label: string }[]>(
  options: T,
  value: string,
) => options.find((option) => option.value === value)?.label ?? "Non précisé";

export function buildNeedSummary(answers: NeedAnswers): string {
  const intent = labelFor(NEED_INTENTIONS, answers.intent);
  const device = labelFor(NEED_DEVICES, answers.device);
  const details = answers.details.trim() || "Aucun détail supplémentaire.";

  return [
    "Bonjour Adonaï, je vous contacte depuis le diagnostic guidé DMAMPRO.",
    "",
    `Besoin : ${intent}`,
    `Appareil ou contexte : ${device}`,
    `Ce que j’observe : ${details}`,
    "",
    "Je comprends que ce résumé prépare notre échange et ne constitue pas un diagnostic définitif.",
  ].join("\n");
}

export function getNeedAdvice(intent: NeedIntent | ""): string {
  if (intent === "infection") {
    return "Par précaution, évitez les achats, changements de mot de passe et connexions sensibles sur l’appareil concerné. Si possible, déconnectez-le du réseau sans supprimer de fichiers. Ces mesures limitent les risques mais ne confirment pas une infection.";
  }
  if (intent === "performance") {
    return "Évitez les logiciels de “nettoyage miracle”. Notez plutôt quand le ralentissement apparaît et les applications ouvertes à ce moment-là.";
  }
  if (intent === "install") {
    return "Gardez à portée de main le nom exact du logiciel ou de l’équipement, sa version et, si vous en disposez, la preuve de licence.";
  }
  return "Notez le message d’erreur exact et ce qui s’est passé juste avant. Évitez les manipulations irréversibles tant que la cause n’est pas identifiée.";
}

export function buildNeedContactLinks(summary: string): {
  whatsapp: string | null;
  email: string | null;
} {
  const whatsapp = whatsappLink(summary);
  const email = isContactFieldConfigured(VCARD_DATA.email)
    ? `mailto:${VCARD_DATA.email}?subject=${encodeURIComponent(
        "Demande d’assistance DMAMPRO",
      )}&body=${encodeURIComponent(summary)}`
    : null;

  return { whatsapp, email };
}
