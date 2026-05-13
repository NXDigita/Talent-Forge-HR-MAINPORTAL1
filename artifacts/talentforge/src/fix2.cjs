const fs = require('fs');
let content = fs.readFileSync('components/talent/AIMatchModal.tsx', 'utf8');

// Fix line 565 - show simulations count instead of array
content = content.replace(
  '{r.candidate.simulations}',
  '{Array.isArray(r.candidate.simulations) ? r.candidate.simulations.length : r.candidate.simulations}'
);

// Fix line 567 - show badges count instead of array
content = content.replace(
  '{r.candidate.badges}',
  '{Array.isArray(r.candidate.badges) ? r.candidate.badges.length : r.candidate.badges}'
);

fs.writeFileSync('components/talent/AIMatchModal.tsx', content);
console.log('AIMatchModal fixed!');
