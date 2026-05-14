const fs = require('fs');
let content = fs.readFileSync('data/mockData.ts', 'utf8');
content = content.replace(/__REMOVE_domain__:/g, 'domain:');
content = content.replace(/__REMOVE_badges__:/g, 'badges:');
content = content.replace(/__REMOVE_simulations__:/g, 'simulations:');
fs.writeFileSync('data/mockData.ts', content);
console.log('mockData cleaned!');
