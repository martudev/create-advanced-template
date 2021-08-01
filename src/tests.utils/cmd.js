const concat = require('concat-stream');
const spawn = require('child_process').spawn

function createProcess(processPath, args, env) {
  return spawn(`node ${processPath}`, args, { env: env, cwd: process.cwd() })
}

function executeWithInput(
  processPath,
  args = [],
  inputs = [],
  opts = {}
) {
  // Handle case if user decides not to pass input data
  // A.k.a. backwards compatibility
  if (!Array.isArray(inputs)) {
    opts = inputs;
    inputs = [];
  }

  const { env = null, timeout = 100 } = opts;
  const childProcess = createProcess(processPath, args, env);
  childProcess.stdin.setEncoding('utf-8');
  
  let currentInputTimeout;
  // Creates a loop to feed user inputs to the child process
  // in order to get results from the tool
  // This code is heavily inspired (if not blantantly copied)
  // from inquirer-test package
  const loop = inputs => {
    if (!inputs.length) {
      childProcess.stdin.end();
      return;
    }

    currentInputTimeout = setTimeout(() => {
      childProcess.stdin.write(inputs[0]);
      loop(inputs.slice(1));
    }, timeout);
  };
  const promise = new Promise((resolve, reject) => {
    childProcess.stderr.once('data', err => {
      // If childProcess errors out, stop all
      // the pending inputs if any
      childProcess.stdin.end();

      if (currentInputTimeout) {
        clearTimeout(currentInputTimeout);
        inputs = [];
      }

      reject(err.toString());
    });
    childProcess.on('error', reject);
    // Kick off the process
    loop(inputs);
    childProcess.stdout.pipe(
      concat(result => {
        resolve(result.toString());
      })
    );
  });
  return promise;
}
module.exports = {
    execute: executeWithInput,
    DOWN: '\x1B\x5B\x42',
    UP: '\x1B\x5B\x41',
    ENTER: '\x0D',
    SPACE: '\x20'
};