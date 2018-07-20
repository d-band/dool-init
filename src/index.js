import { join } from 'path';
import inquirer from 'inquirer';
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

export default function(args) {
  const api = `https://api.github.com/search/repositories?q=org:dool-templates+${args.prefix}+in:name&sort=stars&order=desc`;
  const spinner = ora('Searching templates...').start();

  fetch(api).then(function(res) {
    spinner.succeed('Searching templates done.');
    return res.json();
  }).then(function(data) {
    let repos = (data.items || []).map(function(v) {
      return {
        name: `${v.name.replace(args.prefix, '')} - ${v.description}`,
        value: v
      };
    });

    if (repos.length === 0) {
      error('No repo searched!');
      return;
    }

    inquirer.prompt([{
      type: 'list',
      name: 'template',
      message: 'Choose template:',
      paginated: true,
      choices: repos
    }]).then(function(repo) {
      if (empty(args.cwd)) {
        let tpl = repo.template;
        clone(tpl.clone_url, args.cwd, err => {
          if (err) return error('Clone failed!');
          replace(args.cwd);
          log('Done.');
        });
      } else {
        error('Directory must be empty!');
      }
    });
  });
}
