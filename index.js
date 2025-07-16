#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        validate: input => input ? true : 'Project name cannot be empty',
      },
      {
        type: 'list',
        name: 'language',
        message: 'Choose a language:',
        choices: [
          { name: chalk.yellow('JavaScript'), value: 'javascript' },
          { name: chalk.blue('TypeScript'), value: 'typescript' },
        ],
      },
    ]);

    const { projectName, language } = answers;
    const dest = path.join(process.cwd(), projectName);
    const templateDir = path.join(__dirname, 'templates', language);

    // Spinner (loading dots)
    const spinner = ora(`Creating Express app with ${chalk.bold(language.toUpperCase())}...`).start();

    // Simulate long copy if needed (for demo, remove in real usage)
    await fs.copy(templateDir, dest);

    spinner.succeed(`✅ Project "${projectName}" created successfully with ${chalk.bold(language.toUpperCase())}!`);
    console.log(`\nTo get started:\n\n  cd ${projectName}\n  npm install\n`);
    
  } catch (err) {
    console.error(chalk.red('❌ Something went wrong:'), err.message);
    process.exit(1);
  }
}

main();
