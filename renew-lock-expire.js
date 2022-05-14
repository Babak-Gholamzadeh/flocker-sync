const fs = require('fs');

const [, , lockFilename, expire] = process.argv;

setInterval(() => {
  const now = Date.now() / 1000;
  fs.utimesSync(lockFilename, now, now);
}, (expire - .5) * 1000);
