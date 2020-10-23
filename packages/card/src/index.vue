<script>
import { inheritStaticAttr } from '@/utils/functional'

const suspendedClz = ' is-suspended'

export default {
    name: 'LCard',
    functional: true,
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        suspended: {
            type: Boolean,
            default: false
        }
    },
    render(h, {
        props: { tag, suspended }, children, data
    }) {
        let basicClass = 'l-card'
        if (suspended) basicClass += suspendedClz
        return h(tag, inheritStaticAttr(data, 'staticClass', basicClass), [ children ])
    }
}
</script>

<style lang="stylus">
@import '~@theme/card.styl'
</style>
