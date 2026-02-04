import { createInterface } from 'readline';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const toCamelCase = (str: string): string => {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const generateStoreTemplate = (storeName: string): string => {
  const camelName = toCamelCase(storeName);
  const pascalName = toPascalCase(storeName);
  
  return `import { defineStore } from 'pinia';

/**
 * ${pascalName} Store
 * @description Add your store description here
 */
export const use${pascalName}Store = defineStore('${camelName}', () => {
  /** State */

  /** Getters */

  /** Actions */

  return {
    // Export your store API here
  };
});
`;
};

const ensureDirectoryExists = (dirPath: string): void => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

const run = async (): Promise<void> => {
  console.log('🏪 Pinia Store Generator\n');

  // Ask for store name
  const nameAnswer = await question('Enter store name (e.g., "user", "auth", "cart"): ');
  
  if (!nameAnswer.trim()) {
    console.error('❌ Store name cannot be empty');
    readline.close();
    return;
  }

  const pascalName = toPascalCase(nameAnswer);
  const camelName = toCamelCase(nameAnswer);
  const fileName = `${camelName}.ts`;

  console.log(`\n📦 Creating store: use${pascalName}Store`);
  console.log(`   File: ${fileName}`);
  console.log(`   Store ID: ${camelName}\n`);

  // Define path
  const storesPath = resolve(process.cwd(), 'app', 'stores');

  // Ensure directory exists
  ensureDirectoryExists(storesPath);

  // Create store file
  const storeFilePath = resolve(storesPath, fileName);
  
  if (existsSync(storeFilePath)) {
    const overwrite = await question(
      `⚠️  ${fileName} already exists. Overwrite? (y/n): `
    );
    if (overwrite.toLowerCase() !== 'y') {
      console.log('❌ Operation cancelled');
      readline.close();
      return;
    }
  }

  writeFileSync(storeFilePath, generateStoreTemplate(nameAnswer));
  console.log(`✅ Created: ${storeFilePath}`);

  console.log('\n🎉 Store generated successfully!\n');
  console.log(`💡 Tip: You can now use it in your components with: const ${camelName}Store = use${pascalName}Store()\n`);

  readline.close();
};

run().catch((error) => {
  console.error('❌ Error:', error);
  readline.close();
  process.exit(1);
});
