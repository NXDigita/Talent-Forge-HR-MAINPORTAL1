const fs = require('fs');
const path = '../vite.config.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
`const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}`,
`const basePath = process.env.BASE_PATH ?? "/";`
);

fs.writeFileSync(path, content);
console.log('BASE_PATH fixed!');
