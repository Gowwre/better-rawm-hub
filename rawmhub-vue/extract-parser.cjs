/**
 * Auto-extract hs_parse_cmd from library.formatted.js
 * and generate a TypeScript parser skeleton.
 */
const fs = require('fs')
const path = require('path')

const libPath = path.join(__dirname, 'public', 'lib', 'library.formatted.js')
const src = fs.readFileSync(libPath, 'utf-8')

// Find hs_parse_cmd function bounds
const startMarker = 'function hs_parse_cmd('
const startIdx = src.indexOf(startMarker)
if (startIdx === -1) {
  console.error('hs_parse_cmd not found')
  process.exit(1)
}

// Find matching closing brace by counting braces
let braceCount = 0
let foundFirstBrace = false
let endIdx = startIdx
for (let i = startIdx; i < src.length; i++) {
  if (src[i] === '{') {
    braceCount++
    foundFirstBrace = true
  } else if (src[i] === '}') {
    braceCount--
    if (foundFirstBrace && braceCount === 0) {
      endIdx = i + 1
      break
    }
  }
}

const funcBody = src.substring(startIdx, endIdx)

// Extract case labels
const caseRegex = /case\s+(IQ_[A-Z_0-9]+):/g
const cases = []
let m
while ((m = caseRegex.exec(funcBody)) !== null) {
  cases.push(m[1])
}

// Generate TypeScript skeleton
const lines = []
lines.push('/**')
lines.push(' * Auto-generated device response parser skeleton')
lines.push(' * Based on hs_parse_cmd from library.min.js')
lines.push(' */')
lines.push('')
lines.push("import type { RawmDevice } from './rawm-device'")
lines.push("import * as P from './rawm-protocol'")
lines.push('')
lines.push('export interface ParsedResponse {')
lines.push('  type: string')
lines.push('  payload?: any')
lines.push('}')
lines.push('')
lines.push('export function parseDeviceResponse(device: RawmDevice, recvBuf: Uint8Array): ParsedResponse[] {')
lines.push('  const responses: ParsedResponse[] = []')
lines.push('  let buf = recvBuf')
lines.push('  const kbdKeyNum = (device.device_info.kbd_key_infos?.length || 0)')
lines.push('')
lines.push('    while (buf.length >= 64) {')
lines.push('      const packet = buf.subarray(0, 64)')
lines.push('      buf = buf.subarray(64)')
lines.push('      const cmd = packet[0]')
lines.push('')
lines.push('    switch (cmd) {')

for (const caseName of cases) {
  lines.push(`      case P.${caseName}:`)
  lines.push(`        // TODO: implement ${caseName}`)
  lines.push(`        responses.push({ type: '${caseName}', payload: packet.subarray(1) })`)
  lines.push(`        break`)
  lines.push('')
}

lines.push('      default:')
lines.push('        responses.push({ type: `UNKNOWN_0x${cmd.toString(16)}`, payload: packet })')
lines.push('        break')
lines.push('    }')
lines.push('  }')
lines.push('')
lines.push('  return responses')
lines.push('}')

const outPath = path.join(__dirname, 'src', 'lib', 'rawm-parser-skeleton.ts')
fs.writeFileSync(outPath, lines.join('\n'))
console.log(`Generated parser skeleton with ${cases.length} cases: ${outPath}`)
console.log('Cases:', cases.join(', '))
