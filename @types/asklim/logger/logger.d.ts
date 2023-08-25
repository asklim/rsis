type TArgs = any[];
export default function logger(ticker?: string): {
    debug: (...args: TArgs) => void;
    info: (...args: TArgs) => void;
    warn: (...args: TArgs) => void;
    error: (...args: TArgs) => void;
};
export {};
//# sourceMappingURL=logger.d.ts.map