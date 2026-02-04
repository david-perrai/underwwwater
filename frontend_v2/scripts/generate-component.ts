import { createInterface } from 'readline';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

type ComponentType = 'atoms' | 'molecules' | 'organisms' | 'templates';

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    readline.question(query, resolve);
  });
};

const toPascalCase = (str: string): string => {
  return str
    .trim()
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

const toKebabCase = (str: string): string => {
  return str
    .trim()
    .split(/[\s-_]+/)
    .map((word) => word.toLowerCase())
    .join('-');
};

const generateVueTemplate = (
  componentName: string,
  type: ComponentType
): string => {
  const kebabName = toKebabCase(componentName);
  const tag = type === 'templates' ? 'section' : 'div';

  return `<script setup lang="ts">
/** Props */

/** Datas */

/** Stores and Composables */

/** Computeds */

/** Functions */

/** Lifecyle Hooks */
</script>

<template>
  <${tag} :class="['${kebabName}']" :data-id="'${kebabName}'"></${tag}>
</template>
`;
};

const generateScssTemplate = (componentName: string): string => {
  const kebabName = toKebabCase(componentName);
  return `.${kebabName} {\n  // Styles here\n}\n`;
};

const ensureDirectoryExists = (dirPath: string): void => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

const addScssImport = (scssPath: string, type: ComponentType, fileName: string): void => {
  const mainScssPath = resolve(scssPath, 'main.scss');
  
  if (!existsSync(mainScssPath)) {
    console.log(`⚠️  Warning: ${mainScssPath} does not exist. Creating it...`);
    writeFileSync(mainScssPath, '');
  }

  const content = readFileSync(mainScssPath, 'utf-8');
  const importStatement = `@import './${type}/${fileName}';\n`;

  if (content.includes(importStatement.trim())) {
    console.log('⚠️  Import already exists in main.scss');
    return;
  }

  // Add import at the end of the file
  writeFileSync(mainScssPath, content + importStatement);
  console.log('✅ Added import to main.scss');
};

const run = async (): Promise<void> => {
  console.log('🚀 Vue Component Generator\n');

  // Ask for component type
  const typeAnswer = await question(
    'Choose component type (1: Atoms, 2: Molecules, 3: Organisms, 4: Templates): '
  );

  const typeMap: Record<string, ComponentType> = {
    '1': 'atoms',
    '2': 'molecules',
    '3': 'organisms',
    '4': 'templates',
  };

  const type = typeMap[typeAnswer.trim()];

  if (!type) {
    console.error('❌ Invalid type selected');
    readline.close();
    return;
  }

  // Ask for component name
  const nameAnswer = await question('\nEnter component name: ');
  const pascalName = toPascalCase(nameAnswer);
  const kebabName = toKebabCase(nameAnswer);

  console.log(`\n📦 Creating component: ${pascalName}`);
  console.log(`   Type: ${type}`);
  console.log(`   Class: ${kebabName}\n`);

  // Define paths
  const componentPath = resolve(process.cwd(), 'app', 'components', type);
  const scssPath = resolve(process.cwd(), 'app', 'assets', 'scss', type);

  // Ensure directories exist
  ensureDirectoryExists(componentPath);
  ensureDirectoryExists(scssPath);

  // Create Vue component
  const vueFilePath = resolve(componentPath, `${pascalName}.vue`);
  if (existsSync(vueFilePath)) {
    const overwrite = await question(
      `⚠️  ${pascalName}.vue already exists. Overwrite? (y/n): `
    );
    if (overwrite.toLowerCase() !== 'y') {
      console.log('❌ Operation cancelled');
      readline.close();
      return;
    }
  }

  writeFileSync(vueFilePath, generateVueTemplate(nameAnswer, type));
  console.log(`✅ Created: ${vueFilePath}`);

  // Create SCSS file
  const scssFileName = `_${kebabName}.scss`;
  const scssFilePath = resolve(scssPath, scssFileName);

  if (existsSync(scssFilePath)) {
    const overwrite = await question(
      `⚠️  ${scssFileName} already exists. Overwrite? (y/n): `
    );
    if (overwrite.toLowerCase() !== 'y') {
      console.log('⚠️  Skipping SCSS file creation');
      readline.close();
      return;
    }
  }

  writeFileSync(scssFilePath, generateScssTemplate(nameAnswer));
  console.log(`✅ Created: ${scssFilePath}`);

  // Add import to main.scss
  addScssImport(resolve(process.cwd(), 'app', 'assets', 'scss'), type, scssFileName);

  console.log('\n🎉 Component generated successfully!\n');

  readline.close();
};

run().catch((error) => {
  console.error('❌ Error:', error);
  readline.close();
  process.exit(1);
});
