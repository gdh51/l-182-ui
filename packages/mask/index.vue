<script>
import { zGenerate } from '@/utils/axis-z'

export default {
    name: 'LMask',

    props: {
        type: {
            type: String,
            default: 'auto'
        },

        visibility: {
            type: Boolean,
            default: true
        },

        opacity: {
            type: Number,
            default: 0.4
        }
    },

    render(h) {
        let {
                bind, unbind, update
            } = this.$options.directives.show,

            options = {
                staticClass: 'l-mask',
                style: { opacity: this.opacity },
                directives: [
                    {
                        name: 'show',
                        value: this.visibility && this.visible,
                        bind,
                        unbind,
                        update
                    }
                ]
            }

        if (this.type !== 'normal') {
            options.style = { zIndex: this.axisInterface.axisZ }
        }

        return h(
            'transition',
            { attrs: { duration: 300 } },
            [ h('div', options) ]
        )
    },
    data() {
        return {
            visible: true,
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
            this.visible = false
            this.$nextTick(() => {
                this.$destroy()
            })
        }
    },

    destroyed() {
        if (this.type === 'normal') return

        this.axis.destroy()
    }
}
</script>

<style lang="stylus" scoped>
.l-mask
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color #000
</style>
