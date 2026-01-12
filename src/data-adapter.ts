// Use local copy within cc-cedict-flash
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  CEDICT_PINYINS as LOCAL_CEDICT_PINYINS_STR,
  CEDICT_PINYIN_LENGTHS as LOCAL_CEDICT_PINYIN_LENGTHS,
  CEDICT_DEF_LENGTHS as LOCAL_CEDICT_DEF_LENGTHS,
  CEDICT_DEFINITIONS as LOCAL_CEDICT_DEFINITIONS,
  CEDICT_DEF_TOKENS as LOCAL_CEDICT_DEF_TOKENS,
  CEDICT_TRIE_CHARS as LOCAL_CEDICT_TRIE_CHARS,
  CEDICT_TRIE_VALUES as LOCAL_CEDICT_TRIE_VALUES,
  CEDICT_TRIE_CHILD_INDICES as LOCAL_CEDICT_TRIE_CHILD_INDICES,
  CEDICT_TRIE_CHILD_COUNTS as LOCAL_CEDICT_TRIE_CHILD_COUNTS,
} from './data/cedict.js'
import type { CedictData } from './index'

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString =
    typeof atob === 'function'
      ? atob(base64)
      : (typeof (globalThis as any).Buffer !== 'undefined'
          ? (globalThis as any).Buffer.from(base64, 'base64').toString('binary')
          : (() => {
              throw new Error('Base64 decoding unavailable')
            })())
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

function base64ToUint16Array(base64: string): Uint16Array {
  const bytes = base64ToUint8Array(base64)
  return new Uint16Array(bytes.buffer)
}

function base64ToUint32Array(base64: string): Uint32Array {
  const bytes = base64ToUint8Array(base64)
  return new Uint32Array(bytes.buffer)
}

export function builtinCedictData(): CedictData {
  const pinyinLengths = base64ToUint8Array(LOCAL_CEDICT_PINYIN_LENGTHS)
  const defLengths = base64ToUint16Array(LOCAL_CEDICT_DEF_LENGTHS)
  const trieChars = base64ToUint16Array(LOCAL_CEDICT_TRIE_CHARS)
  const trieValues = base64ToUint32Array(LOCAL_CEDICT_TRIE_VALUES)
  const trieChildIndices = base64ToUint32Array(LOCAL_CEDICT_TRIE_CHILD_INDICES)
  const trieChildCounts = base64ToUint16Array(LOCAL_CEDICT_TRIE_CHILD_COUNTS)

  // Inflate pinyin lengths to offsets
  const pinyinOffsets = new Uint32Array(pinyinLengths.length + 1)
  let cur = 0
  for (let i = 0; i < pinyinLengths.length; i++) {
    pinyinOffsets[i] = cur
    cur += pinyinLengths[i]
  }
  pinyinOffsets[pinyinLengths.length] = cur

  return {
    pinyinsStr: LOCAL_CEDICT_PINYINS_STR,
    pinyinOffsets,
    defLengths,
    definitions: LOCAL_CEDICT_DEFINITIONS,
    tokens: LOCAL_CEDICT_DEF_TOKENS,
    trieChars,
    trieValues,
    trieChildIndices,
    trieChildCounts,
  }
}
