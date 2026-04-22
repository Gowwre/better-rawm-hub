/**
 * RAWM HID Traffic Logger v2
 * Logs all WebHID send/receive traffic in comparable format.
 * Must be loaded BEFORE any WebHID code runs.
 */
(function() {
  'use strict';

  const LOG_PREFIX = '[HID-LOG]';
  let logId = 0;

  function hexDump(bytes, maxLen = 64) {
    const arr = Array.from(bytes).slice(0, maxLen);
    return arr.map(b => b.toString(16).padStart(2, '0')).join(' ');
  }

  function logEntry(direction, data, label = '') {
    const id = ++logId;
    const timestamp = new Date().toISOString().split('T')[1].replace('Z', '');
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    
    console.log(`${LOG_PREFIX} #${id} ${timestamp} | ${direction.padEnd(6)} | len=${String(bytes.length).padStart(3)} | ${label}`);
    console.log(`${LOG_PREFIX}       RAW: ${hexDump(bytes)}`);
    
    if (bytes.length >= 5) {
      const cmdByte = bytes[4] & 0xf;
      const cmdNames = {
        0x00: 'NONE', 0x01: 'QUERY', 0x02: 'QUERY_RESULT', 0x03: 'CONFIG',
        0x04: 'TOUCH', 0x05: 'FINGER', 0x06: 'ACTION', 0x07: 'SYNC',
        0x08: 'MOUSE_TOUCH', 0x09: 'JOY_STICK_TOUCH', 0x0a: 'ALT_MOUSE_TOUCH',
        0x0b: 'NOTIFY', 0x0c: 'RAW_DATA', 0x0d: 'LOG', 0x0e: 'PING'
      };
      const cmdName = cmdNames[cmdByte] || `UNKNOWN(0x${cmdByte.toString(16)})`;
      console.log(`${LOG_PREFIX}       CMD: 0x${cmdByte.toString(16)} = ${cmdName}`);
      
      if (cmdByte === 0x02) {
        try {
          const jsonStart = 6;
          const jsonBytes = bytes.slice(jsonStart);
          const jsonStr = new TextDecoder().decode(jsonBytes);
          const cleanJson = jsonStr.replace(/\x00/g, '').trim();
          if (cleanJson.startsWith('{')) {
            console.log(`${LOG_PREFIX}       JSON: ${cleanJson.substring(0, 300)}`);
          }
        } catch (e) {}
      }
      
      if (cmdByte === 0x0b && bytes.length >= 6) {
        const notifyType = bytes[5];
        const notifyNames = {
          0x00: 'MOUSE_CPI', 0x01: 'MOUSE_POLLING', 0x02: 'MOUSE_LIGHT',
          0x03: 'MOUSE_ASSIST', 0x04: 'MOUSE_ONBOARD', 0x05: 'MOUSE_POWER_MODE',
          0x16: 'MOUSE_BATTERY_LEVELS', 0x17: 'MOUSE_BATTERY', 0x1c: 'MOUSE_RSSI'
        };
        const notifyName = notifyNames[notifyType] || `UNKNOWN(0x${notifyType.toString(16)})`;
        console.log(`${LOG_PREFIX}       NOTIFY: 0x${notifyType.toString(16)} = ${notifyName}`);
      }
    }
    console.log(`${LOG_PREFIX}       ---`);
  }

  function wrapDevice(device) {
    if (device._hidLogged) return device;
    device._hidLogged = true;

    const origSend = device.sendReport.bind(device);
    device.sendReport = async function(reportId, data) {
      logEntry('TX>>', data, `reportId=${reportId} device=${device.productName || 'unknown'}`);
      return origSend(reportId, data);
    };

    const origAddEventListener = device.addEventListener.bind(device);
    device.addEventListener = function(type, listener, options) {
      if (type === 'inputreport') {
        const wrapped = function(event) {
          const data = new Uint8Array(event.data.buffer, event.data.byteOffset, event.data.byteLength);
          logEntry('<<RX', data, `device=${device.productName || 'unknown'}`);
          return listener.call(this, event);
        };
        return origAddEventListener(type, wrapped, options);
      }
      return origAddEventListener(type, listener, options);
    };

    return device;
  }

  const origRequestDevice = navigator.hid.requestDevice.bind(navigator.hid);
  const origGetDevices = navigator.hid.getDevices.bind(navigator.hid);

  navigator.hid.requestDevice = async function(options) {
    console.log(`${LOG_PREFIX} === requestDevice called ===`);
    console.log(`${LOG_PREFIX} Filters:`, JSON.stringify(options?.filters));
    const devices = await origRequestDevice(options);
    console.log(`${LOG_PREFIX} Returned ${devices?.length || 0} devices`);
    return (devices || []).map((d, i) => {
      console.log(`${LOG_PREFIX} Device[${i}]: ${d.productName} (0x${d.vendorId.toString(16)}:0x${d.productId.toString(16)}) opened=${d.opened}`);
      return wrapDevice(d);
    });
  };

  navigator.hid.getDevices = async function() {
    console.log(`${LOG_PREFIX} === getDevices called ===`);
    const devices = await origGetDevices();
    console.log(`${LOG_PREFIX} Returned ${devices?.length || 0} devices`);
    return (devices || []).map((d, i) => {
      console.log(`${LOG_PREFIX} Device[${i}]: ${d.productName} (0x${d.vendorId.toString(16)}:0x${d.productId.toString(16)}) opened=${d.opened}`);
      return wrapDevice(d);
    });
  };

  console.log(`${LOG_PREFIX} HID Logger v2 injected. All WebHID traffic will be logged.`);
  console.log(`${LOG_PREFIX} Format: #ID timestamp | DIR | len | label`);
  console.log(`${LOG_PREFIX}         RAW: hex bytes`);
  console.log(`${LOG_PREFIX}         CMD: command type (at offset 4)`);
})();
