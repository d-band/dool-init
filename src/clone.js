import { join } from 'path';
import gitclone from 'git-clone';
import rimraf from 'rimraf';

export default function clone(repo, cwd, fn) {
  gitclone(repo, cwd, { shallow: true }, err => {
    if (err) return fn(err);
    rimraf.sync(join(cwd, '.git'));
    fn();
  });
}
