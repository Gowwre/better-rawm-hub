// ===== HID / HS TRANSPORT LAYER ==============================================
// Core send/receive primitives used by the protocol modules.

import { is_hs_keyboard } from '../data/device-database.js';
import { usb_client_list, is_receiver, is_limit_memory } from '../state/device-store.js';
import { parse_cmd, log_r, S } from './parse-cmd-ui.js';
import { hs_parse_cmd } from './hs-protocol.js';
import { SYNC_TIMEOUT_MS, HID_REPORT_SIZE, HID_LENGTH_MASK, MASK_TOP_2BITS, HID_SEND_DEBOUNCE_MS, HS_FRAME_SIZE } from '../data/constants.js';
import { ACTION_SEND_CLIENT_DATA } from '../state/device-store.js';

// ===== SEND BUFFER MANAGEMENT ================================================
export let timeoutID = {};

export function post_send_client_data(item) {
  if (typeof timeoutID[item.id] === "number") {
    clearTimeout(timeoutID[item.id]);
  }
  timeoutID[item.id] = setTimeout(clientId => {
    window.postMessage({
      'action': ACTION_SEND_CLIENT_DATA,
      'usb_client_id': clientId
    });
  }, HID_SEND_DEBOUNCE_MS, item.id);
}

export function send_event(client, data) {
  var bytes = new Uint8Array(client.send_event_buf.byteLength + data.byteLength);
  bytes.set(client.send_event_buf);
  bytes.set(data, client.send_event_buf.byteLength);
  client.send_event_buf = bytes;
  post_send_client_data(client);
}

// ===== CRC ===================================================================
export function crc16_compute(data, len) {
  var value = 0xffff;
  for (var i = 0; i < len; i++) {
    value = value >> 8 & 0xff | value << 8;
    value ^= data[i];
    value ^= (value & 0xff) >> 4;
    value ^= value << 8 << 4;
    value ^= (value & 0xff) << 4 << 1;
  }
  return value;
}

export function crc_process(client, data) {
  var bytes = new Uint8Array(data);
  var value = bytes.byteLength;
  bytes[0] = (value >> 4 & 0xf0 | bytes[0]) & 0xff;
  bytes[1] = value & 0xff & 0xff;
  if (client.device_info != undefined && client.device_info.crcSupported) {
    var value2 = value + 5;
    var crc = crc16_compute(bytes, value);
    var bytes2 = new Uint8Array(value2);
    bytes2[0] = (value2 >> 4 & 0xf0 | 0x3) & 0xff;
    bytes2[1] = value2 & 0xff & 0xff;
    bytes2[2] = 0x24;
    bytes2[3] = crc & 0xff;
    bytes2[4] = crc >> 8 & 0xff;
    bytes2.set(bytes, 5);
    return bytes2;
  }
  return bytes;
}

// ===== HID READ EVENT ========================================================
export function read_event(client, size) {
  var bytes = new Uint8Array(size);
  if (client.pause) {
    bytes[0] = 0;
  } else {
    var value = client.send_event_buf.byteLength;
    if (value <= size - 1) {
      bytes[0] = 0x80 | value & 0xff;
      bytes.set(client.send_event_buf, 1);
      client.send_event_buf = new Uint8Array(0);
    } else {
      bytes[0] = 0x80 | size - 1 & 0xff;
      bytes.set(client.send_event_buf.subarray(0, size - 1), 1);
      client.send_event_buf = client.send_event_buf.subarray(size - 1);
    }
  }
  return bytes;
}

