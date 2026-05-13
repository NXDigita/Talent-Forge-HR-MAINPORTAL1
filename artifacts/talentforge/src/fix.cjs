const fs = require('fs');
const lines = fs.readFileSync('data/mockData.ts', 'utf8').split('\n');

function findClose(str, start, open, close) {
  let depth = 0;
  for (let i = start; i < str.length; i++) {
    if (str[i] === open) depth++;
    else if (str[i] === close) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

function removeDupe(line, key) {
  const first = line.indexOf(key + ':');
  if (first === -1) return line;
  const second = line.indexOf(key + ':', first + key.length + 1);
  if (second === -1) return line;
  const vs = second + key.length + 1;
  let end;
  if (line[vs] === '[') end = findClose(line, vs, '[', ']') + 1;
  else if (line[vs] === '{') end = findClose(line, vs, '{', '}') + 1;
  else if (line[vs] === '"') end = line.indexOf('"', vs + 1) + 1;
  else end = line.indexOf(',', vs);
  let s = second, e = end;
  if (line[s-1] === ',') s--; else if (line[e] === ',') e++;
  return line.slice(0, s) + line.slice(e);
}

[13, 23, 36,37,38,39,40,41,42,43,44,45,46].forEach(i => {
  if (lines[i]) {
    ['domain','badges','simulations'].forEach(k => {
      lines[i] = removeDupe(lines[i], k);
    });
  }
});

fs.writeFileSync('data/mockData.ts', lines.join('\n'));
console.log('All duplicates fixed!');
