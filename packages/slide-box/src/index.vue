<script>
import LBox from '@pack/box'
import { hyphenate } from '@/utils/hyphenate'
import { Direction, DirToShape } from '@/utils/is-slide/constants'
import { initSlideHelper } from '@/utils/is-slide'

const LBoxPanel = 'l-slide-plane'

export default {
    name: 'LSlideBox',
    components: { LBox },

    props: {
        width: { default: '100%', type: String },

        height: { default: '100%', type: String },
        direction: {
            default: 'horizontal',
            type: String,
            validator(val) {
                return Direction[val]
            }
        }
    },

    data() {
        return {
            viewSize: {},
            planesNum: 0,
            slider: null
        }
    },

    render(h) {
        // 过滤非l-box-plane元素
        const LSlidePanels = (this.$slots.default || []).filter(node => {
            const { componentOptions, data } = node,
                { tag } = componentOptions || {},
                isPanel = tag && hyphenate(tag) === LBoxPanel

            if (!isPanel) return false

            // 继承slide-box上的样式，优先保留子组件上样式
            if (data) {
                data.style = Object.assign(this.sharedStyle, data.style || {})
            } else {
                node.data = { style: this.sharedStyle }
            }
            return true
        })
        this.planesNum = LSlidePanels.length

        return h(
            'div',
            {
                style: this.sharedStyle,
                ref: 'view',
                staticClass: 'l-slide-box'
            },
            LSlidePanels
        )
    },

    mounted() {
        const { view } = this.$refs,
            { width, height } = view.getBoundingClientRect()

        this.viewSize = { width, height }

        this.slider = initSlideHelper({
            ...this.sliderOptions,
            el: this.$el
        })

        // 监听options变化重新绑定事件监听器
        this.$on(
            'hook:destroy',
            this.$watch('sliderOptions', 'restoreListerner', { deep: true })
        )
    },

    computed: {
        sharedStyle() {
            return {
                width: this.width,
                height: this.height
            }
        },

        sliderOptions() {
            return {
                offset: this.viewSize[DirToShape[this.direction]],
                size: this.planesNum,
                direction: this.direction
            }
        }
    },

    methods: {
        restoreListerner(options) {
            const { restore } = this.slider

            restore({ ...options, el: this.$el })
        }
    }
}
</script>

<style lang="stylus">
.l-slide-box
    overflow scroll
    background-color aqua
</style>
