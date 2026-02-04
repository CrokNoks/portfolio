# Portfolio

Portfolio de développeur web moderne construit avec Next.js 15, TypeScript, Tailwind CSS et Framer Motion.

## 🚀 Caractéristiques

- **Design Moderne**: Interface élégante avec animations fluides
- **Responsive**: Optimisé pour tous les appareils
- **Animations**: Transitions et micro-interactions avec Framer Motion
- **Dark Mode**: Thème clair/sombre avec animation de transition
- **Performance**: Optimisé pour de rapides temps de chargement
- **SEO Friendly**: Métadonnées optimisées et sitemap

## 🛠️ Technologies

- **Framework**: Next.js 15 avec App Router
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icônes**: Lucide React
- **Formulaires**: React Hook Form

## 📁 Structure

```
portfolio/
├── src/
│   ├── app/                    # Pages Next.js
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── about/             # Page À propos
│   │   ├── projects/          # Page des projets
│   │   └── contact/           # Page de contact
│   ├── components/            # Composants React
│   │   ├── ui/               # Composants UI réutilisables
│   │   ├── layout/           # Navigation, Footer
│   │   └── sections/         # Sections des pages
│   ├── data/                 # Données statiques
│   └── types/                # Types TypeScript
├── public/                   # Assets statiques
└── tailwind.config.ts        # Configuration Tailwind
```

## 🚀 Démarrage

1. **Installation des dépendances**:
   ```bash
   npm install
   ```

2. **Démarrage du serveur de développement**:
   ```bash
   npm run dev
   ```

3. **Ouverture de l'application**:
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Scripts

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Linting du code

## 🎨 Personnalisation

### Modification des données

Les données du portfolio se trouvent dans `src/data/index.ts`:
- **Projets**: Modifiez la liste des projets
- **Expériences**: Mettez à jour votre parcours
- **Compétences**: Ajoutez ou modifiez vos compétences

### Personnalisation du thème

Le thème peut être personnalisé dans `src/app/globals.css` et `tailwind.config.ts`.

### Ajout de pages

Créez de nouvelles pages dans le dossier `src/app/` en suivant la structure Next.js App Router.

## 🚀 Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez votre dépôt à Vercel
3. Déployez automatiquement

### Autres plateformes

Le projet peut être déployé sur:
- Netlify
- Railway
- Digital Ocean
- Tout autre supportant Next.js

## 📈 SEO

Le portfolio inclut:
- Métadonnées optimisées pour chaque page
- Sitemap XML automatique
- Fichier robots.txt
- Structured data
- Open Graph tags

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à:
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ par [Votre Nom]**
