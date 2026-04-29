const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'lib-rawm-deob');

const renames = {
  '14-ui-keyboard.js': {
    // Rect coordinate destructures
    '_0x7bf602': 'x',
    '_0x4736d9': 'x',
    '_0x24ac6a': 'x',
    '_0x1ad957': 'x',
    '_0x33f62c': 'x',
    '_0xd87a0e': 'x',
    '_0x21c37d': 'x',
    '_0x445a48': 'x',

    // Screen dimensions
    '_0x47e98c': 'screenW',
    '_0x1ceffd': 'screenH',
    '_0xd36baf': 'screenW',
    '_0xcd8e2f': 'screenH',
    '_0x3f8898': 'screenW',
    '_0xd15f98': 'screenH',
    '_0x25eabd': 'screenW',
    '_0x221045': 'screenH',
    '_0x4b1bb5': 'screenW',
    '_0x1d190b': 'screenH',

    // Object literals
    '_0x35d389': 'info',
    '_0x445f46': 'info',

    // String/numeric constants
    '_0x227975': 'transparentStr',
    '_0x31d826': 'val01',
    '_0x3090a1': 'val012',
    '_0x470b57': 'val34',
    '_0x54f33d': 'parsedInt1',
    '_0x30e4ae': 'parsedInt2',
    '_0x2e6779': 'parsedInt3',
    '_0xdd1bff': 'parsedInt4',
    '_0x24521e': 'parsedInt5',

    // Function params
    '_0x724926': 'dragIndex',
    '_0x355dfd': 'device',

    // Computed values
    '_0x3df8da': 'productHex',
    '_0x3769bc': 'now1',
    '_0x2a9cc4': 'now2',
    '_0x22c343': 'now3',
    '_0xe4ceae': 'now4',
    '_0x21196f': 'label',
    '_0x38968e': 'triggerType',
    '_0x1a5d43': 'firstItem',
    '_0x3573d5': 'cpiStep1',
    '_0x508604': 'cpiStep2',

    // XY flags from bitwise
    '_0x4b84a7': 'isXY1',
    '_0x27689c': 'isXY2',
    '_0x31d729': 'isXY3',
    '_0x3c2c93': 'isXY4',
    '_0x53d15e': 'isXY5',

    // Display names
    '_0x3d649b': 'displayName1',
    '_0x269ba9': 'displayName2',
    '_0x178dab': 'displayName3',
    '_0x300610': 'displayName4',
    '_0x1bb6fb': 'displayName5',

    // Callback params
    '_0x1eb582': 'err',
    '_0x405458': 'result',
    '_0x28230d': 'err',
    '_0x16214b': 'data',
    '_0x487edf': 'index',
    '_0x47a57d': 'index',
    '_0xb4db90': 'index',

    // Timer/countdown
    '_0x5de21e': 'timer',
    '_0x17ad28': 'h',
    '_0x2d7e35': 'm',

    // Timeout callbacks
    '_0x23d616': 'data',
    '_0x1e3700': 'data',

    // Key list references
    '_0x290602': 'kbdSelectKeysRef',
    '_0x55c699': 'mouseSelectKeysRef',
    '_0x56a017': 'kbdRgbKeysRef',
    '_0x1ae7ac': 'kbdMediaKeysRef',
    '_0x559e3a': 'kbdWindowsKeysRef',
    '_0x141500': 'mouseSelectKeysRef2',

    // Undefined var
    '_0x36c1c7': 'isSelected',
  },
};

for (const [fileName, mappings] of Object.entries(renames)) {
  const filePath = path.join(DIR, fileName);
  let src = fs.readFileSync(filePath, 'utf8');
  let totalCount = 0;
  for (const [oldId, newName] of Object.entries(mappings)) {
    const re = new RegExp(`\\b${oldId}\\b`, 'g');
    const matches = src.match(re);
    if (matches) {
      src = src.replace(re, newName);
      totalCount += matches.length;
    }
  }
  fs.writeFileSync(filePath, src, 'utf8');
  console.log(`${fileName}: renamed ${totalCount} occurrences`);
}
