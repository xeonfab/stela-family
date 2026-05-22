## Diagnostic

Aujourd'hui la page d'accueil **est techniquement indexable** par Google :
- `public/robots.txt` autorise tous les robots (`Allow: /`)
- `index.html` ne contient pas de balise `noindex`
- Aucune balise `<meta name="google-site-verification">` n'est posée, donc on ne sait pas si Google a effectivement crawlé/indexé. Sans Search Console connecté, impossible de confirmer le statut réel d'indexation.

**Mais** : comme c'est une SPA Vite, le même `index.html` est servi pour toutes les routes (`/officiants`, `/memorial`, `/pro/...`, `/stela-hq/...`, etc.). Tout est donc actuellement éligible à l'indexation, alors que tu ne veux QUE la page d'accueil.

## Objectif

Rendre indexable uniquement `/`, et bloquer toutes les autres routes.

## Plan

### 1. Ajouter `react-helmet-async` pour gérer le `<head>` par route
- `npm install react-helmet-async`
- Wrapper `<HelmetProvider>` dans `src/main.tsx`

### 2. Page d'accueil = indexable + SEO propre
Dans `src/pages/MemorialLP.tsx` (rendue par `/`), ajouter via `<Helmet>` :
- `<meta name="robots" content="index, follow" />`
- `<link rel="canonical" href="https://stela.family/" />`
- `<meta property="og:url" content="https://stela.family/" />`

### 3. Toutes les autres pages = `noindex`
Créer un petit composant `<NoIndex />` qui pose `<meta name="robots" content="noindex, nofollow" />` via Helmet, et l'inclure en haut de chacune des ~30 autres pages (Memorial, Officiants, PompesFunebres, Acces, MemorialAdmin, InvitationPrivee, EmailInvitation, CreatePassword, OnboardingPhoto, PageModeration, KitCeremonie, ProfilAdmin, GestionAcces, Confidentialite, InvitationVIP, Connexion, MesSanctuaires, CapaciteHeritage, EmailPreview, Bienvenue, Memorial30, MemorialPublic, DesignSystem, Components, Sanctuaire, CopyHome, MemorialLP2, toutes les pages `pro/*` et `stela-hq/*`, NotFound).

### 4. `public/robots.txt`
Garder `Allow: /` global mais ajouter des `Disallow:` explicites pour les sections privées (defense-in-depth, utile car les crawlers basiques n'exécutent pas le JS Helmet) :
```
User-agent: *
Allow: /
Disallow: /pro
Disallow: /stela-hq
Disallow: /memorial-admin
Disallow: /moderation
Disallow: /onboarding
Disallow: /profil
Disallow: /acces
Disallow: /code-acces
Disallow: /connexion
Disallow: /bienvenue
Disallow: /email-preview
Disallow: /design-system
Disallow: /components
Disallow: /copy-home
Disallow: /memoriallp2
Disallow: /invitation
Disallow: /invitation-privee
Disallow: /mes-sanctuaires
Disallow: /capacite
Disallow: /kit-ceremonie
Disallow: /confidentialite
Disallow: /sanctuaire
Disallow: /memorial
Disallow: /memorial30
Disallow: /memorial-public
Disallow: /officiants
Disallow: /pompe-funebre

Sitemap: https://stela.family/sitemap.xml
```

### 5. `public/sitemap.xml`
Créer un sitemap minimal listant uniquement `/`, pour pousser Google à indexer la home.

## Notes
- Pour confirmer l'indexation réelle, il faudra ensuite vérifier le domaine dans Google Search Console (je peux le faire via le connecteur si tu le souhaites, mais c'est une étape séparée).
- L'indexation Google peut prendre plusieurs jours/semaines même une fois ces réglages en place.
