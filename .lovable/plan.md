## Problème

Sur mobile (390px), la grille 3 colonnes carrées affiche chaque photo à environ 110px de large — beaucoup trop petit pour apprécier le grain du noyer, le chanfrein ou le verso laiton. Sur desktop, la disposition actuelle reste pertinente.

## Proposition — Carrousel horizontal mobile, grille inchangée desktop

Sur mobile uniquement, remplacer la grille 3 colonnes par un **carrousel horizontal à défilement tactile (swipe)** :

- Chaque photo carrée occupe environ **85% de la largeur écran** (~330px), soit 3× plus grande qu'aujourd'hui.
- Défilement natif `overflow-x-auto` avec `scroll-snap` pour un arrêt net sur chaque photo.
- Petit aperçu de la photo suivante visible à droite, suggérant le swipe.
- Trois petits **indicateurs (dots)** sous le carrousel, en or matte, mettant en évidence la photo active.
- Scrollbar masquée (utilitaire `.scrollbar-hide` déjà présent dans `index.css`).
- Espacement de 12px entre les photos, coins arrondis conservés.

Sur desktop (≥ `sm:` 640px), la grille 3 colonnes carrées reste **strictement identique** à aujourd'hui.

La photo hero (`steleMains`) au-dessus n'est pas modifiée — elle est déjà bien dimensionnée sur mobile.

## Détails techniques

Dans `src/pages/MemorialLP.tsx`, remplacer le bloc lignes 470–482 par un conteneur responsive :

```text
mobile (< sm) :
  flex overflow-x-auto snap-x snap-mandatory scrollbar-hide
  → 3 cartes square w-[85vw] shrink-0 snap-center
  + dots indicateurs (état actif suivi via scroll listener)

desktop (≥ sm) :
  grid grid-cols-3 gap-0  (identique à aujourd'hui)
```

Aucun nouvel asset, aucune dépendance, aucune modification du contenu ou des spécifications en dessous.
