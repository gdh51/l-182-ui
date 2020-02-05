export function isUndefined(val) {
    return val === void 0;
}

// markdown语法一定要以\n 结尾
export function reviseEndNewline(str) {
    if (str.lastIndexOf('\n') === str.length - 1) {
        return str;
    } else {
        return str += '\n';
    }
}