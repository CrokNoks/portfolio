const fs = require('fs');
const path = require('path');

console.log('🔍 Validation des articles du blog...\n');

try {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  
  function getAllMdxFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...getAllMdxFiles(fullPath));
      } else if (item.name.endsWith('.mdx') && item.name !== 'SERIES.md') {
        // Exclure SERIES.md et ne garder que les .mdx
        const relativePath = path.relative(postsDirectory, fullPath);
        files.push(relativePath);
      }
    });
    
    return files;
  }
  
  const fileNames = getAllMdxFiles(postsDirectory);

  if (fileNames.length === 0) {
    console.log('❌ Aucun article trouvé');
    process.exit(1);
  }

  console.log(`📝 ${fileNames.length} article(s) trouvé(s)\n`);

  let allValid = true;
  let errors = [];

  fileNames.forEach((filePath, index) => {
    const fullPath = path.join(postsDirectory, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    console.log(`--- Article ${index + 1} ---`);
    console.log(`Fichier: ${filePath}`);
    
    // Déterminer si c'est un article de série
    const pathParts = filePath.split(path.sep);
    const isSeriesArticle = pathParts.length > 1; // category/series/fichier.mdx
    
    // Validation de base - chercher dans le frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let hasTitle = false, hasCategory = false, hasDescription = false, hasDate = false, hasAuthor = false, hasTags = false;
    
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      hasTitle = /title:/.test(frontmatter);
      hasCategory = /category:/.test(frontmatter);
      hasDescription = /description:/.test(frontmatter);
      hasDate = /publishedAt:/.test(frontmatter);
      hasAuthor = /author:/.test(frontmatter);
      hasTags = /tags:/.test(frontmatter);
    }
    
    const articleErrors = [];
    if (!hasTitle) articleErrors.push('Manque: title');
    if (!hasCategory) articleErrors.push('Manque: category');
    if (!hasDescription) articleErrors.push('Manque: description');
    if (!hasDate) articleErrors.push('Manque: publishedAt');
    if (!hasAuthor) articleErrors.push('Manque: author');
    if (!hasTags) articleErrors.push('Manque: tags');
    
    if (articleErrors.length > 0) {
      allValid = false;
      errors.push(`${filePath}: ${articleErrors.join(', ')}`);
      console.log(`❌ ${articleErrors.join(', ')}`);
    } else {
      console.log(`✅ Valide`);
      
      // Extraire et afficher les informations
      const frontmatter = frontmatterMatch[1];
      const title = frontmatter.match(/^title: (.+)$/m)?.[1] || 'N/A';
      const category = frontmatter.match(/^category: (.+)$/m)?.[1] || 'N/A';
      const date = frontmatter.match(/^publishedAt: (.+)$/m)?.[1] || 'N/A';
      const author = frontmatter.match(/^author: (.+)$/m)?.[1] || 'N/A';
      
      console.log(`  Titre: ${title}`);
      console.log(`  Catégorie: ${category}`);
      console.log(`  Date: ${date}`);
      console.log(`  Auteur: ${author}`);
      if (isSeriesArticle) {
        console.log(`  Type: 📚 Article de série`);
      } else {
        console.log(`  Type: 📄 Article autonome`);
      }
    }
    console.log('');
  });

  if (allValid) {
    console.log('✅ Tous les articles sont valides !');
  } else {
    console.log('❌ Erreurs trouvées :');
    errors.forEach(error => console.log(`  - ${error}`));
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Erreur lors de la validation:', error.message);
  process.exit(1);
}