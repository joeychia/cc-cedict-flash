### cc-cedict-flash

CC-CEDICT based Chinese→English lookup with pinyin output and Trie-based segmentation. Minimal, fast, and independent.

### Install

```bash
npm install cc-cedict-flash
```

### Usage
```ts
import { pinyinEn } from 'cc-cedict-flash'

const res = pinyinEn('你好', { toneType: 'num' })
```

Advanced:

```ts
import { createCedictFlash, builtinCedictData } from 'cc-cedict-flash'

const api = createCedictFlash(builtinCedictData())
const res = api.pinyinEn('你好')
```

### Build the dict locally

```bash
# From cc-cedict-flash/
npm run build:dict
```

This downloads the latest CC‑CEDICT zip if changed, extracts the raw dict, and generates `src/data/cedict.ts` with packed arrays used by the API. Raw assets are not required at runtime; the builder restores them on demand.

### TypeScript

- Root exports include types and ESM entry:

```ts
import { pinyinEn, type EnglishResult, type PinyinEnOptions } from 'cc-cedict-flash'
```

### Segmentation

- Forward Maximum Matching over a Packed Static Trie built from CC-CEDICT entries.
- Longest dictionary word per position; non-dict content becomes single-character tokens.

### Options

- `toneType`: `'symbol' | 'none' | 'num'`

### Response

- Array of tokens: `{ zh: string, pinyin: string, en: string[] }`

### Footprint & Benchmarks

Compared to [cc-cedict](https://github.com/edvardsr/cc-cedict) (v1.1.1):

| Metric | cc-cedict-flash | cc-cedict |
| :--- | :--- | :--- |
| **Download Size** | **~3.6 MB** | ~20.7 MB |
| **Entries** | ~124k (Same source) | ~124k |
| **Memory (RSS Delta)** | **~126 MB** | ~420 MB |
| **Heap Delta** | **~38 MB** | ~407 MB |

`cc-cedict-flash` uses a compressed Trie and packed data structures to achieve **~3.3x lower RSS** and **~11x lower Heap** usage while providing the same dictionary coverage.

To reproduce:
```bash
# From cc-cedict-flash/
npm run footprint
```

Outputs tarball size (download), dist size, and memory metrics (RSS/heap) before/after import and sample calls.
