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

    .mask-box_wide
        width 80vw

    .mask-box-item_first
        text-align left

    .mask-box-item_last
        text-align right

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
        },

        textList: {
            type: Array,
            default: () => [{
                title: 'Authør',
                text: 'Lazybønes'
            }]
        }
    },

    render (h) {
        let isMultiple = this.textList.length > 1,
            type = 'type-' + (isMultiple ? 'two' : (TYPE_MAP[this.type] || 'one')),
            children;

        if (isMultiple) {

            // 为了排版美观仅保留三个
            let handleList = this.textList.slice(0, 3);
            children = h('div', {
                    staticClass: 'mask-box_middle mask-box_wide',
                },


                handleList.map((textObj, index) => h(type, {

                    // 为第一个和最后一个项目添加对齐
                    staticClass: index === 0
                        ? 'mask-box-item_first'
                        :(index === handleList.length - 1 ? 'mask-box-item_last' : ''),
                    props: {
                        title: textObj.title,
                        text: textObj.text
                    }
                }))

            );
        } else {
            children = h(type, {
                staticClass: 'mask-box_middle',
                props: {
                    title: (this.textList[0] || {}).title,
                    text: (this.textList[0] || {}).text
                }
            });
        }

        return h('div', {
            staticClass: 'mask-container'
        }, [children])
    }
}
</script>