// ===== HID SEND CLIENT DATA ==================================================
export async function send_client_data(client) {
  if (is_hs_keyboard(client.device)) {
    hs_send_client_data(client);
    return;
  }
  try {
    if (client.allow_send) {
      var bytes;
      var i;
      var value = client.product_esb_ch;
      if (value == 0xff) {
        bytes = read_event(client, HID_REPORT_SIZE);
        i = bytes[0] & HID_LENGTH_MASK;
      } else {
        bytes = read_event(client, 63);
        i = bytes[0] & HID_LENGTH_MASK;
        var payload = Array.from(bytes);
        payload.unshift(0xc0 | value);
        while (payload.length < HID_REPORT_SIZE) {
          payload.push(0);
        }
        bytes = new Uint8Array(payload);
      }
      if (i > 0) {
        var value2 = client.device;
        if (!value2.opened) {
          await value2.open();
        }
        await value2.sendReport(0, bytes);
        if (client.virtual) {
          var flag = false;
          usb_client_list.forEach(item => {
            if (is_receiver(item) && item.device == client.device) {
              flag = is_limit_memory(item);
            }
          });
          if (flag) {
            client.allow_send = false;
          }
        }
        post_send_client_data(client);
      }
    } else {
      if (client.virtual) {
        var flag = false;
        usb_client_list.forEach(item2 => {
          if (is_receiver(item2) && item2.device == client.device) {
            flag = is_limit_memory(item2);
          }
        });
        if (flag) {
          var bytes = new Uint8Array(1);
          var value = client.product_esb_ch;
          bytes[0] = 64;
          var payload = Array.from(bytes);
          payload.unshift(0xc0 | value);
          while (payload.length < HID_REPORT_SIZE) {
            payload.push(0);
          }
          bytes = new Uint8Array(payload);
          var value2 = client.device;
          if (!value2.opened) {
            await value2.open();
          }
          await value2.sendReport(0, bytes);
        }
      }
      post_send_client_data(client);
    }
  } catch (err) {
    log_r(err);
  }
}

// ===== HS READ / SEND ========================================================
export function hs_format_data(client, data) {
  var bytes = new Uint8Array(data);
  var payload = [];
  for (var len = 0; len < HS_FRAME_SIZE; len++) {
    if (len < bytes.byteLength) {
      payload.push(bytes[len]);
    } else {
      payload.push(0);
    }
  }
  return new Uint8Array(payload);
}

export function hs_read_event(client, data) {
  var bytes = new Uint8Array(data);
  if (client.pause) {
    var value = client.send_event_buf.byteLength;
    if (value <= data - 1) {
      client.send_event_buf = new Uint8Array(0);
      return client.send_event_buf;
    }
  } else {
    var value = client.send_event_buf.byteLength;
    if (value <= data - 1) {
      client.send_event_buf = new Uint8Array(0);
      return client.send_event_buf;
    } else {
      bytes.set(client.send_event_buf.subarray(0, data), 0);
      client.send_event_buf = client.send_event_buf.subarray(data);
    }
  }
  return bytes;
}

export async function hs_send_client_data(client) {
  try {
    if (client.allow_send) {
      var bytes;
      var i;
      var value = client.product_esb_ch;
      if (value == 0xff) {
        bytes = hs_read_event(client, HS_FRAME_SIZE);
        i = bytes.length;
      } else {
        bytes = read_event(client, 63);
        i = bytes[0] & HID_LENGTH_MASK;
        var payload = Array.from(bytes);
        payload.unshift(0xc0 | value);
        while (payload.length < HID_REPORT_SIZE) {
          payload.push(0);
        }
        bytes = new Uint8Array(payload);
      }
      if (i > 0) {
        var value2 = client.device;
        if (!value2.opened) {
          await value2.open();
        }
        await value2.sendReport(0, bytes);
        if (client.virtual) {
          var flag = false;
          usb_client_list.forEach(item => {
            if (is_receiver(item) && item.device == client.device) {
              flag = is_limit_memory(item);
            }
          });
          if (flag) {
            client.allow_send = false;
          }
        }
        post_send_client_data(client);
      }
    } else {
      if (client.virtual) {
        var flag = false;
        usb_client_list.forEach(item2 => {
          if (is_receiver(item2) && item2.device == client.device) {
            flag = is_limit_memory(item2);
          }
        });
        if (flag) {
          var bytes = new Uint8Array(1);
          var value = client.product_esb_ch;
          bytes[0] = 64;
          var payload = Array.from(bytes);
          payload.unshift(0xc0 | value);
          while (payload.length < HID_REPORT_SIZE) {
            payload.push(0);
          }
          bytes = new Uint8Array(payload);
          var value2 = client.device;
          if (!value2.opened) {
            await value2.open();
          }
          await value2.sendReport(0, bytes);
        }
      }
      post_send_client_data(client);
    }
  } catch (err) {
    log_r(err);
  }
}

