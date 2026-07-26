// Registre des projets — structure locale typée.
// Aucun contenu fictif : n'ajouter qu'un projet réel et publiable.
// Les projets véritablement privés ne doivent pas figurer ici, car leur
// nom resterait exposé dans le JavaScript compilé.

export type ProjectCategory = "personal" | "contribution" | "commercial";
export type ProjectVisibility = "public" | "preview" | "private";
export type ProjectUrlKind = "temporary" | "stable";

export type Project = {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  visibility: ProjectVisibility;
  status: string;
  /** Lien principal montré aux visiteurs (public uniquement). */
  websiteUrl?: string;
  /** Information technique distincte — n'est jamais exposée par défaut. */
  repositoryUrl?: string;
  /** Autorise l'exposition explicite du dépôt public. Défaut : false. */
  showRepository?: boolean;
  /** Information de maintenance — invisible côté interface. */
  urlKind?: ProjectUrlKind;
  technologies?: string[];
  featured?: boolean;
  image?: string;
  contributionLabel?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "drshop",
    title: "DrShop",
    summary:
      "Boutique digitale mobile-first proposant des produits et services numériques, avec commande et accompagnement via WhatsApp.",
    category: "commercial",
    visibility: "public",
    status: "En ligne",
    websiteUrl: "https://drshop242.lovable.app",
    urlKind: "temporary",
    showRepository: false,
    featured: true,
    image: "/assets/projects/drshop-og.jpg",
  },
  {
    id: "engagetrack",
    title: "EngageTrack",
    summary:
      "Registre public permettant de rechercher et consulter les listes officielles d'agents et de fonctionnaires congolais.",
    category: "personal",
    visibility: "public",
    status: "En ligne",
    websiteUrl: "https://engagement.dmampro.tech",
    urlKind: "stable",
    showRepository: false,
    featured: false,
    image: "/assets/projects/engagetrack-og.png",
  },
  {
    id: "bisomaptech",
    title: "BisoMapTech",
    summary:
      "Plateforme open source qui cartographie et connecte les talents, lieux et initiatives de la communauté tech en République du Congo.",
    category: "contribution",
    visibility: "public",
    status: "En ligne",
    websiteUrl: "https://bisomaptech.vercel.app",
    urlKind: "temporary",
    showRepository: false,
    contributionLabel: "Projet auquel je contribue",
    technologies: ["React", "TypeScript", "Supabase", "Leaflet"],
    featured: false,
    image: "/assets/projects/bisomaptech-og.png",
  },
  {
    id: "citoyen242",
    title: "Citoyen242",
    summary:
      "Plateforme civique de signalement et de suivi des problèmes urbains, pensée pour rapprocher les habitants et les acteurs locaux.",
    category: "personal",
    visibility: "preview",
    status: "En préparation",
    showRepository: false,
    featured: false,
  },
  {
    id: "nzoto",
    title: "Nzoto",
    summary:
      "Projet de dossier de santé numérique conçu pour faciliter l'accès aux informations médicales utiles.",
    category: "personal",
    visibility: "preview",
    status: "En préparation",
    showRepository: false,
    featured: false,
  },
  {
    id: "securemover",
    title: "SecureMover",
    summary:
      "Outil Windows conçu pour déplacer, sauvegarder et restaurer les dossiers utilisateurs de manière sécurisée et réversible.",
    category: "personal",
    visibility: "preview",
    status: "Projet disponible",
    technologies: ["PowerShell", "Windows", "Pester"],
    showRepository: false,
    featured: false,
  },
  {
    id: "fluxtv",
    title: "FluxTV",
    summary:
      "Projet de navigateur léger pensé pour Android TV, pilotable à la télécommande et basé sur GeckoView.",
    category: "personal",
    visibility: "preview",
    status: "En développement",
    technologies: ["Android TV", "GeckoView", "Kotlin"],
    showRepository: false,
    featured: false,
  },
];

/** Projets rendus au public : `private` est systématiquement exclu. */
export function visibleProjects(): Project[] {
  return PROJECTS.filter((p) => p.visibility !== "private");
}

export function projectsByCategory(category: ProjectCategory): Project[] {
  return visibleProjects().filter((p) => p.category === category);
}

/**
 * URL sûre à exposer aux visiteurs : uniquement pour les fiches `public`.
 * Les fiches `preview` ne produisent aucun lien externe.
 */
export function safeProjectWebsiteUrl(p: Project): string | undefined {
  if (p.visibility !== "public") return undefined;
  return p.websiteUrl;
}

/** Libellé d'action explicite par projet — reste sobre et éditorial. */
export function projectActionLabel(p: Project): string {
  if (p.id === "drshop") return "Ouvrir la boutique";
  return "Ouvrir le site";
}
