const fs = require('fs');
const path = '../vite.config.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
`const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(\`Invalid PORT value: "\${rawPort}"\`);
}`,
`const port = Number(process.env.PORT ?? "3000");`
);

fs.writeFileSync(path, content);
console.log('vite.config.ts fixed!');
