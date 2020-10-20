<script>
export default {
    name: 'LCard',
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    render(h) {
        return h(this.tag, { staticClass: 'l-card' }, [this.$slots.default])
    }
}
</script>

<style lang="stylus">
@import '~@theme/card.styl'
</style>
