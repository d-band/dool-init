'use strict';

import { join } from 'path';
import rimraf from 'rimraf';
import spawn from 'cross-spawn';

export default function(repo, cwd) {
  let cmds = [{
    cmd: 'git',
    args: ['clone', repo, cwd]
  }];

  cmds.forEach(function(v) {
    console.log();
    spawn.sync(v.cmd, v.args, {
      stdio: 'inherit'
    });
    rimraf.sync(join(cwd, '.git'));
  });
}
