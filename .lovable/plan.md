# Connecter le formulaire de la page d'accueil à une base de données

Le formulaire concerné est la **liste d'attente** (`WaitlistDialog`) ouverte depuis les CTA de la page d'accueil. Il collecte aujourd'hui un email + le nombre de foyers, mais n'enregistre rien — un simple `toast` s'affiche.

## Ce qu'il faut faire

### 1. Activer Lovable Cloud
Aucune base n'est encore branchée au projet. Lovable Cloud fournit en un clic :
- une base PostgreSQL
- des règles de sécurité (RLS)
- une API auto-générée utilisable depuis le front

### 2. Créer une table `waitlist_entries`
Colonnes proposées :

| Colonne     | Type        | Notes                                  |
|-------------|-------------|----------------------------------------|
| `id`        | uuid        | Clé primaire, défaut `gen_random_uuid()` |
| `email`     | text        | Non null, validé (format email)        |
| `foyers`    | text        | `'1'`, `'2'` ou `'3+'`                 |
| `source`    | text        | Ex : `'home_waitlist'` (utile plus tard) |
| `created_at`| timestamptz | Défaut `now()`                          |

Contrainte d'unicité sur `email` pour éviter les doublons.

### 3. Sécurité (RLS)
- **INSERT** autorisé à tout le monde (visiteurs anonymes) → un visiteur peut s'inscrire.
- **SELECT / UPDATE / DELETE** refusés au public → seuls vous (via le back-office Lovable Cloud) verrez les inscriptions. Conforme à la philosophie "Sanctuaire" du projet.

### 4. Brancher le formulaire
Dans `src/components/WaitlistDialog.tsx`, remplacer le `toast` simulé par un appel `insert` vers la table, avec :
- validation Zod (email + foyers)
- gestion de l'erreur "email déjà inscrit" (toast spécifique)
- état de chargement sur le bouton (désactivé pendant l'envoi)
- conservation du toast de succès actuel ("Vous êtes sur la liste.")

### 5. Consulter les inscriptions
Une fois en place, les entrées sont visibles depuis le panneau **Cloud → Tables** de Lovable. Possibilité ultérieure d'exporter en CSV ou d'envoyer un email via une edge function.

## Détails techniques

- Aucun changement visuel : le design du dialogue reste identique.
- Pas d'authentification requise pour le visiteur (insertion anonyme protégée par RLS).
- Les autres formulaires du site (`MemorialPublic`, etc.) ne sont **pas** touchés par ce plan.

## À confirmer avant de lancer

1. **Activer Lovable Cloud maintenant ?** (nécessaire — sans ça, pas de base.)
2. **Champs à stocker** : email + foyers suffisent, ou souhaitez-vous aussi un champ `prénom` / `message` ?
3. **Notification** : voulez-vous recevoir un email à chaque nouvelle inscription (via edge function + Resend par ex.), ou juste consulter la table manuellement ?
