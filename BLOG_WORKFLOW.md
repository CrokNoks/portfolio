# 📝 Processus de Création d'Articles de Blog

## 🎯 Vue d'ensemble

Ce projet utilise un système de blog moderne basé sur **MDX** avec Next.js 16, permettant de créer des articles riches et interactifs. Chaque article est un fichier MDX individuel avec son propre frontmatter, supportant des composants React personnalisés.

### 🏗️ Architecture

```
src/content/blog/
├── techniques/          # Articles techniques et tutoriels
├── veille-techno/      # Veille technologique et actualités
├── experiences/        # Retours d'expérience et études de cas
└── README.md          # Documentation technique
```

### ✨ Avantages du système

- **Fichiers individuels** : Un article = un fichier MDX
- **URLs propres** : Format `/blog/YYYY-MM-DD-titre-article`
- **Validation automatique** : Vérification du frontmatter
- **Composants riches** : Support MDX avec composants interactifs
- **Build statique** : Performance optimale
- **Catégorisation** : Organisation thématique claire

---

## 🚀 Processus de Création d'Article

### Méthode 1 : Script Interactif (Recommandé)

Lancez le script de création interactif :

```bash
npm run create-post
```

Le script vous posera les questions suivantes :

1. **📝 Titre de l'article**  
2. **📄 Description courte (SEO)**  
3. **📂 Catégorie** : `techniques` | `veille-techno` | `experiences`  
4. **🏷️ Tags** (séparés par des virgules)  
5. **⭐ Article en vedette ?** : `non` | `oui`  
6. **🖼️ Chemin de l'image** (optionnel)  

#### Exemple d'exécution

```bash
🚀 Création d'un nouvel article pour le blog

📝 Titre de l'article : Optimiser les performances React
📄 Description courte (SEO) : Guide complet pour optimiser vos applications React

📂 Catégorie de l'article :
1. techniques
2. veille-techno
3. experiences
Votre choix: 1

🏷️ Tags (séparés par des virgules) : React, Performance, JavaScript

⭐ Article en vedette ?
1. non
2. oui
Votre choix: 1

🖼️ Chemin de l'image (ex: /blog/performance-react.jpg) : /blog/react-perf.svg

✅ Article créé avec succès !
📁 Fichier : /src/content/blog/techniques/2024-12-07-optimiser-performances-react.mdx
🌐 URL : /blog/optimiser-performances-react
```

### Méthode 2 : Création Manuelle

Si vous préférez créer manuellement :

1. **Naviguez vers le dossier de catégorie** :
   ```bash
   cd src/content/blog/techniques  # ou veille-techno/ ou experiences/
   ```

2. **Créez un fichier avec le format de nommage** :
   ```
   YYYY-MM-DD-titre-de-l-article.mdx
   ```

3. **Ajoutez le frontmatter obligatoire** (voir section structure)

4. **Rédigez votre contenu MDX**

5. **Validez avec le script de validation** :
   ```bash
   npm run validate-blog
   ```

---

## 📋 Structure des Fichiers MDX

### Frontmatter Obligatoire

Chaque article MDX doit commencer par :

```yaml
---
title: "Titre de l'article"
description: "Description courte pour SEO et aperçus"
category: "techniques"  # techniques | veille-techno | experiences
tags: ["Tag1", "Tag2", "Tag3"]
publishedAt: "2024-12-07"  # Format YYYY-MM-DD
author: "Lucas GUERRIER"
---

# Titre de l'article

Contenu de l'article ici...
```

### Frontmatter Complet (recommandé)

```yaml
---
title: "Titre de l'article"
description: "Description courte pour SEO et aperçus"
category: "techniques"
tags: ["React", "Performance", "JavaScript"]
publishedAt: "2024-12-07"
featured: false              # true | false - pour la mise en avant
author: "Lucas GUERRIER"
image: "/blog/nom-image.svg"   # Image d'en-tête
---
```

### Règles de Validation

Le script `validate-blog` vérifie que chaque article contient :

- ✅ `title` : Titre de l'article
- ✅ `description` : Description SEO (max 200 caractères)
- ✅ `category` : Catégorie valide
- ✅ `tags` : Tableau de tags (max 5 tags, max 20 caractères chacun)
- ✅ `publishedAt` : Date au format YYYY-MM-DD
- ✅ `author` : Auteur de l'article

---

## 🎨 Composants MDX Disponibles

### CodeBlock

Pour afficher du code avec coloration syntaxique et bouton de copie :

```jsx
<CodeBlock language="jsx">
const Button = ({ children }) => (
  <button className="btn">{children}</button>
);
</CodeBlock>
```

**Props disponibles :**
- `language` : Language du code (javascript, jsx, css, etc.)
- `children` : Code à afficher

### Callout

Pour afficher des notes importantes avec différents styles :

```jsx
<Callout type="tip">
💡 Astuce : Utilisez useMemo pour optimiser les calculs coûteux.
</Callout>

<Callout type="warning">
⚠️ Attention : Cette API est expérimentale.
</Callout>

<Callout type="info">
ℹ️ Information : React 18 introduit les Server Components.
</Callout>

<Callout type="danger">
🚨 Danger : N'utilisez jamais useEffect dans des conditions.
</Callout>
```

**Types disponibles :**
- `tip` : Astuces et conseils
- `warning` : Avertissements
- `info` : Informations générales
- `danger` : Points critiques et erreurs à éviter

### TechStack

