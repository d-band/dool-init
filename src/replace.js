import { join, basename } from 'path';
import { readFileSync, writeFileSync } from 'fs';


export default function(cwd) {
  let appname = basename(cwd);
  let pkg = join(cwd, 'package.json');

  let data = readFileSync(pkg, 'utf8');
  data = data.replace(/appname/gi, appname);

  writeFileSync(pkg, data, 'utf8');
}
