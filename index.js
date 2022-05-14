const fs = require('fs');
const { fork } = require('child_process');
const path = require('path');

let renewLocker;

const lock = (lockFilename, expire) => {
  while (1) {
    try {
      fs.writeFileSync(lockFilename, '', { flag: 'wx' });
      break;
    } catch {
      try {
        const now = new Date();
        const { atime } = fs.statSync(lockFilename);
        if (now - atime < expire * 1000)
          throw undefined;
        fs.unlinkSync(lockFilename);
      } catch { }
    }
  }
  renewLocker = fork(
    path.join(__dirname, 'renew-lock-expire'),
    [lockFilename, expire]
  );
};

const unlock = lockFilename => {
  try {
    renewLocker.kill();
    fs.unlinkSync(lockFilename);
  } catch { }
};

module.exports = (lockFilename, expire) => ({
  lock: lock.bind(null, lockFilename, expire),
  unlock: unlock.bind(null, lockFilename),
});
