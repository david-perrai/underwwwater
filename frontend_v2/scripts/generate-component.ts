import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

import { createInterface } from "readline";
import { resolve } from "path";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

type ComponentType = "atoms" | "molecules" | "organisms" | "templates";

const SECTION_COMMENTS: Record<ComponentType, string> = {
  atoms: "/* Atoms */",
  molecules: "/* Molecules */",
  organisms: "/* Organisms */",
  templates: "/* Templates */",
};

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
    .join("");
};

const toKebabCase = (str: string): string => {
  return str
    .trim()
    .split(/[\s-_]+/)
    .map((word) => word.toLowerCase())
    .join("-");
};

const generateVueTemplate = (
  componentName: string,
  type: ComponentType,
): string => {
  const kebabName = toKebabCase(componentName);
  const tag = type === "templates" ? "section" : "div";

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
  return `@use '../variables' as *;\n\n.${kebabName} {\n  // Styles here\n}\n`;
};

const ensureDirectoryExists = (dirPath: string): void => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Extracts all @use paths from a section block (between two section comments).
 */
const extractSectionImports = (sectionBlock: string): string[] => {
  const matches = sectionBlock.match(/^@use\s+['"][^'"]+['"]\s*;/gm);
  return matches ?? [];
};

/**
 * Sorts @use import lines alphabetically by their path.
 */
const sortImports = (imports: string[]): string[] => {
  return [...imports].sort((a, b) => {
    const pathA = a.match(/['"]([^'"]+)['"]/)?.[1] ?? "";
    const pathB = b.match(/['"]([^'"]+)['"]/)?.[1] ?? "";
    return pathA.localeCompare(pathB);
  });
};

const addScssImport = (
  scssBasePath: string,
  type: ComponentType,
  kebabName: string,
): void => {
  const mainScssPath = resolve(scssBasePath, "main.scss");

  if (!existsSync(mainScssPath)) {
    console.log(`⚠️  Warning: ${mainScssPath} does not exist. Creating it...`);
    writeFileSync(mainScssPath, "");
  }

  const content = readFileSync(mainScssPath, "utf-8");
  const sectionComment = SECTION_COMMENTS[type];
  // e.g. @use './atoms/button';  (no underscore, no extension)
  const newImport = `@use './${type}/${kebabName}';`;

  // Check for duplicate
  if (content.includes(newImport)) {
    console.log("⚠️  Import already exists in main.scss");
    return;
  }

  // Split file into lines for section-aware manipulation
  const lines = content.split("\n");

  // Find the index of the target section comment
  const sectionIndex = lines.findIndex((line) => line.trim() === sectionComment);

  if (sectionIndex === -1) {
    // Section comment not found: append a new section at the end
    const appended =
      content.trimEnd() +
      `\n\n${sectionComment}\n${newImport}\n`;
    writeFileSync(mainScssPath, appended);
    console.log(`✅ Created new section "${sectionComment}" and added import to main.scss`);
    return;
  }

  // Collect all consecutive @use lines that belong to this section
  // (from sectionIndex + 1 until a blank line or a non-@use / non-comment line)
  let insertEnd = sectionIndex + 1;
  while (
    insertEnd < lines.length &&
    (lines[insertEnd].trim().startsWith("@use") || lines[insertEnd].trim() === "")
  ) {
    // Stop at blank lines that separate sections
    if (lines[insertEnd].trim() === "") break;
    insertEnd++;
  }

  // Gather existing @use lines for this section and add the new one
  const sectionImportLines = lines.slice(sectionIndex + 1, insertEnd);
  const allImports = sortImports([...sectionImportLines, newImport]);

  // Rebuild the file
  const before = lines.slice(0, sectionIndex + 1); // includes the section comment
  const after = lines.slice(insertEnd);

  const rebuilt = [...before, ...allImports, ...after].join("\n");

  writeFileSync(mainScssPath, rebuilt);
  console.log("✅ Added import to main.scss (sorted alphabetically)");
};

const run = async (): Promise<void> => {
  console.log("🚀 Vue Component Generator\n");

  // Ask for component type
  const typeAnswer = await question(
    "Choose component type (1: Atoms, 2: Molecules, 3: Organisms, 4: Templates): ",
  );

  const typeMap: Record<string, ComponentType> = {
    "1": "atoms",
    "2": "molecules",
    "3": "organisms",
    "4": "templates",
  };

  const type = typeMap[typeAnswer.trim()];

  if (!type) {
    console.error("❌ Invalid type selected");
    readline.close();
    return;
  }

  // Ask for component name
  const nameAnswer = await question("\nEnter component name: ");
  const pascalName = toPascalCase(nameAnswer);
  const kebabName = toKebabCase(nameAnswer);

  console.log(`\n📦 Creating component: ${pascalName}`);
  console.log(`   Type: ${type}`);
  console.log(`   Class: ${kebabName}\n`);

  // Define paths
  const componentPath = resolve(process.cwd(), "app", "components", type);
  const scssTypePath = resolve(process.cwd(), "app", "assets", "scss", type);

  // Ensure directories exist
  ensureDirectoryExists(componentPath);
  ensureDirectoryExists(scssTypePath);

  // Create Vue component
  const vueFilePath = resolve(componentPath, `${pascalName}.vue`);
  if (existsSync(vueFilePath)) {
    const overwrite = await question(
      `⚠️  ${pascalName}.vue already exists. Overwrite? (y/n): `,
    );
    if (overwrite.toLowerCase() !== "y") {
      console.log("❌ Operation cancelled");
      readline.close();
      return;
    }
  }

  writeFileSync(vueFilePath, generateVueTemplate(nameAnswer, type));
  console.log(`✅ Created: ${vueFilePath}`);

  // Create SCSS file (stored as _kebab-name.scss on disk)
  const scssFileName = `_${kebabName}.scss`;
  const scssFilePath = resolve(scssTypePath, scssFileName);

  if (existsSync(scssFilePath)) {
    const overwrite = await question(
      `⚠️  ${scssFileName} already exists. Overwrite? (y/n): `,
    );
    if (overwrite.toLowerCase() !== "y") {
      console.log("⚠️  Skipping SCSS file creation");
      readline.close();
      return;
    }
  }

  writeFileSync(scssFilePath, generateScssTemplate(nameAnswer));
  console.log(`✅ Created: ${scssFilePath}`);

  // Add import to main.scss (without underscore prefix or .scss extension)
  addScssImport(
    resolve(process.cwd(), "app", "assets", "scss"),
    type,
    kebabName,
  );

  console.log("\n🎉 Component generated successfully!\n");

  readline.close();
};

run().catch((error) => {
  console.error("❌ Error:", error);
  readline.close();
  process.exit(1);
});