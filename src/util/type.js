function toType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
}

export function isFunction(val) {
    return toType(val) === 'Function';
}