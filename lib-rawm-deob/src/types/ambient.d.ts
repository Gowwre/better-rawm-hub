// Ambient declarations for globals not covered by module imports.
// layui and $ are provided by CDN scripts in hub-deob.html.
// window.* assignments expose entry-point functions to inline HTML handlers.

import type { S } from '../../protocol/parse-cmd-ui.js';
import type { DS } from '../../state/device-store.js';

declare global {
  // layui framework types
  interface LayuiDevice {
    os: string;
    osVersion: string;
    browser: string;
  }

  interface Layui {
    use: (modules: string[], callback: () => void) => void;
    device: (key?: string) => LayuiDevice;
    config: (options: Record<string, unknown>) => Layui;
    extend: (options: Record<string, string>) => void;
    form: {
      render: (type?: string) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: (eventFilter: string, callback: (...args: any[]) => void) => void;
    };
    element: {
      tabChange: (filter: string, index: number) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: (eventFilter: string, callback: (...args: any[]) => void) => void;
    };
    table: {
      reloadData: (id: string, options: Record<string, unknown>) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: (eventFilter: string, callback: (...args: any[]) => void) => void;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    util: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: ((key: string) => Record<string, any>) & ((key: string, value: Record<string, any>) => void);
    layer: {
      open: (options: Record<string, unknown>) => number;
      close: (index: number) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      msg: (content: string, options?: Record<string, any>, callback?: (...args: any[]) => void) => void;
      load: (icon?: number) => number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      confirm: (content: string, options: Record<string, any>, btn1?: (...args: any[]) => void, btn2?: (...args: any[]) => void) => void;
      closeLast: (type: number) => void;
      closeAll: () => void;
      style: (index: number, style: Record<string, string>) => void;
      width: (index: number, width: number) => void;
    };
    i18np: {
      prop: (key: string) => string;
      loadProperties: (url: string, options?: Record<string, unknown>) => void;
    };
    $: JQueryStatic & ((selector: string) => JQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slider: any;

  }

  // jQuery (bundled with layui)
  interface JQueryStatic {
    (selector: string, context?: Element | Document): JQuery;
    (element: Element): JQuery;
    (callback: () => void): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ajax: (settings: Record<string, any>) => void;
  }

  // Extend HTMLElement for common DOM access patterns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface HTMLElement { [key: string]: any; }

interface JQuery {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: (event: string, handler: (...args: any[]) => void) => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off: (event: string, handler?: (...args: any[]) => void) => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    css: (property: string, value?: any) => this | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    html: (content?: string) => this | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    val: (value?: any) => this | any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attr: (attribute: string, value?: any) => this | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: (key: string, value?: any) => this | any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remove: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    find: (selector: string) => JQuery;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    each: (callback: ((index: number, element: any) => void) | ((this: Element) => void)) => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addClass: (className: string) => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    removeClass: (className: string) => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    show: () => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hide: () => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    empty: () => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    append: (content: string | Element | JQuery) => this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prop: (name: string, value?: any) => this | any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: (content?: string) => this | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    width: ((value?: any) => any) & number;
    click: ((handler?: (...args: any[]) => void) => this);
    offset: () => { top: number; left: number };
    innerWidth: () => number;
    parent: () => JQuery;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trigger: (event: string, ...args: any[]) => this;
    length: number;
  }

  // Global layui instance
  const layui: Layui;
  const $: JQueryStatic;

  // WebHID types
  interface HIDDevice {
    opened: boolean;
    vendorId: number;
    productId: number;
    productName: string;
    collections: HIDCollectionInfo[];
    open: () => Promise<void>;
    close: () => Promise<void>;
    sendReport: (reportId: number, data: BufferSource) => Promise<void>;
    sendFeatureReport: (reportId: number, data: BufferSource) => Promise<void>;
    receiveFeatureReport: (reportId: number) => Promise<DataView>;
    oninputreport: ((event: HIDInputReportEvent) => void) | null;
  }

  interface HIDCollectionInfo {
    usagePage: number;
    usage: number;
    type: 'input' | 'output' | 'feature';
    children: HIDCollectionInfo[];
  }

  interface HIDInputReportEvent extends Event {
    device: HIDDevice;
    reportId: number;
    data: DataView;
  }

  interface Navigator {
    hid?: HIDManager;
  }

  interface HIDManager extends EventTarget {
    getDevices: () => Promise<HIDDevice[]>;
    requestDevice: (options: HIDDeviceRequestOptions) => Promise<HIDDevice[]>;
    onconnect: ((event: HIDConnectionEvent) => void) | null;
    ondisconnect: ((event: HIDConnectionEvent) => void) | null;
  }

  interface HIDDeviceRequestOptions {
    filters: Array<{
      vendorId?: number;
      productId?: number;
      usagePage?: number;
      usage?: number;
    }>;
  }

  interface HIDConnectionEvent extends Event {
    device: HIDDevice;
  }

  // Extend Event with deltaX/deltaY for wheel events
  interface Event {
    deltaX: number;
    deltaY: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface EventTarget { [key: string]: any; }

  // Allow setTimeout with extra args
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setTimeout(callback: (...args: any[]) => void, ms?: number, ...args: any[]): number;

  // sprintf (from CDN script)
  function sprintf(format: string, ...args: unknown[]): string;

  // BigNumber (from CDN script)
  class BigNumber {
    constructor(value: number | string | BigNumber);
    plus(value: number | string | BigNumber): BigNumber;
    multipliedBy(value: number | string | BigNumber): BigNumber;
    toFixed(): string;
  }

  // RAWMHub IIFE namespace
  const RAWMHub: {
    shell_cmd_app_browse_file: () => void;
  };

  interface Window {
    shell_cmd_app_browse_file: () => void;
    RAWMHub: typeof RAWMHub;
    S: Record<string, unknown>;
    postMessage: typeof window.postMessage;
  }
}

export {};
