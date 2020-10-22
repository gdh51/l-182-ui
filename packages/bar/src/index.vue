<script>
import { inheritStaticAttr } from '@/utils/functional'
import { BAR_PROP_MAP } from '../../scrollbar/src/utils/const'

const CANDY = 'candy',
      CANDY_SIZE = 0,
      DEFAULT_DIR = 'horizontal'

/**
 * @description 一个条组件，长度宽度自己定义
 */
export default {
    name: 'LBar',
    functional: true,
    render(h, {

        // 默认推荐厚度为10px，水平方向
        props: {
            type, dir, size = '10px'
        }, children, data
    }) {
        let clz = 'l-bar'
        const isCandy = (type === CANDY)
        dir = BAR_PROP_MAP[dir] ? dir : DEFAULT_DIR

        // 使用的厚度单位
        const sizeUnit = BAR_PROP_MAP[dir].sizeUnit

        // 提供使用者通过sytle/class重写的机会
        inheritStaticAttr(data, 'staticStyle', {
            [sizeUnit]: isCandy ? CANDY_SIZE : size,
            'border-radius': size
        })

        if (isCandy) clz += (' is-' + CANDY)

        inheritStaticAttr(data, 'staticClass', clz)

        return h('div', data, [ children ])
    }
}
</script>

<style lang="stylus">
@import '~@theme/bar.styl'
</style>
