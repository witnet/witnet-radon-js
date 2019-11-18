interface CacheState<T> {
    counter: number;
    cache: {
        [key: number]: T;
    };
}
declare function getLastIndex<T>(state: CacheState<T>): {
    getLastIndex: () => number;
};
declare function get<T>(state: CacheState<T>): {
    get: (cacheId: number) => T;
};
declare function insert<T>(state: CacheState<T>): {
    insert: (item: T) => {
        id: number;
    };
};
declare function set<T>(state: CacheState<T>): {
    set: (id: number, item: T) => {
        [x: number]: T;
    };
};
declare const Cache: () => Readonly<{
    set: (id: number, item: string) => {
        [x: number]: string;
    };
    insert: (item: string) => {
        id: number;
    };
    getLastIndex: () => number;
    get: (cacheId: number) => string;
}>;
//# sourceMappingURL=Cache.d.ts.map