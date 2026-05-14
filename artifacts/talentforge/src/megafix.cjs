const fs = require('fs');

// Fix 1 - Find ALL type definitions with simulations: number
const files = [
  'components/talent/CandidateCompareModal.tsx',
  'pages/CandidatePortfolio.tsx',
  'pages/TalentDiscovery.tsx'
];

const simType = '{ id: string; project: string; domain: string; score: number; result: string; date: string; status: string; }[]';
const badgeType = '{ name: string; score: number; hash: string; }[]';

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/simulations:\s*number/g, `simulations: ${simType}`);
  c = c.replace(/badges:\s*number/g, `badges: ${badgeType}`);
  fs.writeFileSync(f, c);
  console.log('✅ Fixed: ' + f);
});

// Fix 2 - mockData lines 14 and 24 duplicates
let mock = fs.readFileSync('data/mockData.ts', 'utf8');
const lines = mock.split('\n');
[13, 23].forEach(i => {
  if (!lines[i]) return;
  const seen = new Set();
  ['domain','badges','simulations','skills','scores'].forEach(key => {
    const regex = new RegExp(key + ':', 'g');
    let count = 0;
    lines[i] = lines[i].replace(regex, match => {
      count++;
      return count > 1 ? `__DEL_${key}__:` : match;
    });
  });
  lines[i] = lines[i].replace(/,\s*__DEL_\w+__:[^,}]*/g, '');
});
fs.writeFileSync('data/mockData.ts', lines.join('\n'));
console.log('✅ mockData lines 14 & 24 fixed!');

