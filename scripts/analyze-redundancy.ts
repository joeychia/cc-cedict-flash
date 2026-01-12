import { CEDICT_PINYINS, CEDICT_DEFINITIONS, CEDICT_DEF_LENGTHS } from './src/data/cedict.ts'

// Analyze Pinyins
const uniquePinyins = new Set(CEDICT_PINYINS)
console.log(`Total Pinyins: ${CEDICT_PINYINS.length}`)
console.log(`Unique Pinyins: ${uniquePinyins.size}`)
const pinyinIndexSize = CEDICT_PINYINS.length * 2 // Uint16 indices (if < 65k)
const pinyinPoolSize = Array.from(uniquePinyins).reduce((acc, s) => acc + s.length, 0)
console.log(`Est. Pinyin Pool Size (chars): ${pinyinPoolSize}`)
console.log(`Est. Indices Size (bytes): ${pinyinIndexSize}`)

// Analyze Definitions
// Need to split definitions back
const defLengths = Buffer.from(CEDICT_DEF_LENGTHS, 'base64')
const lengths = new Uint16Array(defLengths.buffer, defLengths.byteOffset, defLengths.byteLength / 2)
let offset = 0
const defs = []
for (let i = 0; i < lengths.length; i++) {
  const len = lengths[i]
  defs.push(CEDICT_DEFINITIONS.substr(offset, len))
  offset += len
}

const uniqueDefs = new Set(defs)
console.log(`Total Defs: ${defs.length}`)
console.log(`Unique Defs: ${uniqueDefs.size}`)
const defPoolSize = Array.from(uniqueDefs).reduce((acc, s) => acc + s.length, 0)
console.log(`Original Defs Size: ${CEDICT_DEFINITIONS.length}`)
console.log(`Unique Defs Size: ${defPoolSize}`)
