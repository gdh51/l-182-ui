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

const _toString = Object.prototype.toString;

function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
}

export function setAttr (el, key, value) {

    // 传入对象形式的属性时
    if (isPlainObject(key)) {
        return Object.keys(key).forEach(attrKey => {
            el.setAttribute(attrKey, key[attrKey]);
        });
    }

    el.setAttribute(key, value);
}