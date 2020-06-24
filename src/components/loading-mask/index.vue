<style lang="stylus" scoped>
.mask-container
    height 100vh
    width 100vw
    background-color #e3e3e1
    text-align center
    user-select none

    .mask-box_middle
        display inline-block
        vertical-align middle

    &::after
        display inline-block
        content ''
        height 100%
        vertical-align middle
</style>


<script>
import TypeOne from './type-one/index'
import TypeTwo from './type-two/index'
const TYPE_MAP = ['one', 'two'];

export default {
    name: 'LoadingMask',

    components: {
        TypeOne,
        TypeTwo
    },

    props: {
        type: {
            type: Number,
            default: 0
        }
    },

    render (h) {
        return h('div', {
            staticClass: 'mask-container'
        }, [h('type-' + (TYPE_MAP[this.type] || 'one'), {
            staticClass: 'mask-box_middle',
            scopedSlots: {
                title: () => this.$slots.title,
                content: () => this.$slots.content
            }
        })])
    }
}
</script>