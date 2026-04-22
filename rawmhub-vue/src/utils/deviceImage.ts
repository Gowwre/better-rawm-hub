export function getDeviceImageUrl(productId: number, type: 'mouse' | 'keyboard' = 'mouse', color?: string): string {
  const hexId = productId.toString(16).toLowerCase().padStart(4, '0')
  const base = 'https://hub.miracletek.net/hub/product'
  if (type === 'keyboard') {
    return `${base}/${hexId}/name.png`
  }
  if (color) {
    return `${base}/${hexId}/${color}/connected.png`
  }
  return `${base}/${hexId}/connected.png`
}
