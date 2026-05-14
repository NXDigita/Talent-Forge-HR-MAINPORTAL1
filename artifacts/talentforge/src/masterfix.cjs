const fs = require('fs');

// Fix 1 - mockData duplicate keys
let mockData = fs.readFileSync('data/mockData.ts', 'utf8');
const lines = mockData.split('\n');
[13,23,36,37,38,39,40,41,42,43,44,45,46].forEach(i => {
  if (!lines[i]) return;
  const seen = new Set();
  lines[i] = lines[i].replace(/(\w+)(?=:)/g, (match) => {
    if (['domain','badges','simulations'].includes(match)) {
      if (seen.has(match)) return '__DELETE__';
      seen.add(match);
    }
    return match;
  });
  // Remove duplicate key-value pairs
  lines[i] = lines[i].replace(/,__DELETE__:[^,}]*/g, '');
});
fs.writeFileSync('data/mockData.ts', lines.join('\n'));
console.log('✅ mockData fixed!');

// Fix 2 - CandidateCompareModal simulations type
let modal = fs.readFileSync('components/talent/CandidateCompareModal.tsx', 'utf8');
modal = modal.replace('simulations: number;', 'simulations: { id: string; project: string; domain: string; score: number; result: string; date: string; status: string; }[];');
modal = modal.replace('badges: number;', 'badges: { name: string; score: number; hash: string; }[];');
fs.writeFileSync('components/talent/CandidateCompareModal.tsx', modal);
console.log('✅ CandidateCompareModal fixed!');

