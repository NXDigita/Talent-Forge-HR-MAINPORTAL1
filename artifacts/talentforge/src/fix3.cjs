const fs = require('fs');
let content = fs.readFileSync('components/projects/PostProjectModal.tsx', 'utf8');

content = content.replace(
  'applicants: number;',
  'applicants: number;\n  assignedTo: string;'
);

fs.writeFileSync('components/projects/PostProjectModal.tsx', content);
console.log('NewProject type fixed!');