// ===== HS RECEIVE ============================================================
export function hs_recv(client, data) {
  if (client.eplapsed_syncing_ms != 0 && new Date().getTime() - client.eplapsed_syncing_ms > SYNC_TIMEOUT_MS) {
    if (client.syncing) {
      log_r(">>>>>>>>sync success");
      client.syncing = false;
    }
    client.recv_buf = new Uint8Array(0);
  }
  client.eplapsed_syncing_ms = new Date().getTime();
  var bytes = new Uint8Array(client.recv_buf.byteLength + data.byteLength);
  bytes.set(client.recv_buf);
  bytes.set(data, client.recv_buf.byteLength);
  client.recv_buf = bytes;
  if (!client.syncing) {
    hs_parse_cmd(client);
  }
}

export async function hs_device_receive_data(params) {
  var device = params.device;
  var data = params.data;
  usb_client_list.forEach(item => {
    if (item.device == device && !item.virtual) {
      var bytes = new Uint8Array(data.buffer);
      hs_recv(item, bytes);
    }
  });
}

// ===== HID RECEIVE ===========================================================
export function skip_recv_buf(data, len) {
  var bytes = new Uint8Array(data.byteLength - len);
  bytes.set(data.subarray(len));
  return bytes;
}

export function recv(client, data) {
  if (client.eplapsed_syncing_ms != 0 && new Date().getTime() - client.eplapsed_syncing_ms > SYNC_TIMEOUT_MS) {
    if (client.syncing) {
      log_r(">>>>>>>>sync success");
      client.syncing = false;
    }
    client.recv_buf = new Uint8Array(0);
  }
  client.eplapsed_syncing_ms = new Date().getTime();
  var bytes = new Uint8Array(client.recv_buf.byteLength + data.byteLength);
  bytes.set(client.recv_buf);
  bytes.set(data, client.recv_buf.byteLength);
  client.recv_buf = bytes;
  if (!client.syncing) {
    parse_cmd(client);
  }
}

export async function device_receive_data(params) {
  var device = params.device;
  var reportId = params.reportId;
  var data = params.data;
  if (data && data.byteLength > 0) {}
  if (is_hs_keyboard(device)) {
    hs_device_receive_data({
      'device': device,
      'reportId': reportId,
      'data': data
    });
    return;
  }
  usb_client_list.forEach(item => {
    if (item.device == device && !item.virtual) {
      var bytes = new Uint8Array(data.buffer);
      var value = 0xff;
      if ((bytes[0] & MASK_TOP_2BITS) == 0xc0) {
        value = bytes[0] & HID_LENGTH_MASK;
        bytes = bytes.subarray(1);
      }
      var offset = bytes[0] & HID_LENGTH_MASK;
      if (value == 0xff) {
        if ((bytes[0] & MASK_TOP_2BITS) == 0x40) {} else {
          bytes = bytes.subarray(1, 1 + offset);
          recv(item, bytes);
        }
      } else {
        usb_client_list.forEach(client => {
          if (client.device == device && client.virtual && client.product_esb_ch == value) {
            if ((bytes[0] & MASK_TOP_2BITS) == 0x40) {
              var value2 = bytes[1] | bytes[2] << 8 | bytes[3] << 16 | bytes[4] << 24;
              var value3 = bytes[15] | bytes[16] << 8 | bytes[17] << 16 | bytes[18] << 24;
              if ((bytes[0] & HID_LENGTH_MASK) < 0x12) {
                value3 = S.NOTIFY_DATA_BUF_SIZE;
              }
              if (value3 > 0) {
                if (value2 > value3 / 2) {
                  S.remote_buf_free_size = value2;
                }
              } else {
                S.remote_buf_free_size = value2;
              }
              if (S.remote_buf_free_size >= 240) {
                client.allow_send = true;
              }
            } else {
              bytes = bytes.subarray(1, 1 + offset);
              recv(client, bytes);
            }
          }
        });
      }
    }
  });
}
