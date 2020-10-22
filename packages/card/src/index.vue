<script>
import { inheritStaticAttr } from '@/utils/functional'

export default {
    name: 'LCard',
    functional: true,
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    render(h, {
        props: { tag }, children, data
    }) {

        return h(tag, inheritStaticAttr(data, 'staticClass', 'l-card'), [ children ])
    }
}
</script>

<style lang="stylus">
@import '~@theme/card.styl'
</style>
