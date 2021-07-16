/**
 * edit this file to change fabric's import source
 */

let fabric = undefined;
try {
    //  use local build
    fabric = require('./build').fabric;
} catch (error) { }
if (!fabric) {
    //  use latest release via node module
    fabric = require('fabric').fabric;
}

export { fabric };