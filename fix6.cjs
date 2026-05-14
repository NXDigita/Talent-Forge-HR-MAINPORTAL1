const fs = require('fs');
let content = fs.readFileSync('components/talent/CandidateCompareModal.tsx', 'utf8');
content = content.replace(
  'simulations: number;',
  'simulations: { id: string; project: string; domain: string; score: number; result: string; date: string; status: string; }[];'
);
content = content.replace(
  'badges: number;',
  'badges: { name: string; score: number; hash: string; }[];'
);
fs.writeFileSync('components/talent/CandidateCompareModal.tsx', content);
console.log('Candidate type fixed!');
