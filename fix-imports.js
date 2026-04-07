const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  let entries = fs.readdirSync(dir);
  for (let f of entries) {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  }
}

const dependencies = new Set();
let filesUpdated = 0;

walk('./src/components', (file) => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    
    // Replace "package@version" with "package"
    const newContent = content.replace(/from\s+["']([^"']+)@[\d\.\-a-zA-Z]+["']/g, (match, p1) => {
      hasChanges = true;
      dependencies.add(p1);
      return `from "${p1}"`;
    });

    if (hasChanges) {
      fs.writeFileSync(file, newContent, 'utf8');
      filesUpdated++;
    }
  }
});

console.log(`Updated ${filesUpdated} files.`);
if (dependencies.size > 0) {
  console.log('You need to run the following installation command:');
  console.log('npm install ' + Array.from(dependencies).join(' '));
} else {
  console.log('No @version imports found.');
}
