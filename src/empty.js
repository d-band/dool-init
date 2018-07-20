import { statSync, readdirSync } from 'fs';

export default function(dir) {
  try {
    let stat = statSync(dir);
  } catch (e) {
    return true;
  }

  let items = readdirSync(dir);

  return !items || !items.length;
}
