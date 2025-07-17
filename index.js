#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
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

    const spinner = ora(`Creating Express app with ${chalk.bold(language.toUpperCase())}...`).start();

    // Copy template
    await fs.copy(templateDir, dest);

    // Define dependencies
    const installDeps = ['express@latest'];
    const installDevDeps = [
      'dotenv@latest',
      'cross-env@latest',
      'nodemon@latest',
      'swagger-jsdoc@latest',
      'swagger-ui-express@latest'
    ];

    if (language === 'typescript') {
      installDevDeps.push(
        'typescript@latest',
        'ts-node@latest',
        '@types/express@latest',
        '@types/swagger-jsdoc@latest',
        '@types/swagger-ui-express@latest'
      );
    }

    // Install dependencies silently and asynchronously to keep spinner alive
    await execa('npm', ['install', ...installDeps], { cwd: dest, stdout: 'ignore', stderr: 'ignore' });
    await execa('npm', ['install', '-D', ...installDevDeps], { cwd: dest, stdout: 'ignore', stderr: 'ignore' });

    spinner.succeed(`✅ Express project "${projectName}" created successfully with ${chalk.bold(language.toUpperCase())}!`);
    console.log(`\nTo get started:\n\n  cd ${projectName}\n  npm run dev\n`);
    
  } catch (err) {
    console.error(chalk.red('❌ Something went wrong:'), err.message);
    process.exit(1);
  }
}

main();
