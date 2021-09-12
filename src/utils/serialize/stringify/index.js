import { isNormalValue } from '../composite'
import { transformValue } from './transform'

/**
 * @description
 * @param {String} val 要进行反序列化的字符串
 * @param {String} uniKey 当前进行反序列化字符串的原标识符
 * @param {*} depth 内部维护参数，待转化为其他表达方式
 * @returns {any}  解析的返回值
 */
function stringify(val, uniKey = '#lazy', depth = 0) {
    return JSON.stringify(val, (key, value) => {
        // JSON可以解析的值
        if (isNormalValue(value)) return value

        return transformValue(value, uniKey, depth)
    })
}

export { stringify }
