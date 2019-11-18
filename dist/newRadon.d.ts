interface State<T> {
    counter: number;
    cache: {
        [key: number]: T;
    };
}
declare function getLastIndex<T>(state: State<T>): {
    getLastIndex: () => number;
};
declare function get<T>(state: State<T>): {
    get: (cacheId: number) => T;
};
declare function insert<T>(state: State<T>): {
    insert: (item: T) => {
        id: number;
    };
};
declare function set<T>(state: State<T>): {
    set: (id: number, item: T) => {
        [x: number]: T;
    };
};
declare const cache: () => Readonly<{
    set: (id: number, item: string) => {
        [x: number]: string;
    };
    insert: (item: string) => {
        id: number;
    };
    getLastIndex: () => number;
    get: (cacheId: number) => string;
}>;
//# sourceMappingURL=newRadon.d.ts.map