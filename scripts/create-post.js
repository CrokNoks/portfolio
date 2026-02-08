#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { generateSlug, getCategoryDirectory } = require('../lib/blog/validation');

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
    // Récupérer les informations de l'utilisateur
    const title = await question('📝 Titre de l\'article : ');
    const description = await question('📄 Description courte (pour SEO) : ');
    
    const category = await questionWithChoices(
      '📂 Catégorie de l\'article :',
      ['techniques', 'veille-techno', 'experiences']
    );
    
    const tagsInput = await question('🏷️  Tags (séparés par des virgules) : ');
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    const featured = await questionWithChoices(
      '⭐ Article en vedette ?',
      ['non', 'oui']
    ) === 'oui';
    
    const image = await question('🖼️  Chemin de l\'image (ex: /blog/nom-image.jpg) : ');
    
    // Date actuelle
    const publishedAt = new Date().toISOString().split('T')[0];
    
    // Générer le slug
    const slug = generateSlug(title, publishedAt);
    
    // Obtenir le nom de fichier
    const categoryDir = getCategoryDirectory(category);
    const fileName = `${publishedAt}-${slug}.mdx`;
    const filePath = path.join(__dirname, `../content/blog/${categoryDir}/${fileName}`);
    
    // Données pour la génération
    const postData = {
      title,
      description,
      category,
      tags,
      publishedAt,
      featured,
      image
    };
    
    // Générer le contenu MDX
    const content = generateMDXContent(postData);
    
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