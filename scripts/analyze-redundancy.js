import { CEDICT_PINYINS, CEDICT_DEFINITIONS, CEDICT_DEF_LENGTHS } from '../dist/data/cedict.js'

// Analyze Pinyins
const uniquePinyins = new Set(CEDICT_PINYINS)
console.log(`Total Pinyins: ${CEDICT_PINYINS.length}`)
console.log(`Unique Pinyins: ${uniquePinyins.size}`)
// If unique < 65536, we can use Uint16 for indices.
const pinyinIndexSize = CEDICT_PINYINS.length * 2 
const pinyinPoolSize = Array.from(uniquePinyins).reduce((acc, s) => acc + s.length, 0)
console.log(`Est. Pinyin Pool Size (chars): ${pinyinPoolSize}`)
console.log(`Est. Indices Size (bytes): ${pinyinIndexSize}`)

// Analyze Definitions
// CEDICT_DEF_LENGTHS is a Base64 string now.
const binaryString = atob(CEDICT_DEF_LENGTHS)
const len = binaryString.length
const bytes = new Uint8Array(len)
for (let i = 0; i < len; i++) {
  bytes[i] = binaryString.charCodeAt(i)
}
const lengths = new Uint16Array(bytes.buffer)

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
