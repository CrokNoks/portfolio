#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
// Fonctions utilitaires extraites de validation.ts
function generateSlug(title, date) {
  const normalizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `${date}-${normalizedTitle}`;
}

function getCategoryDirectory(category) {
  const categoryMap = {
    'techniques': 'techniques',
    'veille-techno': 'veille-techno',
    'experiences': 'experiences'
  };
  
  return categoryMap[category] || 'techniques';
}

const postsDirectory = path.join(__dirname, '../content/blog');

// Fonctions pour les séries
function getExistingSeries(category) {
  const categoryPath = path.join(postsDirectory, category);
  if (!fs.existsSync(categoryPath)) return [];
  
  const items = fs.readdirSync(categoryPath);
  return items.filter(item => {
    const itemPath = path.join(categoryPath, item);
    return fs.statSync(itemPath).isDirectory();
  });
}

function getNextPartNumber(seriesPath) {
  if (!fs.existsSync(seriesPath)) return 1;
  
  const files = fs.readdirSync(seriesPath);
  const numbers = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const match = file.match(/^(\d+)-/);
      return match ? parseInt(match[1]) : 0;
    })
    .filter(num => num > 0);
  
  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
}

function createSeriesMetadata(seriesPath, title, color, totalExpected) {
  const content = `---
title: "${title}"
description: "Série complète pour apprendre ${title.toLowerCase()}"
color: "${color}"
${totalExpected ? `totalExpected: ${totalExpected}` : ''}
---
`;

  const seriesFile = path.join(seriesPath, 'SERIES.md');
  fs.writeFileSync(seriesFile, content, 'utf8');
  return true;
}

