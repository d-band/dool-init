'use strict';

import { join } from 'path';
import spawn from 'cross-spawn';

export default function(repo, cwd) {
  let cmds = [{
    cmd: 'git',
    args: ['clone', repo, cwd]
  }, {
    cmd: 'rm',
    args: ['-rf', join(cwd, '.git')]
  }];

  cmds.forEach(function(v) {
    console.log();
    spawn.sync(v.cmd, v.args, {
      stdio: 'inherit'
    });
  });
}
