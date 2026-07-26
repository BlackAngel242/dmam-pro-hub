---
name: DMAMPRO Personal Hub
description: Un atelier réseau personnel qui relie problèmes, conseils, projets et contacts.
colors:
  signal-orange: "#F25C2A"
  signal-orange-deep: "#C83E15"
  graphite: "#17202B"
  canvas: "#F7F8F6"
  surface: "#FFFFFF"
  muted-ink: "#66717F"
  divider: "#D8DEE5"
  success: "#278A58"
  warning: "#B56A00"
  danger: "#C43B3B"
typography:
  dashboard:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.surface}"
    typography:
  dashboard:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45 "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.signal-orange-deep}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite}"
    typography:
  dashboard:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45 "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: DMAMPRO Personal Hub

## Overview

**Creative North Star: "L'Atelier Réseau"**

DMAMPRO ressemble à un outil personnel bien organisé : plusieurs capacités reliées, un état toujours compréhensible et une action claire à chaque étape. L'interface emprunte au routeur et au Flipper Zero leur logique modulaire et leur franchise fonctionnelle, jamais leur imagerie hacker.

La composition est structurée, compacte sur mobile et plus spatiale sur grand écran. Les connexions entre aide, projets, conseils et contact sont visibles par la hiérarchie et la navigation, pas par des lignes décoratives ou une fausse carte réseau. La personnalité vient des preuves, des choix éditoriaux et de quelques détails tactiles.

Le système refuse le cyberpunk, les néons, le faux terminal, le beige éditorial, le romantisme et les landing pages génériques produites par IA.

**Key Characteristics:**

- applicatif avant promotionnel ;
- professionnel sans froideur ;
- dense mais immédiatement lisible ;
- orange rare et fonctionnel ;
- preuves réelles avant déclarations ;
- mobile conçu comme surface principale.

## Colors

Une base neutre froide et nette laisse l'orange signal guider l'action sans transformer l'interface en décor technologique.

### Primary

- **Orange Signal** : réservé aux actions principales, à la sélection active et aux états exigeant une réponse.
- **Orange Signal Profond** : état pressé ou survolé du primaire, jamais une seconde couleur décorative.

### Secondary

- **Graphite Opérateur** : texte principal, navigation structurante et surfaces inversées ponctuelles.

### Tertiary

- **Vert Confirmé**, **Ambre Attention** et **Rouge Incident** : uniquement pour leurs états sémantiques respectifs.

### Neutral

- **Canvas Technique** : fond général, légèrement distinct du blanc sans teinte beige.
- **Surface Nette** : panneaux de travail, contrôles et zones de contenu.
- **Encre Secondaire** : descriptions et métadonnées, jamais du texte essentiel à faible contraste.
- **Séparateur Matériel** : structure les zones sans créer une grille de boîtes omniprésente.

### Named Rules

**The Signal Rule.** L'orange représente une action, une sélection ou un état. S'il ne communique rien, il disparaît.

**The No Neon Rule.** Aucun cyan électrique, violet lumineux, halo ou gradient multicolore ne simule une esthétique hacker.

## Typography

**Display Font:** Inter (avec `ui-sans-serif`, `system-ui`, `sans-serif`)
**Body Font:** Inter (avec `ui-sans-serif`, `system-ui`, `sans-serif`)

**Character:** Une seule famille assure la continuité entre conseil humain et outil numérique. La personnalité repose sur la hiérarchie, le poids et la précision, pas sur une serif éditoriale ou un monospace de costume.

### Hierarchy

- **Headline** (700, 2.25rem, 1.08) : identité, intention principale et titres d'écran.
- **Title** (650, 1.25rem, 1.2) : modules, projets et décisions locales.
- **Body** (400, 1rem, 1.6) : explications limitées à 70 caractères environ par ligne.
- **Label** (600, 0.8125rem, 0.01em) : contrôles, statuts et métadonnées courtes en casse normale.

### Named Rules

**The Plain Language Rule.** Aucun style typographique ne doit rendre un terme technique plus intimidant qu'il ne l'est.

**The No Costume Rule.** Le monospace est réservé aux données réellement techniques, jamais aux titres, menus ou boutons pour « faire hacker ».

