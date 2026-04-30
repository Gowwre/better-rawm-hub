import { readFileSync } from 'fs';
const source = readFileSync('ui/ui-settings.js', 'utf-8');
let s = source;
s = s.replace(/\/\/.*$/gm, '');
s = s.replace(/`[^`]*`/g, '``');
s = s.replace(/'[^']*'/g, "''");
s = s.replace(/"[^"]*"/g, '""');
// Find what the regex strip is eating
const before = s;
const regexPattern = /\/(?![*/])[^/\\]*(?:\\.[^/\\]*)*\/[gimsuy]*/g;
let match;
while ((match = regexPattern.exec(before)) !== null) {
  const context = before.substring(Math.max(0, match.index-30), match.index + match[0].length + 30);
  if (context.includes('SLEEP')) {
    console.log('Regex match eating SLEEP context:');
    console.log('  match:', JSON.stringify(match[0].substring(0, 80)));
    console.log('  context:', JSON.stringify(context));
  }
}
// Apply the regex and check
s = s.replace(regexPattern, '//');
console.log('\nSLEEP_MAX_SEC present after regex strip:', /\bSLEEP_MAX_SEC\b/.test(s));
