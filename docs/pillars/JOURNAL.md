# Journal opérationnel

## Rôle

Chronologie factuelle des travaux. Chaque entrée note le contexte, l'action, le résultat, la preuve et la suite.

## 2026-07-26

- Migration du projet vers `C:\Users\DrSmoke\Music\DMAM PRO`.
- Création et publication de `BlackAngel242/dmam-pro-hub`.
- Déploiement de production sur `https://dmam-pro-hub.netlify.app`.
- Reconstruction du hub à partir des deux maquettes 1536 × 1024 et 864 × 1821.
- Validation des géométries exactes : bureau 1536 × 1024 ; tablette 157 / 554 / 153 et 864 × 1821.
- Mise en place de GitHub Actions pour déployer automatiquement `main` sur Netlify.
- Premier audit Impeccable : 10/20, 120 écarts de contrat, image principale de 2,24 Mo, liens et affordances à durcir.
- Décision : exécuter `document → optimize → harden → adapt → polish → audit`.

## Passe Impeccable complète

- document : contrat sombre reconstruit et sidecar actualisé.
- optimize : portrait principal décliné en WebP 640/960/1400 ; transfert réduit de 2,24 Mo à 22–79 Ko.
- harden : ancre Projets, icônes d'en-tête, réseaux sociaux, notes et vCard vérifiés.
- adapt : cibles tactiles de 44 px, safe area et mouvement réduit.
- polish : aucun débordement à 1536, 864, 390 et 320 px ; aucune erreur console.
- Audit final : 0 warning, 55 avis de nuances chromatiques exactes contre 120 écarts avant correction.

## Navigation mobile adaptative

- Étude de la barre mobile du dépôt privé DrShop : auto-masquage directionnel, safe area, panneau d’actions et restauration du focus.
- Adaptation DMAMPRO : Accueil, Assistance, Projets, Notes et Contact, avec section active détectée automatiquement.
- Améliorations : barre toujours visible aux extrémités, panneau Contact réel, verrouillage du défilement, piège de focus et fermeture par Échap.
- Préversion Netlify compilée : https://6a65eab67cac9a4b1350596b--dmam-pro-hub.netlify.app.

## P0 acquisition, confiance et identité sociale

- Conseil spécialisé SEO, copywriting, storytelling et identité sociale constitué et audité.
- Correctif mobile final publié sur GitHub (`58c9fa2`).
- Carte Open Graph DMAMPRO produite en 1200 × 630, JPEG 94 Ko, avec portrait réel et composition sans esthétique cyberpunk.
- Pack favicon régénéré et validé : SVG, ICO multi-tailles 16/32/48, Apple 180, Android 192/512 et maskable.
- Ajout local du canonical Netlify, OG/Twitter, JSON-LD WebSite + Person, robots.txt, sitemap.xml et webmanifest.
- H1 rendu unique ; activités et dates fictives remplacées par des mises à jour publiques vérifiables.
- Promesses absolues remplacées par des formulations de méthode et de disponibilité raisonnables.
- Préversion P0 compilée : https://6a65f701b8282f190a619bbc--dmam-pro-hub.netlify.app.

## 2026-07-26 — Hub interaction layer

Added a real command palette, privacy-first guided need assistant, responsive dialogs, WCAG contrast correction, and Playwright/Axe acceptance gate. Final local evidence: 40 passed, 8 conditional skips, 0 failed.

## 2026-07-26 — Project gallery

Cached verified project imagery locally: DrShop OG, EngageTrack 512 icon, and BisoMapTech public icon fallback because its declared /og-image.png returns 404. The featured project is excluded from the rotating project deck. Deck rotates every 15 seconds, pauses on hover/focus, supports manual navigation, and respects reduced motion.
