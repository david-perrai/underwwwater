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

const generateComposableTemplate = (composableName: string): string => {
  const camelName = toCamelCase(composableName);
  const pascalName = toPascalCase(composableName);
  
  return `/**
 * ${pascalName} Composable
 * @description Add your composable description here
 */
export const use${pascalName} = () => {
  /** Stores */

  /** State */

  /** Computeds */

  /** Methods */

  /** Lifecycle Hooks */

  /** Watchers */

  return {
    // Export your composable API here
  };
};
`;
};

const ensureDirectoryExists = (dirPath: string): void => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

const run = async (): Promise<void> => {
  console.log('🎯 Vue Composable Generator\n');

  // Ask for composable name
  const nameAnswer = await question('Enter composable name (without "use" prefix): ');
  
  if (!nameAnswer.trim()) {
    console.error('❌ Composable name cannot be empty');
    readline.close();
    return;
  }

  const pascalName = toPascalCase(nameAnswer);
  const fileName = `use${pascalName}.ts`;

  console.log(`\n📦 Creating composable: use${pascalName}`);
  console.log(`   File: ${fileName}\n`);

  // Define path
  const composablesPath = resolve(process.cwd(), 'app', 'composables');

  // Ensure directory exists
  ensureDirectoryExists(composablesPath);

  // Create composable file
  const composableFilePath = resolve(composablesPath, fileName);
  
  if (existsSync(composableFilePath)) {
    const overwrite = await question(
      `⚠️  ${fileName} already exists. Overwrite? (y/n): `
    );
    if (overwrite.toLowerCase() !== 'y') {
      console.log('❌ Operation cancelled');
      readline.close();
      return;
    }
  }

  writeFileSync(composableFilePath, generateComposableTemplate(nameAnswer));
  console.log(`✅ Created: ${composableFilePath}`);

  console.log('\n🎉 Composable generated successfully!\n');
  console.log(`💡 Tip: You can now use it in your components with: const { ... } = use${pascalName}()\n`);

  readline.close();
};

run().catch((error) => {
  console.error('❌ Error:', error);
  readline.close();
  process.exit(1);
});
