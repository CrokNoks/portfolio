# Blog Workflow

## 🚀 Scripts disponibles

### 📝 Créer un nouvel article
```bash
npm run create-post
```
Mode interactif avec questions :
- Titre de l'article
- Description SEO
- Catégorie (techniques | veille-techno | experiences)
- Tags (séparés par des virgules)
- Vedette par défaut
- Image optionnelle

### 🔍 Valider tous les articles
```bash
npm run validate-blog
```
Vérifie le frontmatter de tous les articles et rapporte les erreurs trouvées.

### 📁 Dossier de contenu
```
src/content/blog/
├── techniques/          # Articles techniques
├── veille-techno/      # Articles de veille technologique  
├── experiences/        # Articles expériences
```

### 📁 Fonctionnalités des composants MDX
- **CodeBlock** : Code avec syntax highlighting
- **Callout** : Notes importantes (tip, warning, info, danger)
- **TechStack** : Badges technologies

---

## 🔗 Utilisation

### Création d'un article
1. Exécuter `npm run create-post`
2. Répondre aux questions interactives
3. Le fichier est créé automatiquement avec le bon format
4. Complétez le contenu avec les composants MDX
5. Lancez `npm run build` pour générer les pages statiques

### 🎯 Avantages du système

- **Fichiers individuels** : Un article = un fichier MDX
- **URLs propres** : `/blog/YYYY-MM-DD-titre-article`
- **Validation stricte** : Le script vérifie le frontmatter
- **Extensible** : Facile d'ajouter de nouvelles catégories
- **Performant** : Chargement à la demande uniquement
- **Compatible MDX** : Support complet des composants interactifs

---

## 🛠 Maintenance

La migration vers les fichiers MDX individuels est maintenant complète !