function generateSeriesMDXContent(data) {
  const content = `---
title: "${data.title}"
description: "${data.description}"
category: "${data.category}"
tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]
publishedAt: "${data.publishedAt}"
featured: ${data.featured || false}
author: "Lucas GUERRIER"
image: "${data.image}"
---

# ${data.title}

${data.description || ''}

## Contenu à compléter

Ajoutez votre contenu ici en utilisant les composants disponibles :

### Code avec syntax highlighting
\`\`\`jsx
// votre code ici
\`\`\`

### Notes importantes
> Utilisez les Callout pour attirer l'attention

### Technologies utilisées
Affichez les technologies avec le composant TechStack

---

**Instructions :**
1. Complétez le contenu de votre article
2. Utilisez les composants MDX : CodeBlock, Callout, TechStack
3. Sauvegardez le fichier
4. Le build générera automatiquement les pages statiques

**Cet article fait partie de la série :** ${data.seriesTitle}
`;

  return content;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour poser une question
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Fonction pour poser une question avec choix
function questionWithChoices(query, choices) {
  return new Promise(resolve => {
    console.log(query);
    choices.forEach((choice, index) => {
      console.log(`${index + 1}. ${choice}`);
    });
    
    rl.question('Votre choix: ', (answer) => {
      const choiceIndex = parseInt(answer) - 1;
      if (choiceIndex >= 0 && choiceIndex < choices.length) {
        resolve(choices[choiceIndex]);
      } else {
        console.log('Choix invalide. Veuillez réessayer.');
        return questionWithChoices(query, choices).then(resolve);
      }
    });
  });
}

// Fonction pour générer le contenu MDX
function generateMDXContent(data) {
  const content = `---
title: "${data.title}"
description: "${data.description}"
category: "${data.category}"
tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]
publishedAt: "${data.publishedAt}"
featured: ${data.featured || false}
author: "Lucas GUERRIER"
image: "${data.image}"
---

# ${data.title}

${data.description || ''}

## Contenu à compléter

Ajoutez votre contenu ici en utilisant les composants disponibles :

### Code avec syntax highlighting
\`\`\`jsx
// votre code ici
\`\`\`

### Notes importantes
> Utilisez les Callout pour attirer l'attention

### Technologies utilisées
Affichez les technologies avec le composant TechStack

---

**Instructions :**
1. Complétez le contenu de votre article
2. Utilisez les composants MDX : CodeBlock, Callout, TechStack
3. Sauvegardez le fichier
4. Le build générera automatiquement les pages statiques
`;

  return content;
}

async function createPost() {
  console.log('🚀 Création d\'un nouvel article pour le blog\\n');

  try {
    // Demander si c'est un article de série
    const seriesChoice = await questionWithChoices(
      '📚 Cet article appartient-il à une série ?',
      ['non - Article autonome', 'oui - Article dans une série existante', 'créer - Créer une nouvelle série']
    );

    let seriesData = null;
    let isSeriesArticle = false;

    if (seriesChoice === 'créer - Créer une nouvelle série') {
      // Créer une nouvelle série
      const seriesTitle = await question('🎯 Titre de la série : ');
      const seriesId = seriesTitle.toLowerCase()
        .replace(/[^a-z0-9\\s-]/g, '')
        .replace(/\\s+/g, '-');
      
      const colorChoices = [
        'from-blue-500 to-purple-500',
        'from-green-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-pink-500 to-rose-500',
        'from-indigo-500 to-blue-500',
        'from-yellow-500 to-orange-500'
      ];
      
      const color = await questionWithChoices(
        '🎨 Couleur de la série :',
        colorChoices
      );
      
      const totalExpected = await question('📊 Nombre total d\'articles prévus (optionnel, laissez vide si inconnu) : ');
      const total = totalExpected.trim() === '' ? null : parseInt(totalExpected);

      seriesData = {
        id: seriesId,
        title: seriesTitle,
        color: color,
        totalExpected: total,
        isNew: true
      };
      isSeriesArticle = true;

    } else if (seriesChoice === 'oui - Article dans une série existante') {
      // Choisir une série existante
      const category = await questionWithChoices(
        '📂 Catégorie de la série :',
        ['techniques', 'veille-techno', 'experiences']
      );
      
      const existingSeries = getExistingSeries(category);
      if (existingSeries.length === 0) {
        console.log('❌ Aucune série existante dans cette catégorie.');
        process.exit(1);
      }
      
      const seriesChoice = await questionWithChoices(
        '📚 Quelle série ?',
        existingSeries
      );
      
      const seriesPath = path.join(postsDirectory, category, seriesChoice);
      const seriesFile = path.join(seriesPath, 'SERIES.md');
      
      let seriesTitle = seriesChoice;
      let color = 'from-gray-500 to-gray-700';
      let totalExpected = null;
      
      if (fs.existsSync(seriesFile)) {
        const content = fs.readFileSync(seriesFile, 'utf8');
        const titleMatch = content.match(/title: "([^"]+)"/);
        const colorMatch = content.match(/color: "([^"]+)"/);
        const totalMatch = content.match(/totalExpected: (\\d+)/);
        
        if (titleMatch) seriesTitle = titleMatch[1];
        if (colorMatch) color = colorMatch[1];
        if (totalMatch) totalExpected = parseInt(totalMatch[1]);
      }
      
      seriesData = {
        id: seriesChoice,
        title: seriesTitle,
        color: color,
        totalExpected: totalExpected,
        category: category,
        isNew: false
      };
      isSeriesArticle = true;
    }

    // Récupérer les informations de l'article
    const title = await question('📝 Titre de l\'article : ');
    const description = await question('📄 Description courte (pour SEO) : ');
    
    let category;
    if (!isSeriesArticle || seriesData.isNew) {
      category = await questionWithChoices(
        '📂 Catégorie de l\'article :',
        ['techniques', 'veille-techno', 'experiences']
      );
    } else {
      category = seriesData.category;
    }
    
    const tagsInput = await question('🏷️  Tags (séparés par des virgules) : ');
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    const featured = await questionWithChoices(
      '⭐ Article en vedette ?',
      ['non', 'oui']
    ) === 'oui';
    
    const image = await question('🖼️  Chemin de l\'image (ex: /blog/nom-image.jpg) : ');
    
    // Date actuelle
    const publishedAt = new Date().toISOString().split('T')[0];
    
    let filePath, fileName, slug, content;

    if (isSeriesArticle) {
      // Article de série
      const seriesPath = path.join(postsDirectory, category, seriesData.id);
      
      // Créer le dossier de la série si c'est une nouvelle série
      if (seriesData.isNew) {
        if (!fs.existsSync(seriesPath)) {
          fs.mkdirSync(seriesPath, { recursive: true });
        }
        createSeriesMetadata(seriesPath, seriesData.title, seriesData.color, seriesData.totalExpected);
        console.log(`✅ Série "${seriesData.title}" créée !`);
      }
      
      // Obtenir le prochain numéro de partie
      const partNumber = getNextPartNumber(seriesPath);
      const paddedPart = partNumber.toString().padStart(2, '0');
      const articleSlug = generateSlug(title);
      fileName = `${paddedPart}-${articleSlug}.mdx`;
      filePath = path.join(seriesPath, fileName);
      slug = articleSlug;
      
      const postData = {
        title,
        description,
        category,
        tags,
        publishedAt,
        featured,
        image,
        seriesTitle: seriesData.title
      };
      
      content = generateSeriesMDXContent(postData);
      
      console.log(`📚 Article créé dans la série "${seriesData.title}" - Partie ${partNumber}`);
      
    } else {
      // Article autonome (logique existante)
      const categoryDir = getCategoryDirectory(category);
      slug = generateSlug(title, publishedAt);
      fileName = `${publishedAt}-${slug}.mdx`;
      filePath = path.join(__dirname, `../content/blog/${categoryDir}/${fileName}`);
      
      const postData = {
        title,
        description,
        category,
        tags,
        publishedAt,
        featured,
        image
      };
      
      content = generateMDXContent(postData);
    }
    
    // Créer le répertoire s'il n'existe pas
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Écrire le fichier
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('\\n✅ Article créé avec succès !');
    console.log(`📁 Fichier : ${filePath}`);
    console.log(`🌐 URL : /blog/${slug}`);
    console.log(`🏷️  Tags : ${tags.join(', ')}`);
    console.log(`⭐ Vedette : ${featured ? 'Oui' : 'Non'}`);
    console.log(`📅 Publié le : ${publishedAt}`);
    
    if (isSeriesArticle) {
      console.log(`📚 Série : ${seriesData.title}`);
      if (seriesData.totalExpected) {
        console.log(`📊 Progression : ${getNextPartNumber(path.join(postsDirectory, category, seriesData.id)) - 1}/${seriesData.totalExpected} parties`);
      }
    }
    
    console.log('\\n📝 Instructions pour compléter l\'article :');
    console.log('1. Ouvrez le fichier généré');
    console.log('2. Complétez le contenu dans la section "Contenu à compléter"');
    console.log('3. Utilisez les composants MDX disponibles :');
    console.log('   - CodeBlock : pour le code avec syntax highlighting');
    console.log('   - Callout : pour les notes importantes');
    console.log('   - TechStack : pour afficher les technologies');
    console.log('4. Lancez "npm run build" pour générer les pages statiques');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'article :', error.message);
  } finally {
    rl.close();
  }
}

// Gérer les arguments de ligne de commande
const args = process.argv.slice(2);

if (args.length > 0) {
  // Mode non-interactif avec arguments
  console.log('🚀 Mode non-interactif détecté');
  console.log('Utilisez "npm run create-post" pour le mode interactif');
  process.exit(0);
}

// Lancer le mode interactif
createPost().catch(error => {
  console.error('❌ Erreur inattendue :', error);
  process.exit(1);
});