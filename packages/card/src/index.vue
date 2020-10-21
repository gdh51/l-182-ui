<script>
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
        const { staticClass } = data,
              originalClass = 'l-card'

        if (staticClass) {
            data.staticClass += ` ${originalClass}`
        } else {
            data.staticClass = originalClass
        }
        return h(tag, data, [ children ])
    }
}
</script>

<style lang="stylus">
@import '~@theme/card.styl'
</style>
