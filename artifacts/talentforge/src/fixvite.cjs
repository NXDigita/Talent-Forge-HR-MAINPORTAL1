const fs = require('fs');
const path = '../vite.config.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /const port = process\.env\.PORT;[\s\S]*?throw new Error\("PORT.*?"\);/,
  'const port = process.env.PORT ?? "3000";'
);
content = content.replace(
  /const basePath = process\.env\.BASE_PATH;[\s\S]*?throw new Error\("BASE_PATH.*?"\);/,
  'const basePath = process.env.BASE_PATH ?? "/";'
);

fs.writeFileSync(path, content);
console.log('vite.config.ts fixed!');
