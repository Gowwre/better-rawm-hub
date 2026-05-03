import { hsHandlers } from './hs-parser.js';
import { send_event, hs_format_data, skip_recv_buf, crc_process } from './hid-transport.js';
import { PacketBuilder } from './buffer.js';
import { DeviceStore } from '../state/device-store.js';
import { kbd_create_light_info, kbd_create_light_box_info } from '../state/kbd-structures.js';
import { log_r } from './parse-cmd-ui.js';
import { CMD_FIRMWARE_VERSION, CMD_HS_FACTORY_RESET, CMD_KEYCODE_FACTORY_RESET, CMD_GET_ONBOARD_INDEX, CMD_SET_ONBOARD_INDEX, CMD_GET_KEYCODE_BUF, CMD_SET_KEYCODE, CMD_CUSTOM_DATA_SAVE, CMD_GET_LIGHT_DEFINE_BUF, CMD_SET_LIGHT_DEFINE, CMD_GET_LIGHT, CMD_SET_LIGHT, CMD_GET_LIGHT_SLEEP, CMD_SET_LIGHT_SLEEP, CMD_GET_AXIS_INFO, CMD_SET_AXIS_INFO, CMD_SOCD_GET_NUM, CMD_SOCD_SET_NUM, CMD_SOCD_GET_DATA, CMD_SOCD_SET_DATA, CMD_MT_GET_NUM, CMD_MT_SET_NUM, CMD_MT_GET_DATA, CMD_MT_SET_DATA, CMD_RS_GET_NUM, CMD_RS_SET_NUM, CMD_RS_GET_DATA, CMD_RS_SET_DATA, CMD_DKS_GET_NUM, CMD_DKS_SET_NUM, CMD_DKS_GET_DATA, CMD_DKS_SET_DATA, CMD_MACRO_GET, CMD_MACRO_SET, CMD_MACRO_NUM, CMD_MACRO_SIZE, CMD_MACRO_RESET, CMD_GET_AXIS_MODE, CMD_SET_AXIS_MODE, CMD_GET_LIGHT_BOX, CMD_SET_LIGHT_BOX, HS_FRAME_SIZE, HS_CHUNK_MAX, LIGHT_PARAM_BRIGHTNESS, LIGHT_PARAM_MODE, LIGHT_PARAM_SPEED, LIGHT_PARAM_HUE_SAT, LIGHT_PARAM_BOX_MODE, SYNC_FLAG_KEYCODE, SYNC_FLAG_LIGHT, SYNC_FLAG_AXIS, SYNC_FLAG_ADVANCED } from '../data/constants.js';
import { pc_kbd_key_num, pc_kbd_manager_keys } from '../state/key-lookup.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_firmware_version(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_FIRMWARE_VERSION).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_factory_reset(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_HS_FACTORY_RESET).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_keycode_factory_reset(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_KEYCODE_FACTORY_RESET).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_onboard_index(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_ONBOARD_INDEX).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_onboard_index(client: any, index: number) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_ONBOARD_INDEX).uint8(index).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_keycode_buff(client: any, offset: number, count: number) {
  if (count > HS_CHUNK_MAX) return;
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_KEYCODE_BUF).uint16(offset).uint8(count).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_keycode(client: any, value: any, type: any, index: any, value2: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_KEYCODE).uint8(value).uint8(type).uint8(index).uint16(value2).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function he_custom_data_save(client: any, data: any) {
  log_r('he_custom_data_save:' + data);
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_CUSTOM_DATA_SAVE).uint8(data).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_light(client: any, mode: any) {
  log_r("hs_get_light:" + mode);
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT).uint8(0x3).uint8(mode).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_light(client: any, value: any, data: any) {
  var builder = PacketBuilder.begin(CMD_SET_LIGHT).uint8(0x3).uint8(value);
  if (value == LIGHT_PARAM_BRIGHTNESS) {
    builder.uint8(data.brightness);
  } else if (value == LIGHT_PARAM_MODE) {
    builder.uint8(data.mode);
  } else if (value == LIGHT_PARAM_SPEED) {
    builder.uint8(data.speed);
  } else if (value == LIGHT_PARAM_HUE_SAT) {
    builder.uint8(data.hue).uint8(data.sat);
  } else if (value == LIGHT_PARAM_BOX_MODE) {
    builder.uint8(data.light_box_mode);
  }
  send_event(client, hs_format_data(client, builder.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_light_sleep_time(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT_SLEEP).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_light_sleep_time(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_LIGHT_SLEEP).uint8(value > 0 ? 1 : 0).uint16(value).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_light_buff(client: any, value: any, index: number) {
  if (index > HS_CHUNK_MAX) return;
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT_DEFINE_BUF).uint16(value).uint8(index).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_light_define(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_LIGHT_DEFINE).uint8(value.row).uint8(value.col).uint8(value.hue).uint8(value.sat).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_light_define_infos(client: any, value: any[]) {
  if (value.length > 0) {
    DeviceStore.kbdSync.lightinfoList.splice(0, DeviceStore.kbdSync.lightinfoList.length);
    DeviceStore.kbdSync.lightinfoList = value.slice();
    hs_set_light_define(client, DeviceStore.kbdSync.lightinfoList[0]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_light_box(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT_BOX).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_light_box(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_LIGHT_BOX).uint8(0x1).uint8(value.mode).uint8(value.colored).uint8(value.brightness).uint8(value.speed).uint8(value.r).uint8(value.g).uint8(value.b).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_axis_mode(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_AXIS_MODE).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_axis_mode(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_AXIS_MODE).uint8(value).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_axis_info(client: any, index: number, count: number) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_AXIS_INFO).uint8(index).uint8(count).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_axis_info(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_AXIS_INFO).uint8(value.row).uint8(value.col).uint8(value.rt_enable).uint16(value.top_dz).uint16(value.apc_lv).uint16(value.rt_press_lv).uint16(value.rt_release_lv).uint16(value.btm_dz).uint8(value.switch_type).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_axis_infos(client: any, value: any[]) {
  if (value.length > 0) {
    DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
    DeviceStore.kbdSync.axisinfoList = value.slice();
    hs_set_axis_info(client, DeviceStore.kbdSync.axisinfoList[0]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_socd_num(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_GET_NUM).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_socd_num(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_SET_NUM).uint8(value).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_socd_data(client: any, index: number) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_GET_DATA).uint8(index).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_socd_infos(client: any, value: any[]) {
  if (value.length > 0) {
    DeviceStore.kbdSync.socdinfoList.splice(0, DeviceStore.kbdSync.socdinfoList.length);
    DeviceStore.kbdSync.socdinfoList = value.slice();
    hs_set_socd_data(client, DeviceStore.kbdSync.socdinfoList[0]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_socd_data(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_SET_DATA).uint8(value.id).uint8(value.row1).uint8(value.col1).uint8(value.row2).uint8(value.col2).uint8(value.socd_mode).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_mt_num(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_GET_NUM).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_mt_num(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_SET_NUM).uint8(value).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_mt_data(client: any, index: number) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_GET_DATA).uint8(index).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_mt_infos(client: any, value: any[]) {
  if (value.length > 0) {
    DeviceStore.kbdSync.mtinfoList.splice(0, DeviceStore.kbdSync.mtinfoList.length);
    DeviceStore.kbdSync.mtinfoList = value.slice();
    hs_set_mt_data(client, DeviceStore.kbdSync.mtinfoList[0]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_mt_data(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_SET_DATA).uint8(value.id).uint8(value.row).uint8(value.col).uint16(value.tap_time).uint16(value.keyCode1).uint16(value.keyCode2).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_rs_num(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_GET_NUM).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_rs_num(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_SET_NUM).uint8(value).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_rs_data(client: any, index: number) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_GET_DATA).uint8(index).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_rs_infos(client: any, value: any[]) {
  if (value.length > 0) {
    DeviceStore.kbdSync.rsinfoList.splice(0, DeviceStore.kbdSync.rsinfoList.length);
    DeviceStore.kbdSync.rsinfoList = value.slice();
    hs_set_rs_data(client, DeviceStore.kbdSync.rsinfoList[0]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_rs_data(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_SET_DATA).uint8(value.id).uint8(value.row1).uint8(value.col1).uint8(value.row2).uint8(value.col2).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_dks_num(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_GET_NUM).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_dks_num(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_SET_NUM).uint8(value).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_dks_data(client: any, index: number) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_GET_DATA).uint8(index).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_dks_infos(client: any, value: any[]) {
  if (value.length > 0) {
    DeviceStore.kbdSync.dksinfoList.splice(0, DeviceStore.kbdSync.dksinfoList.length);
    DeviceStore.kbdSync.dksinfoList = value.slice();
    hs_set_dks_data(client, DeviceStore.kbdSync.dksinfoList[0]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_dks_data(client: any, value: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_SET_DATA).uint8(value.id).uint8(value.row).uint8(value.col).uint16(value.keyCode1).uint16(value.state1).uint16(value.keyCode2).uint16(value.state2).uint16(value.keyCode3).uint16(value.state3).uint16(value.keyCode4).uint16(value.state4).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reset_macro_buf(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_RESET).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_macro_num(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_NUM).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_macro_buffer_size(client: any) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_SIZE).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_macro_buf(client: any, value: any[]) {
  DeviceStore.kbdSync.macroinfoList.splice(0, DeviceStore.kbdSync.macroinfoList.length);
  DeviceStore.kbdSync.macroinfoList = value.slice();
  reset_macro_buf(client);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_macro_data(client: any, value: any) {
  var builder = PacketBuilder.begin(CMD_MACRO_SET).uint16(value);
  var offset = 0;
  if (value + HS_CHUNK_MAX < DeviceStore.kbdSync.macroBuff.length) {
    offset = HS_CHUNK_MAX;
  } else {
    offset = DeviceStore.kbdSync.macroBuff.length - value;
  }
  builder.uint8(offset);
  for (var len = 0; len < offset; len++) {
    builder.uint8(DeviceStore.kbdSync.macroBuff[value + len]);
  }
  send_event(client, hs_format_data(client, builder.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_get_macro_buf(client: any, value: any, index: number) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_GET).uint16(value).uint8(index).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_set_data_sync_index(client: any) {
  DeviceStore.kbdSync.index = client;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_data_sync(client: any) {
  if ((DeviceStore.kbdSync.index & SYNC_FLAG_KEYCODE) != 1) {
    DeviceStore.kbdSync.keyinfoList.splice(0, DeviceStore.kbdSync.keyinfoList.length);
    client.device_info.kbd_key_infos.splice(0, client.device_info.kbd_key_infos.length);
    hs_get_keycode_buff(client, 0, HS_CHUNK_MAX);
  } else if ((DeviceStore.kbdSync.index & SYNC_FLAG_LIGHT) != 2) {
    DeviceStore.kbdSync.lightinfoList.splice(0, DeviceStore.kbdSync.lightinfoList.length);
    client.device_info.kbd_light_info = kbd_create_light_info();
    hs_get_light(client, LIGHT_PARAM_BRIGHTNESS);
  } else if ((DeviceStore.kbdSync.index & SYNC_FLAG_AXIS) != 4) {
    DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
    client.device_info.kbd_axis_infos.splice(0, client.device_info.kbd_axis_infos.length);
    hs_get_axis_info(client, 0, 0);
  } else if ((DeviceStore.kbdSync.index & SYNC_FLAG_ADVANCED) != 8) {
    hs_get_socd_num(client);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hs_parse_cmd(client: any) {
  var i: boolean;
  var value = pc_kbd_key_num(client);
  var len = pc_kbd_manager_keys(client);
  do {
    i = false;
    var byteLen = client.recv_buf;
    var value2 = byteLen.byteLength;
    if (value2 >= HS_FRAME_SIZE) {
      var firstByte = byteLen[0];
      var handler = hsHandlers[firstByte];
      if (handler) {
        handler(client, byteLen);
      }
      if (!client.syncing) {
        client.recv_buf = skip_recv_buf(client.recv_buf, HS_FRAME_SIZE);
        i = true;
      }
    }
  } while (i);
}
