declare module 'split-type' {
    export default class SplitType {
        constructor(target: string | HTMLElement, options?: any);
        public words: HTMLElement[];
        public revert: () => void;
    }
}