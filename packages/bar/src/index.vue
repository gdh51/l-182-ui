<script>
import { inheritStaticAttr } from '@/utils/functional'
import { BAR_PROP_MAP } from '../../scrollbar/src/utils/const'

// 可用官网样式map
const TYPE_MAP = {
          candy: ' is-candy',
          eva: ' is-eva'
      },
      CANDY = 'candy',
      CANDY_SIZE = 0,
      DEFAULT_DIR = 'horizontal'

/**
 * @description 一个条组件，长度宽度自己定义
 */
export default {
    name: 'LBar',
    functional: true,
    render(
        h,
        {

            // 默认推荐厚度为10px，水平方向
            props: {
                type, dir, size = '10px'
            },
            children,
            data
        }
    ) {
        let clz = 'l-bar'
        const isCandy = type === CANDY
        dir = BAR_PROP_MAP[dir] ? dir : DEFAULT_DIR

        // 使用的厚度单位
        const thicknessUnit = BAR_PROP_MAP[dir].thicknessUnit

        // 提供使用者通过sytle/class重写的机会
        inheritStaticAttr(data, 'staticStyle', {
            [thicknessUnit]: isCandy ? CANDY_SIZE : size,
            'border-radius': size
        })

        if (TYPE_MAP[type]) clz += TYPE_MAP[type]

        inheritStaticAttr(data, 'staticClass', clz)

        return h('div', data, [ children ])
    }
}
</script>

<style lang="stylus">
@import '~@theme/bar.styl'
</style>
