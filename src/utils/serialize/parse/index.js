import { isEncodeValue } from '../composite'
import { restoreStringifyValue } from './restore'

/**
 * @description 解析除Weak类型值外任何值为JSON
 * @param {any} val 要解析的值
 * @param {String} uniKey 序列化特殊值时加入的标识符，可以自定义
 * @param {Number} depth 内部维护参数，待转化为其他表达方式
 * @returns {String} 序列化后的字符串
 */
function parse(val, uniKey = '#lazy', depth = 0) {
    if (isEncodeValue(val, uniKey))
        return restoreStringifyValue(val, uniKey, depth)

    // 未被encode的值会在传入时已被解析,
    // 即一个被序列化后的数字2，在该位置已为数字2
    // if (isEncodeValue(val, uniKey))
    //     return restoreStringifyValue(val, uniKey)
    return JSON.parse(val, (_, value) => {
        // 未被encode的值会在传入时已被解析,
        // 即一个被序列化后的数字2，在该位置已为数字2
        if (isEncodeValue(value, uniKey))
            return restoreStringifyValue(value, uniKey, depth)
        return value
    })
}

export { parse }
