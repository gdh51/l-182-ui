import {
    TYPE_ASYNC_FUNCTION,
    TYPE_BIGINT,
    TYPE_FUNCTION,
    TYPE_MAP,
    TYPE_SET,
    TYPE_SYMBOL,
    TYPE_UNDEFINED
} from '../../type'
import { decode } from '../composite'
import { KEY_FOR_SYMBOL } from '../stringify/transform'
import { parse } from './index'

// 还原编码字符串为原值
function restoreStringifyValue(compositeStringifyValue, uniKey, depth) {
    // 获取纯洁的序列化值与当前值的类型
    const [pureStringifyValue, type] = decode(compositeStringifyValue, uniKey)

    switch (type) {
        case TYPE_MAP:
        case TYPE_SET:
            return restoreIterableObject(
                pureStringifyValue,
                type,
                uniKey,
                depth
            )
        case TYPE_BIGINT:
        case TYPE_UNDEFINED:
        case TYPE_FUNCTION:
        case TYPE_ASYNC_FUNCTION:
            return restoreCanStringifyValue(pureStringifyValue, type)
        case TYPE_SYMBOL:
            return restoreSymbol(pureStringifyValue)
        default:
            return compositeStringifyValue

        // throw Error(`Can't parse ${pureStringifyValue}`)
    }
}

function restoreIterableObject(stringifyValue, type, uniKey, depth) {
    const isSet = type === TYPE_SET

    const elements = stringifyValue
        ? stringifyValue.split(`${uniKey}${type}${depth},`).map(element => {
              if (isSet) {
                  return parse(element, uniKey, depth + 1)
              }
              const valueStart = element.indexOf(':')

              return [
                  element.substring(0, valueStart),
                  parse(element.substr(valueStart + 1), uniKey, depth + 1)
              ]
          })
        : []

    return isSet ? new Set(elements) : new Map(elements)
}

// 匹配普通函数(不匹配箭头函数)
// 箭头函数在这会被错误的匹配
const FUNCTION_MAIN_RE = /(?:(async) +)?(function(?: +))?([^ (]*)(?: *)\(([^)]*)\)\s*{?(.*)(?:})/
function restoreCanStringifyValue(stringifyValue, type) {
    const isFunction = type === TYPE_FUNCTION || type === TYPE_ASYNC_FUNCTION
    const isBigInt = type === TYPE_BIGINT

    if (isFunction) {
        const [
            all,
            isAsync,
            withFunction,
            name,
            args,
            body
        ] = stringifyValue.match(FUNCTION_MAIN_RE)

        // 处理对象方法的特殊形式
        if (!withFunction) stringifyValue = `function ${stringifyValue}`
    }

    return isFunction
        ? new Function(`return ${stringifyValue}`)()
        : isBigInt
        ? BigInt(stringifyValue)
        : void 0
}
function restoreSymbol(stringifyValue) {
    const keyForIndex = stringifyValue.indexOf(KEY_FOR_SYMBOL)
    const isKeyFor = keyForIndex > -1
    const symbolDescription = stringifyValue.slice(
        isKeyFor ? keyForIndex + KEY_FOR_SYMBOL.length : 0
    )

    return isKeyFor ? Symbol.for(symbolDescription) : Symbol(symbolDescription)
}

export { restoreStringifyValue }
