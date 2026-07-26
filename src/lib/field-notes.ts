export type FieldNoteSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type FieldNote = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  updatedAt: string;
  intro: string;
  sections: FieldNoteSection[];
  closing: string;
};

export const FIELD_NOTES: FieldNote[] = [
  {
    slug: "checklist-avant-intervention",
    title: "Checklist rapide avant intervention",
    excerpt: "Les vérifications utiles avant une prise en main à distance.",
    category: "Avant d’appeler",
    readingTime: "4 min",
    updatedAt: "26 juillet 2026",
    intro:
      "Quelques informations bien préparées raccourcissent le diagnostic et évitent des manipulations inutiles. Cette checklist ne demande aucune compétence technique particulière.",
    sections: [
      {
        heading: "Notez ce qui se passe vraiment",
        bullets: [
          "Recopiez le message d’erreur exact ou prenez une photo.",
          "Notez l’heure d’apparition et l’action réalisée juste avant.",
          "Précisez si le problème est constant ou intermittent.",
        ],
      },
      {
        heading: "Préparez le contexte",
        paragraphs: [
          "Identifiez l’appareil, le système utilisé et le logiciel concerné. Gardez vos fichiers importants enregistrés et fermez les documents confidentiels qui ne sont pas utiles à l’intervention.",
        ],
      },
      {
        heading: "Gardez le contrôle",
        paragraphs: [
          "Une assistance à distance doit commencer avec votre accord. Ne transmettez jamais votre mot de passe par message et ne validez pas une action que vous ne comprenez pas.",
        ],
      },
    ],
    closing:
      "Si vous ne savez pas comment décrire le problème, indiquez simplement ce que vous vouliez faire et ce qui vous en a empêché.",
  },
  {
    slug: "garder-logiciels-a-jour",
    title: "Pourquoi garder ses logiciels à jour ?",
    excerpt: "Sécurité, stabilité et compatibilité sans mises à jour aveugles.",
    category: "Maintenance",
    readingTime: "5 min",
    updatedAt: "26 juillet 2026",
    intro:
      "Une mise à jour corrige souvent des failles et des erreurs, mais elle doit être installée au bon moment et depuis une source fiable.",
    sections: [
      {
        heading: "Ce qu’une mise à jour peut corriger",
        bullets: [
          "Des vulnérabilités connues.",
          "Des plantages ou lenteurs.",
          "Des incompatibilités avec des formats et services récents.",
        ],
      },
      {
        heading: "Avant de cliquer sur Installer",
        paragraphs: [
          "Vérifiez l’éditeur, la source du téléchargement, l’espace disponible et l’existence d’une sauvegarde récente. Sur un appareil professionnel, prévoyez un moment où un redémarrage ne bloquera pas votre activité.",
        ],
      },
      {
        heading: "Méfiez-vous des fausses alertes",
        paragraphs: [
          "Une page web qui annonce soudainement plusieurs pilotes obsolètes n’est pas un diagnostic fiable. Passez par les réglages du système ou le site officiel de l’éditeur.",
        ],
      },
    ],
    closing:
      "La meilleure stratégie n’est ni de tout installer immédiatement ni de tout repousser : vérifiez, sauvegardez, puis mettez à jour régulièrement.",
  },
  {
    slug: "nettoyage-systeme-bons-reflexes",
    title: "Nettoyage système : les bons réflexes",
    excerpt: "Libérer de l’espace sans utiliser de solution miracle.",
    category: "Optimisation",
    readingTime: "6 min",
    updatedAt: "26 juillet 2026",
    intro:
      "Un appareil lent n’est pas forcément sale. Avant de supprimer quoi que ce soit, il faut distinguer stockage saturé, application exigeante, manque de mémoire et problème matériel.",
    sections: [
      {
        heading: "Commencez par mesurer",
        bullets: [
          "Regardez l’espace libre restant.",
          "Identifiez les applications actives au démarrage.",
          "Notez le moment précis où les ralentissements apparaissent.",
        ],
      },
      {
        heading: "Supprimez ce que vous reconnaissez",
        paragraphs: [
          "Videz les téléchargements inutiles, les corbeilles et les fichiers temporaires proposés par le système. Pour les gros dossiers, vérifiez leur contenu avant suppression.",
        ],
      },
      {
        heading: "Évitez les nettoyeurs agressifs",
        paragraphs: [
          "Les outils qui promettent de réparer des milliers d’erreurs peuvent supprimer des réglages utiles ou installer d’autres programmes. Les opérations réversibles et documentées sont préférables.",
        ],
      },
    ],
    closing:
      "Si l’appareil reste lent après ces vérifications, un diagnostic permet de décider entre réglage, amélioration matérielle et remplacement.",
  },
  {
    slug: "sauvegardes-avant-la-panne",
    title: "Sauvegardes : ne pas attendre la panne",
    excerpt: "Une méthode simple pour protéger les fichiers qui comptent.",
    category: "Prévention",
    readingTime: "5 min",
    updatedAt: "26 juillet 2026",
    intro:
      "Une sauvegarde utile existe avant l’incident, se trouve ailleurs que sur l’appareil et peut réellement être restaurée.",
    sections: [
      {
        heading: "Commencez par l’irremplaçable",
        bullets: [
          "Documents administratifs et professionnels.",
          "Photos et vidéos personnelles.",
          "Fichiers de projets, mots de passe exportés de façon sécurisée et archives importantes.",
        ],
      },
      {
        heading: "Conservez plusieurs copies",
        paragraphs: [
          "Une base raisonnable consiste à garder les fichiers de travail, une copie sur un support distinct et une autre copie dans un lieu ou service différent. Un disque branché en permanence n’est pas protégé contre tous les incidents.",
        ],
      },
      {
        heading: "Testez la restauration",
        paragraphs: [
          "Ouvrez régulièrement quelques fichiers depuis la sauvegarde. Vérifiez la date de la dernière copie et documentez la procédure pour ne pas la redécouvrir en urgence.",
        ],
      },
    ],
    closing:
      "La meilleure sauvegarde est celle qui fonctionne sans demander un effort exceptionnel chaque semaine.",
  },
];
