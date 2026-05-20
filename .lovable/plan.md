## Installer le Meta Pixel (ID 36437510)

### Constat
- `index.html` ne contient pas le code d'initialisation Meta Pixel.
- Les boutons de `/memoriallp` appellent déjà `fbq('track', 'InitiateCheckout', …)`, mais protégés par `if (window.fbq)` → aujourd'hui ils ne font rien.
- Aucun `PageView` n'est envoyé non plus.

### Modifications

**1. `index.html` — injecter le Pixel dans `<head>`**

Ajouter juste avant `</head>` :

```html
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '36437510');
  fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->
```

**Note technique :** le `<noscript><img></noscript>` du fallback ne peut **pas** être placé dans `<head>` (contrainte HTML5 du projet). Il sera ajouté dans `<body>`, juste après `<div id="root"></div>`.

### Effet
- `PageView` envoyé sur le chargement initial de toutes les pages (SPA → un seul PageView par session, comportement standard).
- Les 3 boutons de `/memoriallp` (`btn-pricing-free`, `btn-pricing-99`, `btn-pricing-249`) déclencheront enfin leur `InitiateCheckout`.

### Hors scope
- Pas de tracking SPA des changements de route (à demander séparément si besoin de PageView par navigation).
- Pas de modification de la logique des boutons (déjà en place).
