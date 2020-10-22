<script>
import LCard from '@pack/card'
import { inheritStaticAttr } from '@/utils/functional'

export default {
    name: 'LSuspendedCard',
    components: { LCard },
    functional: true,
    render(h, { data, children }) {
        return h('l-card', inheritStaticAttr(data, 'staticClass', 'l-suspended-card'), [
            children
        ])
    }
}
</script>

<style lang="stylus">
@import '~@theme/suspended-card.styl'
</style>
