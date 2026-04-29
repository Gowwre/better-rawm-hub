const fs = require('fs');
const path = require('path');

// Mapping of remaining _0x* identifiers to their desired names
// Each key is the _0x ident, each value is the new name.
// These were determined by analyzing each identifier's usage context.

const mappings = {

  // 08-parse-cmd-ui.js
  '08-parse-cmd-ui.js': {
    '_0x4365df': 'pollingRateVal',
    '_0x51ae84': 'scoreVal',
    '_0x58b6c2': 'err',
    '_0x7a09db': 'msg',
    '_0xc9d79': 'device',
  },

  // 13-event-dispatch.js
  '13-event-dispatch.js': {
    '_0x44647a': 'event',
    '_0x51a648': 'client',
    '_0x5cffe8': 'i18n',
    '_0x505144': 'layer',
    '_0x536b26': 'item',
  },

  // 05-hs-protocol.js
  '05-hs-protocol.js': {
    '_0x41642f': 'data',
    '_0x4dbfe9': 'result',
    '_0x3933df': 'bytes2',
    '_0x4b2183': 'maxCount',
    '_0x34383b': 'mode',
  },

  // 11-ui-mapping.js
  '11-ui-mapping.js': {
    '_0x2dc193': 'trimmedVal',
    '_0xa77e69': 'item',
    '_0x2ee83c': 'keyCode',
    '_0x197445': 'item',
    '_0xb8d29c': 'mappingType',
  },

  // 06-hid-protocol.js
  '06-hid-protocol.js': {
    '_0x4e135b': 'firstByte',
    '_0x2fdc4a': 'client',
    '_0x45a4a1': 'data',
    '_0xe85b13': 'tmp',
    '_0x1451af': 'action',
  },

  // 02-key-system.js
  '02-key-system.js': {
    '_0xfe7b1d': 'item',
    '_0xf93f08': 'item',
    '_0x674518': 'item',
    '_0x37fdca': 'item',
    '_0xd77a9d': 'keyCode',
  },

  // 03-device-info.js
  '03-device-info.js': {
    '_0xc1b5f2': 'cfg',
    '_0x3bbd26': 'i',
    '_0x124584': 'esbAddr',
    '_0x1fafc5': 'esbAddr',
    '_0x15e26b': 'lightData',
  },

  // 14-ui-keyboard.js  
  '14-ui-keyboard.js': {
    '_0x495282': 'stepIndex',
    '_0x53f631': 'colorCode',
    '_0x32ca9c': 'colorCode',
    '_0x1699cb': 'colorCode',
    '_0x281927': 'kbdSelectKeys',
  },
};

for (const [fileName, renames] of Object.entries(mappings)) {
  const filePath = path.join(__dirname, '..', 'lib-rawm-deob', fileName);
  let src = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  
  for (const [oldId, newName] of Object.entries(renames)) {
    const re = new RegExp(`\\b${oldId}\\b`, 'g');
    const matches = src.match(re);
    if (matches) {
      src = src.replace(re, newName);
      count += matches.length;
    }
  }
  
  fs.writeFileSync(filePath, src, 'utf8');
  console.log(`${fileName}: renamed ${count} occurrences`);
}
