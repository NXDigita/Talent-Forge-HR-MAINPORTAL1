const fs = require('fs');
let content = fs.readFileSync('components/projects/PostProjectModal.tsx', 'utf8');
content = content.replace(
  'applicants: 0,',
  'applicants: 0,\n      assignedTo: "",'
);
fs.writeFileSync('components/projects/PostProjectModal.tsx', content);
console.log('assignedTo value added!');
