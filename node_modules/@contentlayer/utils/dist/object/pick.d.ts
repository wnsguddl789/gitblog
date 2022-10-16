declare type ConvertUndefined<T> = OrUndefined<{
    [K in keyof T as undefined extends T[K] ? K : never]-?: T[K];
}>;
declare type OrUndefined<T> = {
    [K in keyof T]: T[K] | undefined;
};
declare type PickRequired<T> = {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
declare type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>;
export declare const pick: <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]) => ConvertPick<{ [K in Keys]: Obj[K]; }>;
export {};
//# sourceMappingURL=pick.d.ts.map