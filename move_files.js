const fs = require('fs');
const path = require('path');

const srcApp = path.join(__dirname, 'src', 'app');
const localePath = path.join(srcApp, '[locale]');
const pagePath = path.join(srcApp, 'page.tsx');

// Fix the accident from PowerShell
if (fs.existsSync(localePath) && fs.statSync(localePath).isFile()) {
  fs.renameSync(localePath, pagePath);
  console.log('Restored page.tsx from accidental file rename');
}

if (!fs.existsSync(localePath)) {
  fs.mkdirSync(localePath);
  console.log('Created [locale] directory');
}

const itemsToMove = [
  'page.tsx',
  'layout.tsx',
  'login',
  '(protected)'
];

itemsToMove.forEach(item => {
  const oldPath = path.join(srcApp, item);
  const newPath = path.join(localePath, item);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${item}`);
  }
});

console.log('Restructure complete');
