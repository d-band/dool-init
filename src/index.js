import { join } from 'path';
import { prompt } from 'enquirer';
import fetch from 'node-fetch';
import ora from 'ora';
import empty from './empty';
import clone from './clone';
import replace from './replace';

function error(str) {
  return console.error(`\x1B[31m${str}\x1B[39m`);
}
function log(str) {
  return console.log(`\x1B[36m${str}\x1B[39m`);
}

export default (args) => {
  const api = `https://api.github.com/search/repositories?q=org:dool-templates+${args.prefix}+in:name&sort=stars&order=desc`;
  const spinner = ora('Searching templates').start();

  fetch(api).then((res) => {
    spinner.succeed();
    return res.json();
  }).then((data) => {
    const repos = (data.items || []).map((v) => ({
      name: v.clone_url,
      message: `${v.name.replace(args.prefix, '')} - ${v.description}`
    }));

    if (repos.length === 0) {
      error('No repo searched!');
      return;
    }
    prompt({
      type: 'select',
      name: 'template',
      message: 'Choose template:',
      choices: repos
    }).then((answer) => {
      if (empty(args.cwd)) {
        clone(answer.template, args.cwd, err => {
          if (err) return error('Clone failed!');
          replace(args.cwd);
          log('Done.');
        });
      } else {
        error('Directory must be empty!');
      }
    }).catch(() => log('Init cancelled.'));
  }).catch(() => {
    spinner.fail();
  });
}
