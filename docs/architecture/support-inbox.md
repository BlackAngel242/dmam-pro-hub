# DMAMPRO Support Inbox — architecture cible

Status: planned — UI locale disponible, persistance non activée

## Décision

Conserver le monolithe TanStack Start sur Netlify. Utiliser Supabase pour PostgreSQL, Auth et RLS, des fonctions serveur TanStack/Netlify comme frontière publique, Resend pour les notifications e-mail et Turnstile pour l’anti-spam.

Netlify Forms ne convient qu’à un formulaire sans fil de discussion. Le besoin DMAMPRO comprend demandes, statuts, réponses, notifications et historique : Supabase devient la source de vérité appropriée.

## Parcours

1. Le visiteur choisit un problème ou termine un billet.
2. Le diagnostic produit une demande structurée.
3. `POST /api/requests` valide les données, le consentement, le honeypot et Turnstile.
4. La fonction serveur écrit la demande et son premier message dans Supabase.
5. Le panel reçoit une notification; Resend prévient l’administrateur.
6. L’administrateur répond dans `/admin`.
7. Le visiteur reçoit un lien de suivi sécurisé et peut poursuivre le fil sans compte.

WhatsApp reste un canal externe tant que WhatsApp Business API n’est pas configuré.

## Données principales

- `profiles`: utilisateurs admin/agent et rôles.
- `requests`: référence publique, statut, intention, appareil, identité minimale, canal choisi, consentement, priorité et jeton de suivi haché.
- `request_messages`: fil visiteur/admin, canal et état de livraison.
- `request_events`: journal append-only des changements.
- `notifications`: non-lus, nouvelle demande, nouvelle réponse, échec de livraison.

Aucune clé service role, aucun jeton brut et aucune adresse IP brute ne doivent atteindre le navigateur ou la base métier.

## Sécurité

- Admin uniquement via Supabase Auth; MFA recommandé.
- Aucune inscription admin publique.
- Tables privées protégées par RLS; création publique uniquement via fonction serveur.
- Jeton de suivi 256 bits, seul son hash est stocké.
- Validation Zod stricte, texte brut, tailles limitées, honeypot, Turnstile et rate limiting Netlify.
- Consentement explicite avant stockage et politique de rétention 12–24 mois.
- Aucun mot de passe, code bancaire ou document d’identité demandé dans le formulaire.

## Variables requises

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_TURNSTILE_SITE_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
NOTIFICATION_FROM_EMAIL=
ADMIN_NOTIFICATION_EMAIL=
PUBLIC_SITE_URL=
THREAD_TOKEN_PEPPER=
```

Les deploy previews ne doivent jamais écrire dans la base de production.

## Phases

1. Lecteur de Notes et diagnostic contextuel, avec WhatsApp/e-mail réels.
2. Supabase, migrations, RLS, endpoint de création, anti-spam et notification admin.
3. `/admin/login`, boîte de réception, statuts, non-lus et réponses.
4. Lien visiteur sécurisé et conversation dans le hub.
5. MFA, tests RLS/E2E, rétention, observabilité et éventuellement édition des Notes depuis le panel.

## Blocage actuel

La phase 2 nécessite la création ou la connexion d’un projet Supabase, un domaine d’envoi Resend validé et les secrets ci-dessus. Tant qu’ils ne sont pas fournis, l’interface doit annoncer clairement que WhatsApp/e-mail sont les seuls canaux réellement transmis.
