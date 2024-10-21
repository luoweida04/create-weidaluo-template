#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');

const { url, templateName } = require('./constant.js');

program.version(require('../package.json').version)
  .usage('<command> [project-name]');

program.parse(process.argv)
if (program.args.length < 1) return program.help();

const projectName = program.args[0];

console.log(chalk.white(`\n Start creating project【${projectName}】 from template【${templateName}】 \n`));
const spinner = ora('Downloading...');
spinner.start();

download(
  url,
  projectName,
  err => {
      if (err){
          spinner.fail();
          console.log(chalk.red(`Generation failed. ${err}`));
          return;
      }
      spinner.succeed();
      console.log(chalk.cyan('\n Generation completed!'));
      console.log(chalk.cyan('\n To get started'));
      console.log(chalk.cyan(`\n    cd ${projectName} \n`));
  }
)