Pour afficher les technologies utilisées :

```jsx
<TechStack 
  technologies={[
    { name: "React", color: "#61DAFB" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Next.js", color: "#000000" }
  ]}
/>
```

---

## 📂 Organisation des Catégories

### techniques

**Objectif** : Tutoriels techniques, guides pratiques, optimisations

**Exemples de contenu** :
- Guides de développement
- Optimisations de performance
- Bonnes pratiques
- Patterns de code
- Configurations d'outils

### veille-techno

**Objectif** : Veille technologique, actualités, nouveautés

**Exemples de contenu** :
- Nouvelles versions de frameworks
- Tendances du développement web
- Outils et librairies émergents
- Analyses de marché
- Veille sécurité

### experiences

**Objectif** : Retours d'expérience, études de cas, leadership

**Exemples de contenu** :
- Projets réalisés
- Retours d'expérience
- Gestion d'équipe
- Refactoring d'applications
- Architecture logicielle

---

## 🛠️ Scripts Utilitaires

### Créer un article

```bash
npm run create-post
```

- Mode interactif complet
- Génération automatique du nom de fichier
- Création du template de base
- Support pour toutes les catégories

### Valider tous les articles

```bash
npm run validate-blog
```

- Vérification du frontmatter
- Rapport d'erreurs détaillé
- Validation des formats de dates
- Contrôle des longueurs de champs

### Build et déploiement

```bash
npm run build      # Build en production
npm run start      # Serveur de production
```

Le build génère automatiquement :
- Pages statiques pour tous les articles
- Pages de liste de blog
- Métadonnées SEO
- Sitemap avec les URLs des articles

---

## ✅ Checklist de Publication

Avant de publier un article, vérifiez :

### 📝 Contenu

- [ ] Le titre est accrocheur et informatif
- [ ] La description est optimisée pour le SEO (150-200 caractères)
- [ ] Les tags sont pertinents et bien choisis
- [ ] Le contenu est bien structuré avec des titres
- [ ] Les exemples de code sont testés et fonctionnels

### 🎨 Médias

- [ ] Les images ont des noms descriptifs
- [ ] Les images sont optimisées pour le web
- [ ] Les images sont placées dans `public/blog/`
- [ ] Le format SVG est préféré pour les illustrations

### 🔗 Référencement

- [ ] Les liens internes fonctionnent correctement
- [ ] Les ancres sont valides
- [ ] Les composants MDX sont correctement utilisés

### 🧪 Tests

- [ ] L'article s'affiche correctement en développement
- [ ] Le build passe sans erreur
- [ ] La validation `npm run validate-blog` est OK
- [ ] Les métadonnées OG Twitter sont correctes

---

## 🚨 Dépannage et FAQ

### Erreurs Communes

#### **Article non trouvé**
- **Cause** : Le slug ne correspond pas au nom de fichier
- **Solution** : Vérifiez le format `YYYY-MM-DD-titre.mdx`

#### **Frontmatter invalide**
- **Cause** : Erreur de syntaxe YAML dans le frontmatter
- **Solution** : Utilisez le script `create-post` ou vérifiez l'indentation

#### **Build échoue**
- **Cause** : Erreur de syntaxe MDX ou composant manquant
- **Solution** : Vérifiez la console pour les erreurs détaillées

#### **Images non affichées**
- **Cause** : Chemin incorrect ou fichier manquant dans `public/blog/`
- **Solution** : Placez les images dans `public/blog/` et utilisez `/blog/nom-fichier`

### Validation Échoue

Exécutez `npm run validate-blog` pour voir les erreurs précises :

```bash
❌ Erreurs trouvées :
  - techniques/2024-12-07-article.mdx: Manque: description
  - veille-techno/2024-11-20-news.mdx: Manque: tags
```

Corrigez les champs manquants dans les fichiers MDX concernés.

---

## 🎯 Bonnes Pratiques

### SEO

- **Titres** : Commencez par des mots-clés pertinents
- **Descriptions** : Incluez des mots-clés et un appel à l'action
- **URLs** : Les slugs sont générés automatiquement des titres
- **Images** : Utilisez des alt textes descriptifs

### Performance

- **Images** : Préférez SVG pour les illustrations, WebP pour les photos
- **Code** : Utilisez les composants CodeBlock pour les extraits
- **Chargement** : Les articles sont chargés à la demande

### Accessibilité

- **Contraste** : Vérifiez les couleurs des images
- **Structure** : Utilisez des titres hiérarchiques
- **Liens** : Les Callout peuvent contenir des liens importants

---

## 📚 Références

### Documentation Technique

- **Fonctions blog** : `src/lib/blog.ts`
- **Validation** : `src/lib/blog/validation.ts`
- **Composants MDX** : `src/components/mdx/`

### Scripts

- **Création** : `scripts/create-post.js`
- **Validation** : `scripts/validate-blog.js`

### Configuration

- **Next.js** : `next.config.ts` avec support MDX
- **Types** : `src/types/index.ts` pour les types BlogPost

---

## 🎉 Conclusion

Ce système de blog offre une expérience de création d'articles moderne et efficace. Les scripts automatisés garantissent la cohérence tandis que la flexibilité de MDX permet un contenu riche et interactif.

Pour toute question ou amélioration du système, n'hésitez pas à consulter la documentation technique dans `src/content/blog/README.md` ou à examiner les fichiers de configuration.

**Bon blogging ! 🚀**