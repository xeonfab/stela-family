## Contexte
Modification de la section "L'objet & le geste" sur la landing page `/memoriallp`.

## Changements

### 1. Ligne de provenance sous l'eyebrow
Sous le `<p>` eyebrow "L'objet & le geste", ajouter :
> "ÉBÉNISTERIE FRANÇAISE · NOYER MASSIF · FAIT À LA MAIN"

Style : petites capitales, couleur primary (doré), tracking large, texte très petit, centré.

### 2. Bloc artisanal sous le tableau de specs
Sous le `<dl>` du tableau de specs (colonne de gauche), ajouter un bloc texte :
> "Chaque stèle est façonnée à la main par un ébéniste français. Le noyer est sélectionné pour ses veines, huilé pour durer. Conçu pour traverser les générations."

Style :
- Police : Cormorant Garamond italic (nouvelle police Google Fonts à importer)
- Taille : identique à la citation existante (`text-xl lg:text-2xl`)
- Couleur : `text-muted-foreground`
- Alignement : gauche (`text-left`)

### 3. Import police
Ajouter Cormorant Garamond (italique 400/500/600) à l'import Google Fonts dans `src/index.css`.

## Fichiers concernés
- `src/index.css` — ajout de la police
- `src/pages/MemorialLP.tsx` — insertion des deux éléments

## Étapes techniques
1. Mettre à jour l'import Google Fonts dans `index.css`
2. Ajouter la ligne de provenance sous l'eyebrow (ligne ~529)
3. Envelopper le `<dl>` des specs dans une `<div>` et ajouter le bloc texte en dessous (ligne ~576)
4. Vérifier le rendu visuel dans l'aperçu