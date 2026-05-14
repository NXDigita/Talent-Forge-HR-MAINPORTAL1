const fs = require('fs');
const path = 'artifacts/mockup-sandbox/vite.config.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /const rawPort = process\.env\.PORT[\s\S]*?}\s*\nconst port = Number\(rawPort\);[\s\S]*?}\s*\n/,
  'const port = Number(process.env.PORT ?? "3000");\n'
);
content = content.replace(
  /const basePath = process\.env\.BASE_PATH[\s\S]*?}\s*\n/,
  'const basePath = process.env.BASE_PATH ?? "/";\n'
);

fs.writeFileSync(path, content);
console.log('mockup-sandbox vite.config.ts fixed!');
