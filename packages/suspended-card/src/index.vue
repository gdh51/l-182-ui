<script>
import LCard from '@pack/card'

export default {
    name: 'LSuspendedCard',
    components: { LCard },
    functional: true,
    render(h, { data, children }) {
        const { staticClass } = data,
              originalClass = 'l-suspended-card'

        if (staticClass) {
            data.staticClass += ` ${originalClass}`
        } else {
            data.staticClass = originalClass
        }

        return h('l-card', data, [ children ])
    }
}
</script>

<style lang="stylus">
@import '~@theme/suspended-card.styl'
</style>
