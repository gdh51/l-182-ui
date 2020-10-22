const STATIC_CLASS = 'staticClass'

/**
 * @description 函数式组件继承静态属性，提供使用者重写的机会
 * @param {Object} data 继承属性的VNode的data
 * @param {String} attrStr 需要重写的字段
 * @param {String} rewrite 需要额外重写添加的值
 */
function inheritStaticAttr(data, attrStr, rewrite) {
    if (attrStr === STATIC_CLASS) {
        if (data[attrStr]) {
            data[attrStr] = `${rewrite} ${data[attrStr]}`
        } else {
            data[attrStr] = rewrite
        }

        return data
    }

    // 如果有原有属性，则保留不重写
    Object.assign(rewrite, data[attrStr])
    Object.assign(data[attrStr], rewrite)

    return data
}

export { inheritStaticAttr }
