import {
    isArray,
    isBoolean,
    isObject,
    isNull,
    isNumber,
    isString
} from '../type'
function encode(type, uniKey, value) {
    return `${uniKey}-${type}:${value}`
}
function isEncodeValue(stringifyValue, uniKey) {
    return isString(stringifyValue) && stringifyValue.startsWith(uniKey)
}

// JSON.Stringify中合法的值
function isNormalValue(val) {
    return (
        isBoolean(val) ||
        isString(val) ||
        isNumber(val) ||
        isNull(val) ||
        isArray(val) ||
        isObject(val)
    )
}

function decode(stringifyValue, uniKey) {
    const valueStart = stringifyValue.indexOf(':')
    const typeStart = stringifyValue.indexOf('-')
    return [
        stringifyValue.substr(valueStart + 1),
        stringifyValue.substring(typeStart + 1, valueStart)
    ]
}

export { encode, decode, isEncodeValue, isNormalValue }
