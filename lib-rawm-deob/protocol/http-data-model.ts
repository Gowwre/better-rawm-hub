import { send_event, crc_process } from './hid-transport.js';
import { send_event_action } from './hid-protocol.js';
import { DeviceStore, DS, ACTION_UI_REFRESH_CURRENT_CLIENT, is_glass_mode_supported } from '../state/device-store.js';
import { DEVICE_DB } from '../data/device-database.js';
import { log_r } from './parse-cmd-ui.js';
import { CMD_FACTORY_RESET } from '../data/constants.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_config_reset(client: any) {
  var payload: number[] = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(0x3);
  send_event(client, crc_process(client, payload));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_factory_reset(client: any, isReboot: boolean) {
  send_event_action(client, CMD_FACTORY_RESET, isReboot ? 0x1 : 0x0);
  client.device_info.pollingRate = -0x1;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function query_firmware(client: any, fwChannel: number) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        if (this.responseText.length > 0x0) {
          client.device_info.firmwareInfo = JSON.parse(this.responseText);
        }
      } catch (err) {
        log_r(err);
      }
      if (navigator.hid != undefined) {
        window.postMessage({
          'action': ACTION_UI_REFRESH_CURRENT_CLIENT
        });
      }
    }
  };
  xhr.open("GET", "https://www.miracletek.net/game/firmware.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x1 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + '&devName=' + client.device_info.deviceName + '&vendorId=' + client.device_info.vendorId + "&productId=" + client.device_info.productId + "&devRevName=" + client.device_info.revision + "&devRevCode=" + client.device_info.revisionCode + "&devHwCode=" + client.device_info.hardwareCode + "&devMode=" + 0x1 + "&devFwChn=" + fwChannel, true);
  xhr.send();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function upload_mouse_config(client: any, value: number, value2: number) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        if (this.responseText.length > 0x0) {
          log_r(this.responseText);
        }
      } catch (err2) {
        log_r(err2);
      }
    }
  };
  var bn = new BigNumber(0x0);
  var bn2 = new BigNumber(0x1);
  var len = client.device_info.keyDelay;
  for (var index = 0x0; index < len.length; index++) {
    var bn3 = new BigNumber(len[index]);
    bn3 = bn3.multipliedBy(bn2);
    bn = bn.plus(bn3);
    bn2 = bn2.multipliedBy(0x100);
  }
  var len2 = client.device_info.sensor;
  if (len2.length == 0x0) {
    len2 = DEVICE_DB.getSensor(client.device_info.productId)
      ?? DEVICE_DB.getSensorByName(client.device_info.deviceName)
      ?? '';
  }
  xhr.open("GET", "https://www.miracletek.net/game/mouse_config.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x1 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + "&devName=" + client.device_info.deviceName + "&sensor=" + len2 + '&uuid=' + client.device_info.esbAddress + "&performance=" + client.device_info.powerMode + "&lod=" + client.device_info.lod + '&angle_snapping=' + client.device_info.angleSnapping + "&ripple_control=" + client.device_info.rippleControl + '&motion_sync=' + client.device_info.motionSync + "&wireless_turbo=" + (client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) + '&sleep_time=' + value2 + "&angle_tuning=" + client.device_info.angleTuning + "&key_delay=" + bn.toFixed() + "&channel=" + value + "&polling_rate=" + client.device_info.pollingRate + "&glass_mode=" + (is_glass_mode_supported(client) && client.device_info.glassModeEnabled ? 0x1 : 0x0) + "&dpi_xy=" + ((client.device_info.resolution & 0xffff0000) != 0x0 ? 0x1 : 0x0), true);
  xhr.send();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function upload_mouse_config_delayed(deviceInfo: any, channel: number, sleepTime: number) {
  DS.upload_mouse_config_timer = undefined;
  upload_mouse_config(deviceInfo, channel, sleepTime);
}
