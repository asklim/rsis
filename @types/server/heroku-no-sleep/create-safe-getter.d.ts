declare function _exports(apiUrl: any, getter?: (apiUrl: any) => Promise<import("axios").AxiosResponse<any, any>>, logger?: {
    trace: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}): Function;
export = _exports;
