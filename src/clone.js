import { join } from 'path';
import gitclone from 'git-clone';
import rimraf from 'rimraf';
import ora from 'ora';

export default function clone(repo, cwd, fn) {
  const spinner = ora(`Downloading template`).start();
  gitclone(repo, cwd, { shallow: true }, err => {
    err ? spinner.fail() : spinner.succeed();
    if (err) return fn(err);
    rimraf.sync(join(cwd, '.git'));
    fn();
  });
}
