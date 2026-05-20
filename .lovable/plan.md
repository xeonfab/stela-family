## Objectif

Sur l'image hero pleine largeur de la section « L'objet & le geste » (`steleMains`, ligne 520 de `src/pages/MemorialLP.tsx`), recadrer visuellement sur le centre de la photo sur petits écrans pour mieux voir le détail (mains + stèle), sans toucher au rendu desktop.

## Approche

Utiliser une hauteur fixe responsive sur le conteneur + `object-cover` + `object-center` sur l'image. Cela "crope" naturellement l'image autour de son centre sur mobile, et redevient pleine image sur desktop.

### Changement

Sur le wrapper et le `<img>` actuels :

```tsx
<div className="mt-16 lg:mt-24 overflow-hidden rounded-2xl bg-background
                h-[420px] sm:h-[520px] md:h-auto">
  <img
    src={steleMains}
    alt="..."
    className="w-full h-full md:h-auto object-cover object-center"
    loading="lazy"
  />
</div>
```

### Comportement

- **Mobile (< 640px)** : hauteur fixe ~420px, image recadrée au centre → on voit nettement les mains et la stèle, plus de zone vide.
- **Tablette (sm)** : ~520px, même logique.
- **Desktop (md+)** : `h-auto`, l'image reprend son ratio naturel pleine largeur, identique à aujourd'hui.

### Points d'ajustement possibles

- Hauteur mobile : 380 / 420 / 460 px selon le cadrage souhaité.
- Position du crop : `object-center` par défaut ; on peut passer à `object-[50%_40%]` si le sujet est plus haut dans l'image.

## Hors scope

- Pas de changement de l'image source.
- Pas de modification du reste de la section (titre, specs, citation, grille 3 visuels).
