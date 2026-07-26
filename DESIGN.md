---
name: DMAMPRO — L'Atelier Réseau
description: Hub applicatif personnel d'assistance, projets, notes et contacts.
colors:
  deep: "#00111F"
  background: "#010F1B"
  surface: "#051B2D"
  panel: "#082A41"
  border: "#17384C"
  text: "#E5EEF3"
  muted: "#9BB3C2"
  action-blue: "#62AFD6"
  action-amber: "#F3AC29"
  available: "#58CB8E"
  danger: "#D92727"
typography:
  display: { fontFamily: "Roboto Condensed, Arial Narrow, sans-serif", fontSize: "38px", fontWeight: 700, lineHeight: 1 }
  headline: { fontFamily: "Roboto Condensed, Arial Narrow, sans-serif", fontSize: "31px", fontWeight: 700, lineHeight: 1.15 }
  title: { fontFamily: "Roboto Condensed, Arial Narrow, sans-serif", fontSize: "20px", fontWeight: 600, lineHeight: 1.2 }
  body: { fontFamily: "Roboto Condensed, Arial Narrow, sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: 1.45 }
  label: { fontFamily: "Roboto Condensed, Arial Narrow, sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }
rounded:
  none: "0"
  control: "4px"
  panel: "5px"
  circle: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "21px"
  xl: "32px"
components:
  button-primary: { backgroundColor: "{colors.action-amber}", textColor: "{colors.deep}", typography: "{typography.label}", rounded: "{rounded.panel}", height: "46px" }
  panel: { backgroundColor: "{colors.panel}", textColor: "{colors.text}", rounded: "{rounded.panel}", padding: "14px" }
---

# Design System: DMAMPRO — L'Atelier Réseau

## Overview

**Creative North Star: « Le poste de contrôle calme »**

DMAMPRO est un hub applicatif personnel dense, professionnel, lisible et débrouillard. Son langage vient des outils réseau maîtrisés, sans imagerie cyberpunk, effets futuristes gratuits ni esthétique générique d'IA.

**Key Characteristics:** densité utile, hiérarchie nette, panneaux techniques plats, actions explicites et présence humaine d'Adonaï.

## Colors

La palette repose sur des bleus nuit superposés. Le bleu signale la navigation, l'ambre l'action principale, le vert la disponibilité et le rouge les alertes.

- **Nuit profonde** (`#00111F`) : en-tête et fond extrême.
- **Fond réseau** (`#010F1B`) : toile générale.
- **Surface atelier** (`#051B2D`) : panneaux principaux.
- **Panneau actif** (`#082A41`) : commandes et modules élevés par tonalité.
- **Ligne structurelle** (`#17384C`) : séparateurs et bordures.
- **Texte principal** (`#E5EEF3`) et **texte secondaire** (`#9BB3C2`).
- **Bleu action** (`#62AFD6`), **ambre décision** (`#F3AC29`), **vert disponible** (`#58CB8E`).

**La règle des trois signaux.** Bleu pour se déplacer, ambre pour agir, vert pour confirmer.

## Typography

**Display et Body Font:** Roboto Condensed, avec Arial Narrow puis sans-serif en secours.

La condensation permet une interface riche sans perdre sa franchise. Les titres restent courts et lourds ; 12 px est le plancher fonctionnel visé.

- **Display** (700, 38 px, 1) : identité du héros.
- **Headline** (700, 31 px, 1.15) : mission principale.
- **Title** (600, 20 px, 1.2) : identité et grands modules.
- **Body** (400, 14 px, 1.45) : lecture courante.
- **Label** (600, 12 px, 1.3) : états et métadonnées.

## Layout

À 1536 × 1024, la composition utilise un en-tête de 58 px, un héros de 441 px, un parcours de 66 px, un tableau de bord de 342 px et un dock de 117 px. Entre 760 et 1100 px, le shell adopte trois rails de 157 px, une colonne centrale flexible et 153 px. Sous 760 px, le contenu devient une colonne sans défilement horizontal.

## Elevation & Depth

Le système est plat par défaut. La profondeur vient des changements de tonalité, des bordures fines et des gradients contenus ; aucune ombre décorative ni verre flouté.

## Shapes

Les panneaux et commandes emploient des angles courts de 4 à 5 px. Les cercles sont réservés aux états, avatars et étapes.

## Components

### Buttons
- **Primary:** ambre, texte nuit, hauteur 44–46 px, rayon 5 px.
- **Secondary:** transparent, bordure bleu-gris, même géométrie.
- **Focus:** contour ambre de 2 px avec décalage de 2 px.

### Cards / Containers
Panneaux bleu nuit, bordure structurelle de 1 px, rayon de 5 px et séparation par tonalité plutôt que par ombre.

### Navigation
Navigation active en texte clair et filet bleu. Sur tablette, rail latéral persistant ; sur mobile, en-tête compact et contenu vertical.

### Mission Rows
Lignes de 53 px avec icône, intitulé, description et flèche. L'état sélectionné expose `aria-pressed`.

## Do's and Don'ts

### Do:
- **Do** conserver la densité d'un outil de travail réel.
- **Do** réserver l'ambre à l'action prioritaire.
- **Do** utiliser les images réelles d'Adonaï et DrSmoke.
- **Do** conserver des cibles tactiles d'au moins 44 px.

### Don't:
- **Don't** introduire de cyberpunk, néons, verre décoratif ou faux terminal hacker.
- **Don't** transformer le hub en collection de grandes cartes génériques.
- **Don't** employer des textes sous 10 px ou des contrôles factices.
