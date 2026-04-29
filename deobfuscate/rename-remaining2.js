const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'lib-rawm-deob');

// Comprehensive remaining renames, file by file
const renames = {

  // 03-device-info.js — single-param functions, most take "client" or "device"
  '03-device-info.js': {
    '_0x49749e': 'productId',
    '_0x4b0cd': 'info',
    '_0x5c479f': 'client',
    '_0x2ce8ab': 'hidDevice',
    '_0x392bce': 'virtual',
    '_0x422a78': 'client',
    '_0x178c93': 'productId',
    '_0x2255e6': 'revision',
    '_0x22637c': 'device',
    '_0x5078af': 'device',
    '_0x3db738': 'device',
    '_0x41db23': 'client',
    '_0x429ee4': 'client',
    '_0x38bd72': 'client',
    '_0x4eee45': 'index',
    '_0x2b10c4': 'esbAddr',
    '_0x45a47d': 'addr',
    '_0x1ac44c': 'length',
    '_0x5d2ed1': 'index',
    '_0x33b226': 'device',
    '_0x18b350': 'isGamingOnly',
    '_0x3907a2': 'client',
    '_0x3ec055': 'client',
    '_0x2827a5': 'isXyLinked',
    '_0x23e7ee': 'client',
    '_0x46c17a': 'client',
    '_0x1431aa': 'value',
    '_0x595f87': 'index',
    '_0x1369e2': 'value',
    '_0x1981e5': 'isUpdateLight',
    '_0x567012': 'cpiLevel',
    '_0x3cc7bf': 'color',
    '_0x1f124c': 'index',
    '_0x2348ad': 'index',
    '_0x416147': 'rate',
    '_0x42c2c9': 'client',
    '_0x172cfb': 'client',
    '_0x57af85': 'client',
    '_0x529295': 'mode',
    '_0x413fc0': 'client',
    '_0x921b53': 'lodVal',
    '_0x5674ff': 'enabled',
    '_0x592020': 'enabled',
    '_0x521db4': 'enabled',
    '_0x5c9baf': 'enabled',
    '_0x1ea6b9': 'client',
    '_0x26fee0': 'enabled',
    '_0xb3b8a1': 'status',
    '_0x1707b2': 'delay',
    '_0x8e8b53': 'keyDelay',
    '_0x4d6236': 'client',
    '_0x203434': 'client',
    '_0x334a6e': 'enabled',
    '_0x48bfb9': 'enabled',
    '_0x50acc8': 'client',
    '_0x1828ca': 'client',
    '_0x429aab': 'client',
    '_0x3dd99e': 'client',
    '_0x26aa36': 'client',
    '_0x12966e': 'client',
    '_0x1ae00c': 'client',
    '_0x4cabf4': 'client',
    '_0x5e57f9': 'client',
    '_0xfba5c0': 'productId',
    '_0x15a92f': 'client',
    '_0x2356ea': 'client',
    '_0x5d7e63': 'jsonStr',
    '_0x1f0946': 'err',
  },

  // 02-key-system.js
  '02-key-system.js': {
    '_0x163ad6': 'keyName',
    '_0x4fbf29': 'altCode',
    '_0x282c8a': 'altName',
    '_0x2d394f': 'scanCode',
    '_0x21176e': 'keyId',
    '_0x5939ca': 'row',
    '_0x16dfae': 'col',
    '_0x384a8d': 'rect',
    '_0x606c29': 'info',
    '_0x533406': 'keyType',
    '_0x7abcb8': 'keyName',
    '_0x3d72c8': 'altCode',
    '_0x3e4427': 'altName',
    '_0x2ef6fb': 'scanCode',
    '_0x475123': 'keyId',
    '_0x5b7670': 'rect',
    '_0x3f7a95': 'info',
    '_0x14ed8a': 'info',
    '_0x5a34c1': 'a',
    '_0x4c5793': 'b',
    '_0x30f995': 'keyId',
    '_0x29c585': 'keyId',
    '_0x18aad6': 'keyId',
    '_0x1ddad7': 'keyId',
    '_0x17a3e7': 'keyCode',
    '_0x3951dd': 'keyName',
    '_0x2ed8ac': 'modifierCode',
    '_0x589de9': 'modifierName',
  },

  // 05-hs-protocol.js
  '05-hs-protocol.js': {
    '_0x2d2090': 'type',
    '_0x25a94f': 'index',
    '_0x2ee500': 'data',
    '_0x31edb9': 'index',
    '_0x5190a3': 'index',
    '_0x5149c2': 'count',
    '_0x2eedc1': 'index',
    '_0x12f89a': 'index',
    '_0x53cac4': 'index',
    '_0x12b01b': 'index',
    '_0x2dff91': 'index',
    '_0x185c93': 'err',
    '_0x4ed5c0': 'firstByte',
  },

  // 06-hid-protocol.js
  '06-hid-protocol.js': {
    '_0x1260be': 'clientId',
    '_0x48dc88': 'err',
    '_0x125351': 'data',
    '_0x1b4843': 'crc',
    '_0xa58372': 'pingIndex',
    '_0x39e088': 'isPingAll',
    '_0x4604b5': 'encodedSync',
    '_0x4ac8e8': 'addrType',
    '_0x40235e': 'addr',
    '_0x37b035': 'actionType',
    '_0x29910b': 'keyCode',
    '_0xeeae14': 'macroKey',
    '_0x4f6b14': 'mouseFlag',
    '_0x855f62': 'actionType',
    '_0x331d87': 'functionCode',
    '_0x5d31aa': 'type',
    '_0x52307d': 'index',
    '_0x408bf5': 'total',
    '_0x545a56': 'savedCount',
    '_0x5451d2': 'enabled',
    '_0x92d57b': 'name',
    '_0x4b6927': 'isFuzzy',
    '_0x1d9025': 'err',
  },

  // 11-ui-mapping.js
  '11-ui-mapping.js': {
    '_0x50eadf': 'selectedLabel',
    '_0x8efca9': 'screenW',
    '_0x420852': 'screenH',
    '_0x3efa43': 'screenW',
    '_0x59279a': 'screenH',
    '_0x41184e': 'mappingData',
    '_0x57c541': 'modifiersList',
    '_0x49e151': 'keysList',
    '_0x28d85b': 'label',
    '_0x265c2b': 'keyId',
    '_0x55c831': 'name',
    '_0x30d6bb': 'url',
    '_0x550c19': 'urlRe',
    '_0x4061b7': 'firstRow',
  },

  // 13-event-dispatch.js
  '13-event-dispatch.js': {
    '_0x4a6fe3': 'client',
    '_0x25591b': 'loadingEl',
    '_0x442419': 'rebootMsg',
    '_0xf15303': 'displayName',
    '_0x269dd5': 'offsetLeft',
    '_0x3e95a3': 'event',
    '_0xd644e0': 'event',
    '_0x136a6a': 'event',
    '_0x281d0d': 'macroData',
    '_0x4228b2': 'timeoutId',
  },
};

// Process each file
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
