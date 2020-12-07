const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn(obj, property) {
    return hasOwnProperty.call(obj, property)
}

// 查询当前值所属Class
function toType(val) {
    /* eslint-disable-next-line */
    return Object.prototype.toString.call(val).slice(8, -1)
}

function isObject(val) {
    return toType(val) === 'Object'
}

function isFunction(val) {
    return toType(val) === 'Function'
}

function isNumber(val) {
    return toType(val) === 'Number'
}

function isString(val) {
    return toType(val) === 'String'
}

function isArray(val) {
    return toType(val) === 'Array'
}

function isUndefined(val) {
    return toType(val) === 'Undefined'
}

function isPromise(val) {
    return isObject(val) && isFunction(val.then)
}

// 检查是否为Vnode
function isVNode(node) {
    return (
        node !== null &&
        typeof node === 'object' &&
        hasOwn(node, 'componentOptions')
    )
}

export {
    isFunction,
    isArray,
    isString,
    isNumber,
    isVNode,
    isObject,
    isUndefined,
    isPromise,
    hasOwn
}
