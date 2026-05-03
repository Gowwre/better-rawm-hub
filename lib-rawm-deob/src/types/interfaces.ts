// ===== SHARED INTERFACES =====================================================
// These interfaces are imported by multiple modules and grow through
// E.1–E.5 as each layer is converted to TypeScript.

// ===== Key Database Types ====================================================

export type KeyNameSpec =
  | string
  | [string, string]
  | { win: string | [string, string]; mac: string | [string, string] };

export interface KeyEntry {
  t: number;     // type (0=modifier, 1=mouse, 2=kbd, 3=media)
  v: number;     // vCode
  n: KeyNameSpec; // name
  a: number;     // aCode
  an: string;    // aName
  s: number;     // sCode
  id?: number;   // keyId
  r?: number;    // row
  c?: number;    // col
  rect?: [number, number, number, number]; // [x, y, w, h]
}

export interface KeyDatabase {
  modifiers: KeyEntry[];
  keys: KeyEntry[];
  kbd_5_15: KeyEntry[];
  kbd_5_14: KeyEntry[];
  kbd_select: KeyEntry[];
  mouse_select: KeyEntry[];
  rgb: KeyEntry[];
  media: KeyEntry[];
  windows: KeyEntry[];
  macro: KeyEntry[];
  extra: KeyEntry[];
}

// ===== Device Database Types =================================================

export interface ProductEntry {
  name: string;
  sensor: string | null;
}

export interface DeviceDatabase {
  products: Record<number, ProductEntry>;
  getSensor(productId: number): string | null;
  getName(productId: number): string | null;
  nameSensorFallbacks: Record<string, string | undefined>;
  getSensorByName(deviceName: string): string | null;
}

// ===== Device Types ==========================================================

export interface HidClient {
  id?: string;
  device: HIDDevice;
  device_info?: DeviceInfo;
  recv_buf?: Uint8Array;
  syncing?: boolean;
  sync_timer?: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface DeviceInfo {
  serial_num?: string;
  firmwareVersion?: string;
  productName?: string;
  productId?: number;
  vendorId?: number;
  cpi?: number;
  cpi_levels?: number[];
  powerMode?: number;
  pollingRate?: number;
  sleepTime?: number;
  lod?: number;
  angleTuning?: number;
  keyDelay?: number;
  brightness?: number;
  lightMode?: number;
  kbd_key_infos?: unknown[];
  kbd_light_info?: unknown;
  kbd_axis_infos?: unknown[];
  kbd_axis_mode?: number;
  kbd_socd_infos?: unknown[];
  kbd_mt_infos?: unknown[];
  kbd_rs_infos?: unknown[];
  kbd_dks_infos?: unknown[];
  kbd_macro_infos?: unknown[];
  kbd_macro_num?: number;
  kbd_macro_max_size?: number;
  kbd_onboardNum?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// ===== Device Store Types ====================================================

export interface KbdSync {
  index: number;
  keyinfoList: unknown[];
  axisinfoList: unknown[];
  socdinfoList: unknown[];
  mtinfoList: unknown[];
  rsinfoList: unknown[];
  dksinfoList: unknown[];
  lightinfoList: unknown[];
  macroinfoList: unknown[];
  macroIndex: number;
  macroBuff: number[];
}

export type DeviceStoreEvent =
  | 'client:added'
  | 'client:removed'
  | 'current:changed'
  | 'device:updated'
  | 'device:synced';

export interface DeviceStoreShape {
  clients: HidClient[];
  currentId: string | null;
  readonly current: HidClient | null;
  kbdSync: KbdSync;
  getClient(id: string): HidClient | null;
  getDeviceInfo(client: HidClient): DeviceInfo | null;
  addClient(hidDevice: HIDDevice, value: number, virtual: boolean): HidClient;
  removeClient(id: string): void;
  selectClient(id: string): void;
  updateDeviceInfo(id: string, patch: Partial<DeviceInfo>): void;
  on(event: DeviceStoreEvent, handler: (...args: unknown[]) => void): void;
  off(event: DeviceStoreEvent, handler: (...args: unknown[]) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _emit(event: DeviceStoreEvent, ...args: any[]): void;
  [key: string]: unknown;
}

// ===== Protocol Types ========================================================

export interface PacketBuilder {
  uint8(v: number): PacketBuilder;
  uint16(v: number): PacketBuilder;
  uint24(v: number): PacketBuilder;
  uint32(v: number): PacketBuilder;
  bytes(arr: number[]): PacketBuilder;
  padTo(len: number, value?: number): PacketBuilder;
  build(): Uint8Array;
}

export interface PacketReader {
  uint8(): number;
  uint16(): number;
  uint16BE(): number;
  uint32(): number;
  subarray(len: number): Uint8Array;
  skip(len: number): PacketReader;
  done(): boolean;
  remaining(): number;
  atEnd(): boolean;
}

// ===== Handler Types =========================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandlerFn = (client: HidClient, data: any) => void;
export type HandlerRegistry = Record<number, HandlerFn | undefined>;
