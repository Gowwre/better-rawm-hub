/// <reference types="vite/client" />

// WebHID API types (not fully included in standard lib.dom)
interface HIDDeviceFilter {
  vendorId?: number
  productId?: number
  usagePage?: number
  usage?: number
  serialNumber?: string
}

interface HIDDeviceRequestOptions {
  filters?: HIDDeviceFilter[]
  exclusionFilters?: HIDDeviceFilter[]
}

interface HIDConnectionEvent extends Event {
  device: HIDDevice
}

interface HIDInputReportEvent extends Event {
  device: HIDDevice
  reportId: number
  data: DataView
}

interface HID extends EventTarget {
  getDevices(): Promise<HIDDevice[]>
  requestDevice(options?: HIDDeviceRequestOptions): Promise<HIDDevice[]>
  addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void
}

interface HIDDevice extends EventTarget {
  opened: boolean
  vendorId: number
  productId: number
  productName: string
  serialNumber?: string
  collections: HIDCollectionInfo[]
  open(): Promise<void>
  close(): Promise<void>
  sendReport(reportId: number, data: BufferSource): Promise<void>
  sendFeatureReport(reportId: number, data: BufferSource): Promise<void>
  receiveFeatureReport(reportId: number): Promise<DataView>
  addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions): void
}

interface HIDCollectionInfo {
  usagePage: number
  usage: number
  type: number
  children: HIDCollectionInfo[]
  inputReports: HIDReportInfo[]
  outputReports: HIDReportInfo[]
  featureReports: HIDReportInfo[]
}

interface HIDReportInfo {
  reportId: number
  items: HIDReportItem[]
}

interface HIDReportItem {
  isAbsolute: boolean
  isArray: boolean
  isRange: boolean
  hasNull: boolean
  usages: number[]
  usageMinimum: number
  usageMaximum: number
  reportSize: number
  reportCount: number
  unitExponent: number
  unitSystem: number
  unitFactorLengthExponent: number
  unitFactorMassExponent: number
  unitFactorTimeExponent: number
  unitFactorTemperatureExponent: number
  unitFactorCurrentExponent: number
  unitFactorLuminousIntensityExponent: number
  logicalMinimum: number
  logicalMaximum: number
  physicalMinimum: number
  physicalMaximum: number
  strings: string[]
}

interface Navigator {
  readonly hid: HID
}

interface Window {
  HIDDevice: typeof HIDDevice
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
