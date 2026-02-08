const fs = require('fs');
const path = require('path');

console.log('🔍 Validation des articles du blog...\n');

try {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .flatMap(dirent => {
      const categoryDir = path.join(postsDirectory, dirent.name);
      return fs.readdirSync(categoryDir)
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => path.join(dirent.name, fileName));
    });

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