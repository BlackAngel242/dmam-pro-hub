// vCard v3.0 — Adonaï MOUZITA (DMAMPRO)
// Les coordonnées non renseignées doivent rester vides. Aucun lien externe
// ne doit être généré à partir d'une donnée non configurée.

export type ContactData = {
  fullName: string;
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  // URL publique canonique du hub — vide tant qu'elle n'est pas confirmée.
  siteUrl: string;
  // Champs optionnels — vides tant qu'ils ne sont pas réellement fournis.
  phone: string;
  whatsapp: string;
  email: string;
  facebook: string;
  github: string;
};

export const VCARD_DATA: ContactData = {
  fullName: "Adonaï MOUZITA",
  firstName: "Adonaï",
  lastName: "MOUZITA",
  organization: "DMAMPRO",
  title: "Informaticien spécialisé en support IT",
  // Aucun domaine public DMAMPRO n'est confirmé.
  siteUrl: "https://dmam-pro-hub.netlify.app",
  phone: "+242066507275",
  whatsapp: "+242066507275",
  email: "dmampro@gmail.com",
  facebook: "https://www.facebook.com/dmampro",
  github: "https://github.com/BlackAngel242",
};

// Toute valeur vide, marquée [À REMPLACER], ou reconnue comme placeholder
// (000000, exemple, dmampro générique) est considérée comme non configurée.
const PLACEHOLDER_PATTERNS = [
  /\[?à\s*remplacer\]?/i,
  /placeholder/i,
  /example\.com/i,
  /exemple/i,
  /000000/,
];

export function isContactFieldConfigured(value: string | null | undefined): value is string {
  if (!value) return false;
  const v = value.trim();
  if (!v) return false;
  return !PLACEHOLDER_PATTERNS.some((re) => re.test(v));
}

/** Normalise un numéro international pour usage tel:/wa.me (chiffres seuls). */
function digitsOnly(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function buildVCard(): string {
  const d = VCARD_DATA;
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${d.lastName};${d.firstName};;;`,
    `FN:${d.fullName}`,
    `ORG:${d.organization}`,
    `TITLE:${d.title}`,
  ];
  if (isContactFieldConfigured(d.siteUrl)) {
    lines.push(`URL:${d.siteUrl}`);
  }
  const phoneConfigured = isContactFieldConfigured(d.phone);
  const whatsappConfigured = isContactFieldConfigured(d.whatsapp);
  const sameNumber =
    phoneConfigured && whatsappConfigured && digitsOnly(d.phone) === digitsOnly(d.whatsapp);
  if (phoneConfigured) {
    lines.push(`TEL;TYPE=CELL:${d.phone}`);
  }
  if (whatsappConfigured && !sameNumber) {
    lines.push(`TEL;TYPE=CELL,TEXT:${d.whatsapp}`);
  }
  if (isContactFieldConfigured(d.email)) {
    lines.push(`EMAIL;TYPE=INTERNET:${d.email}`);
  }
  if (isContactFieldConfigured(d.facebook)) {
    lines.push(`URL;TYPE=Facebook:${d.facebook}`);
  }
  if (isContactFieldConfigured(d.github)) {
    lines.push(`URL;TYPE=GitHub:${d.github}`);
  }
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

/**
 * Ouvre la vCard pour permettre l'ajout aux contacts.
 * - Le type MIME `text/vcard;charset=utf-8` est privilégié afin que les
 *   systèmes compatibles proposent la fiche.
 * - En repli, un navigateur non compatible téléchargera simplement le
 *   fichier .vcf : l'utilisateur pourra l'ouvrir manuellement.
 */
export function openVCard() {
  if (typeof window === "undefined") return;
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "adonai-mouzita.vcf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/** Lien WhatsApp — ne renvoie une URL que si le numéro est configuré. */
export function whatsappLink(
  message = "Bonjour Adonaï, je vous contacte depuis votre hub DMAMPRO.",
): string | null {
  if (!isContactFieldConfigured(VCARD_DATA.whatsapp)) return null;
  const num = digitsOnly(VCARD_DATA.whatsapp);
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(): string | null {
  if (!isContactFieldConfigured(VCARD_DATA.email)) return null;
  return `mailto:${VCARD_DATA.email}`;
}

export function telLink(): string | null {
  if (!isContactFieldConfigured(VCARD_DATA.phone)) return null;
  return `tel:${VCARD_DATA.phone.replace(/\s+/g, "")}`;
}

/** URL publique canonique — null tant qu'elle n'est pas confirmée. */
export function siteUrl(): string | null {
  return isContactFieldConfigured(VCARD_DATA.siteUrl) ? VCARD_DATA.siteUrl : null;
}
