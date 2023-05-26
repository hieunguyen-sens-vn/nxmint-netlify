console.log('********* PREBUILDING');
const path = require('node:path');
const fs = require('fs');
const { exit } = require('node:process');
const baseDir = process.cwd();

console.log('prebuild');

const prebuildScripts = async () => {
  const file = path.join(baseDir, '/node_modules', 'next/dist/server/require-hook.js');

  const content = await fs.promises.readFile(file, 'utf-8');
  await fs.promises.writeFile(
    file,
    content.replace('if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {', 'if (true) {'),
  );
};

prebuildScripts();

exit(0);
