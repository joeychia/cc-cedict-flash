export interface EnglishResult {
    zh: string;
    pinyin: string;
    en: string[];
}
export interface PinyinEnOptions {
    toneType?: 'symbol' | 'none' | 'num';
}
export interface CedictData {
    pinyins: string[];
    pinyinIndices: Uint16Array;
    defLengths: Uint16Array;
    definitions: string;
    trieChars: Uint16Array;
    trieValues: Uint32Array;
    trieChildIndices: Uint32Array;
    trieChildCounts: Uint16Array;
}
export declare function createCedictFlash(data: CedictData): {
    pinyinEn: (text: string, options?: PinyinEnOptions) => EnglishResult[];
};
