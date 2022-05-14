# flocker-sync

Lock files in a synchronous way with expiration

> Note: The expiration time is used for the times that locker process is terminated and no longer available to unlock the file. the expiration will be renewed automatically if the locking processing takes longer and the process is still alive.

## Usage

```js
const flockerSync = require('./flocker-sync');

const doSomeFileOperation = filename => {
  const { lock, unlock } = flockerSync(
    `.lock.${filename}`,  // Lock filename
    3,                    // Expiration time (in second)
  );

  lock();
  // Do some file operations...
  unlock();
};

```
