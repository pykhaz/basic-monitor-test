/**
 *       title: debug.js
 *      author: khaz
 *        desc: debug module for basic_test_monitor
 *  created on: 2026-09-04 19:28:56.491183
 */

// ansi codes:
const RST    = "\x1b[0m"
const BLD    = "\x1b[1m"
const ITC    = "\x1b[3m"  // italic

const GRY    = "\x1b[38;5;245m"  // "\x1b[38;5;236m"
const ORG    = "\x1b[38;5;202m"  // "\x1b[38;5;221m"
const GRYB  = "\x1b[100m"

const NOANSI = true;
// const NOANSI = false;


function log(msg) {
    // object for debugging
        console.log(`DBG: ${msg}`);
}


function dbglog(...args) {
  const dbgOpening = NOANSI ? "" : `${BLD + ORG + GRYB}`;
  const dbgLoc = NOANSI ? "" : `${ITC + GRY}`;
  const rst = NOANSI ? "" : RST;
  const options = args[args.length - 1];
  const isObject = typeof options === 'object' && options !== null && !Array.isArray(options) && options['loc'] !== undefined;

  const kwargs = isObject ? args.pop() : {};
  // console.log(`DBG: kwargs = ${JSON.stringify(kwargs)}`)
  const loc = kwargs['loc'] ? `${dbgLoc}[${kwargs['loc']}]${rst}` : "";
  const positionalArgs = args;
  const formattedArgs = positionalArgs
  .map(arg => (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg) : String(arg))
  .join(", ");

  console.log(`${dbgOpening} DBG: ${rst} ${formattedArgs} ${loc}`);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(` ━━━ js/debug.js (Browser) ━━━\n`);
  dbglog("DOM ready, script running.");
});
