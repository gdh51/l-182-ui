const hasOwnProperty = Object.prototype.hasOwnProperty
const TYPE_OBJECT = 'Object'
const TYPE_ARRAY = 'Array'
const TYPE_MAP = 'Map'
const TYPE_SET = 'Set'
const TYPE_BIGINT = 'BigInt'
const TYPE_SYMBOL = 'Symbol'
const TYPE_STRING = 'String'
const TYPE_BOOLEAN = 'Boolean'
const TYPE_NUMBER = 'Number'
const TYPE_NULL = 'Null'
const TYPE_UNDEFINED = 'Undefined'
const TYPE_FUNCTION = 'Function'
const TYPE_ASYNC_FUNCTION = 'AsyncFunction'
function hasOwn(obj, property) {
    return hasOwnProperty.call(obj, property)
}

// 查询当前值所属Class
function toType(val) {
    // eslint-disable-next-line
    return Object.prototype.toString.call(val).slice(8, -1)
}
function isObject(v) {
    return toType(v) === TYPE_OBJECT
}
function isMap(v) {
    return toType(v) === TYPE_MAP
}
function isArray(v) {
    return toType(v) === TYPE_ARRAY
}
function isNumber(v) {
    return toType(v) === TYPE_NUMBER
}

function isBoolean(v) {
    return toType(v) === TYPE_BOOLEAN
}

function isString(v) {
    return toType(v) === TYPE_STRING
}

function isNull(v) {
    return toType(v) === TYPE_NULL
}

function isUndefined(v) {
    return toType(v) === TYPE_UNDEFINED
}

function isBigInt(v) {
    return toType(v) === TYPE_BIGINT
}

function isSet(v) {
    return toType(v) === TYPE_SET
}
function isSymbol(v) {
    return toType(v) === TYPE_SYMBOL
}
function isFunction(v) {
    return toType(v) === TYPE_FUNCTION
}

function isAsyncFunction(v) {
    return toType(v) === TYPE_ASYNC_FUNCTION
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
    TYPE_ASYNC_FUNCTION,
    TYPE_FUNCTION,
    TYPE_BIGINT,
    TYPE_MAP,
    TYPE_SET,
    TYPE_SYMBOL,
    TYPE_UNDEFINED,
    isFunction,
    isArray,
    isString,
    isNumber,
    isSymbol,
    isBoolean,
    isAsyncFunction,
    isObject,
    isSet,
    isMap,
    isUndefined,
    isNull,
    isBigInt,
    isVNode,
    hasOwn
}
