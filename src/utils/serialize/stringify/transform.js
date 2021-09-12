import {
    isMap,
    isSet,
    isBigInt,
    isSymbol,
    isFunction,
    isAsyncFunction,
    isUndefined,
    toType
} from '../../type'
import { encode, isNormalValue } from '../composite'
import { stringify } from './index'

const KEY_FOR_SYMBOL = 'keyFor:'

function transformValue(val, uniKey, depth) {
    switch (true) {
        case isMap(val):
        case isSet(val):
            return transformIterableObject(val, uniKey, depth)
        case isSymbol(val):
            return transformSymbol(val, uniKey)
        case isBigInt(val):
        case isFunction(val):
        case isAsyncFunction(val):
        case isUndefined(val):
            return transformCanStringifyValue(val, uniKey)
        default:
            throw Error(`Can't stringify ${toType(val)}`)
    }
}

function transformIterableObject(val, uniKey, depth) {
    const isSetValue = isSet(val)
    const type = toType(val)
    let result = ''

    // 递归调用原函数处理内部值
    val.forEach((value, key) => {
        let stringifyValue = stringify(value, uniKey, depth + 1)

        // 防止嵌套叠加双引号
        // 防止嵌套中具有对象，此时对象返回时，键名会双层下划线
        // 记录深度，类型，防止同一深度被错误解析
        if (!isNormalValue(value))
            stringifyValue = clearSlash(stringifyValue.slice(1, -1))
        result += `${
            isSetValue ? '' : key + ':'
        }${stringifyValue}${uniKey}${type}${depth},`
    })
    return encode(
        toType(val),
        uniKey,
        result.slice(0, -1 - type.length - uniKey.length - String(depth).length)
    )
}

function transformSymbol(val, uniKey) {
    // 优先从Symbol.for中查找
    const registeredKey = Symbol.keyFor(val)

    // 没有，退回到直接提取description
    return encode(
        toType(val),
        uniKey,
        registeredKey ? `${KEY_FOR_SYMBOL}${registeredKey}` : val.description
    )
}

function transformCanStringifyValue(val, uniKey) {
    return encode(toType(val), uniKey, String(val))
}

function clearSlash(v) {
    return v.replaceAll(`\\\"`, '"')
}

export { transformValue, isNormalValue, KEY_FOR_SYMBOL }
