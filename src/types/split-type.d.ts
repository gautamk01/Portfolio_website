declare module 'split-type' {
    export default class SplitType {
        constructor(target: string | HTMLElement, options?: {
            lineClass?: string;
            wordClass?: string;
            charClass?: string;
            splitClass?: string;
            types?: 'lines' | 'words' | 'chars' | ('lines' | 'words' | 'chars')[];
            position?: 'absolute' | 'relative';
        });
        public words: HTMLElement[];
        public revert: () => void;
    }
}