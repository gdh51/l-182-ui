<script>
export default {
    name: 'LMenuItem',
    render(h) {

        return h(
            'div',
            {
                class: [ this.hoverWithoutBorder ? 'no-border' : '', 'l-menu-item' ],
                on: { click: this.menuClickHandler }
            },
            [ this.$slots.default ]
        )
    },
    props: {
        hoverWithoutBorder: {
            type: Boolean,
            default: false
        },
        path: {
            type: String,
            required: true
        }
    },
    methods: {
        menuClickHandler() {
            this.$parent.$emit('menu-click', this.path)
        }
    }
}
</script>

<style lang="stylus">
@import '~@theme/menu-item.styl'
</style>
