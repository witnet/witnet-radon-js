import { TypeSystem, OutputType, OperatorInfos, CacheItem, CacheRef } from './types';
export declare const typeSystem: TypeSystem;
export declare const operatorInfos: OperatorInfos;
export declare class Cache {
    private counter;
    private cache;
    constructor();
    getLastIndex(): number;
    get(cacheId: number): CacheItem;
    insert(item: CacheItem): CacheRef;
    set(id: number, item: CacheItem): void;
}
export declare const primitiveMarkupOptions: {
    array: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayBoolean: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayArray: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayBytes: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayFloat: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayInteger: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayMap: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    arrayString: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    boolean: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    bytes: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    filterOutput: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    float: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    matchOutput: null;
    reducerOutput: null;
    string: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    subscriptOutput: null;
    map: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
    integer: {
        hierarchicalType: string;
        label: string;
        markupType: string;
        outputType: OutputType;
    }[];
};
export declare const aTFilterMarkupOptions: {
    hierarchicalType: string;
    label: string;
    markupType: string;
    outputType: OutputType;
}[];
export declare const aTReducerMarkupOptions: {
    hierarchicalType: string;
    label: string;
    markupType: string;
    outputType: OutputType;
}[];
export declare const allMarkupOptions: {
    hierarchicalType: string;
    label: string;
    markupType: string;
    outputType: OutputType;
}[];
export declare const markupOptions: {
    [key: string]: Array<any>;
};
//# sourceMappingURL=structures.d.ts.map