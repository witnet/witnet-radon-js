import { TypeSystem, OperatorInfos, CacheRef } from './types';
export declare const typeSystem: TypeSystem;
export declare const operatorInfos: OperatorInfos;
export declare class Cache<T> {
    private cache;
    constructor();
    get(cacheId: number): T;
    set(item: T): CacheRef;
}
//# sourceMappingURL=structures.d.ts.map