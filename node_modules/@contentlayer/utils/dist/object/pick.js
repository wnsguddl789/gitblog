export const pick = (obj, keys) => {
    return keys.reduce((acc, key) => {
        const val = obj[key];
        if (val !== undefined) {
            acc[key] = val;
        }
        return acc;
    }, {});
};
//# sourceMappingURL=pick.js.map