## Elevation

Le système est plat par défaut. La profondeur vient des couches tonales, des séparateurs et de la superposition fonctionnelle. Une ombre courte apparaît uniquement quand un élément flotte réellement, comme un menu ou un panneau temporaire.

### Shadow Vocabulary

- **Flottant** (`0 4px 8px rgba(23, 32, 43, 0.12)`) : menus, popovers et panneaux déplacés au-dessus du contenu.
- **Focus** (`0 0 0 3px rgba(242, 92, 42, 0.24)`) : indication clavier autour des contrôles interactifs.

### Named Rules

**The Flat-by-Default Rule.** Une surface au repos n'a pas d'ombre. Si une boîte a besoin d'une grande ombre pour être visible, sa hiérarchie est mauvaise.

## Components

Les composants sont tactiles, professionnels et compacts. Chaque état doit rester identifiable sans dépendre uniquement de la couleur.

### Buttons

- **Shape:** rectangle doucement arrondi (10px), jamais une pilule par défaut.
- **Primary:** Orange Signal, texte blanc, hauteur tactile minimale de 44px et espacement interne de 12px par 18px.
- **Hover / Focus:** orange approfondi au survol, déplacement maximal de 1px à l'appui, anneau de focus visible.
- **Secondary / Ghost:** surface blanche et contour séparateur ; le ghost est réservé aux actions de moindre importance.

### Chips

- **Style:** petits statuts à rayon de 6px, fond tonal et texte explicite.
- **State:** sélection indiquée par fond, libellé et icône éventuelle ; jamais par une couleur seule.

### Cards / Containers

- **Corner Style:** courbe modérée (14px maximum).
- **Background:** Surface Nette sur Canvas Technique, Graphite Opérateur pour une zone inversée rare.
- **Shadow Strategy:** aucune ombre au repos.
- **Border:** séparateur discret uniquement lorsque la frontière aide à comprendre le regroupement.
- **Internal Padding:** 16px sur mobile, 24px sur les panneaux majeurs.

### Inputs / Fields

- **Style:** fond blanc, contour séparateur, rayon de 10px et hauteur minimale de 44px.
- **Focus:** contour Orange Signal et anneau Focus.
- **Error / Disabled:** texte explicite avec état sémantique ; le désactivé conserve un contraste lisible.

### Navigation

Une barre compacte expose les destinations principales et l'état courant. Sur mobile, les actions fréquentes restent accessibles sans masquer le contenu. Les libellés sont directs et l'état actif combine fond tonal, poids et indicateur.

### Module de mission

Le composant signature transforme une intention visiteur en chemin court : besoin formulé, preuve ou capacité pertinente, action suivante. Il n'imite ni un terminal ni une conversation IA.

## Do's and Don'ts

### Do:

- **Do** utiliser l'Orange Signal uniquement pour l'action principale, la sélection et les états importants.
- **Do** montrer des captures, liens, rôles et résultats réels pour chaque projet.
- **Do** conserver des actions tactiles d'au moins 44px et des focus visibles.
- **Do** différencier les modules par leur fonction plutôt que répéter une carte identique.
- **Do** garder les transitions entre 150 et 250 ms et les limiter aux changements d'état.
- **Do** rendre WhatsApp, les projets et la vCard accessibles en moins de trois décisions.

### Don't:

- **Don't** utiliser une esthétique cyberpunk, des néons, une pluie numérique ou de faux terminaux.
- **Don't** produire une landing page générique d'IA composée d'une hero et de grilles répétitives de cartes SaaS.
- **Don't** revenir à un univers beige éditorial, romantique ou « à l'eau de rose ».
- **Don't** employer du jargon hacker ou développeur comme costume visuel ou rédactionnel.
- **Don't** utiliser une serif décorative ou un monospace dans les contrôles applicatifs.
- **Don't** employer de gradient de texte, glassmorphism décoratif, coins supérieurs à 16px ou grandes ombres diffuses.
- **Don't** afficher de promesses exagérées, de faux chiffres ou de compétences inventées.
- **Don't** ajouter d'animation envahissante ou d'effet spectaculaire sans retour fonctionnel.
- **Don't** concevoir une interface froide qui efface la personne derrière les projets.
