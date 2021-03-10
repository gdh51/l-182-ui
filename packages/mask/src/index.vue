<script>
import { zGenerate } from '@/utils/axis-z'

export default {
    name: 'LMask',

    props: {
        visible: {
            type: Boolean,
            default: true
        },

        // 遮罩的透明度
        opacity: {
            type: Number,
            default: 0.4
        },
        type: String
    },

    render(h) {

        // 使用内部的v-show指令
        const {
            bind, unbind, update
        } = this.$options.directives.show

        return h(
            'transition',
            { attrs: { duration: 300 }, props: { name: 'fade' } },
            [
                h(
                    'div',
                    {
                        staticClass: 'l-mask',
                        style: { zIndex: this.axisInterface.axisZ },
                        directives: [
                            {
                                name: 'show',
                                value: this.visible && this.priorityVisible,
                                bind,
                                unbind,
                                update
                            }
                        ]
                    },
                    [
                        h('div', {
                            staticClass: `${
                                this.type === 'eva' ? 'is-eva' : 'is-default'
                            } l-mask__bg`,
                            style: { opacity: this.opacity },
                            on: { click: () => this.$emit('click') }
                        }),
                        this.$slots.default
                    ]
                )
            ]
        )
    },
    data() {
        return {

            // 内部透明度具有最高优先级，可以控制是否显示
            priorityVisible: true,
            axisInterface: { axisZ: 999 }
        }
    },

    created() {

        // 普通的遮布，z-index属性由用户自己定义
        if (this.type === 'normal') return

        this.axisInterface = zGenerate()

        // 暴露销毁该遮布的接口
        this.$once('destroy', this._destroy)
    },

    methods: {
        _destroy() {
            this.priorityVisible = false
            this.$nextTick(() => {
                this.$destroy()
            })
        }
    },

    // Vue实例销毁后，清除当前axisZ的值
    destroyed() {
        this.axisInterface.destroy()
    }
}
</script>

<style lang="stylus">
@import '~@theme/mask'
</style>
