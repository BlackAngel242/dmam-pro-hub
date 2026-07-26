# Issue — Hub interactif DMAMPRO

Status: accepted
Target: dev puis production après validation
Max iteration rounds: 2

## Goal

Transformer le dashboard en hub réellement interactif, accessible et testable, sans fausses affordances ni collecte implicite de données sensibles.

## Definition of Done

- Tous les contrôles critiques possèdent une action réelle, un état et un libellé exact.
- Diagnostic guidé local en trois étapes avec résumé, WhatsApp, e-mail et fallback Copier.
- Recherche/commande réelle pour services, projets, Notes et contacts.
- Retour accessible pour vCard, copie et ouverture d’application externe.
- Playwright couvre 1536, 864, 390 et 320 px; zéro overflow horizontal.
- Contact mobile: focus initial, piège Tab/Shift+Tab, Escape, restitution du focus.
- Axe: zéro violation serious/critical sur accueil, assistant et dialog Contact.
- `prefers-reduced-motion` garde tous les parcours utilisables.
- CI exécute typecheck, build et E2E avant déploiement.
- Aucune donnée sensible n’est envoyée ou stockée sans action explicite.

## Evidence required

- Sorties typecheck/build/Playwright/Axe.
- Matrice des contrôles et scénarios testés.
- Préversion Netlify inspectée aux quatre viewports.
- Diff Impeccable et statut Git propre.

## Acceptance evidence — 2026-07-26

- TypeScript: passed.
- Production build: passed.
- Playwright: 40 passed, 8 viewport-conditional skips, 0 failed.
- Axe: 0 serious/critical violations at 1536, 864, 390 and 320 px.
- Covered: load/overflow, anchors, mobile navigation, missions, guided assistant, contact focus/Escape, safe destinations, vCard, SEO, robots and sitemap.
