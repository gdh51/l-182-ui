const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn(obj, property) {
    return hasOwnProperty.call(obj, property)
}

// 查询当前值所属Class
function toType(val) {
    /* eslint-disable-next-line */
    return Object.prototype.toString.call(val).slice(8, -1)
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
    hasOwn
}
