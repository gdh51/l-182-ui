<script>
import { generateLevel } from '../../util/util'

export default {
    name: 'Wrapper',

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
                staticClass: 'modal_wrapper',
                style: {
                    opacity: this.opacity
                },
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
            options.style = {
                zIndex: this.axis.axisZ
            }
        }

        return h(
            'transition',
            {
                attrs: {
                    duration: 300
                }
            },
            [ h('div', options) ]
        )
    },
    data() {
        return {
            visible: true,
            axis: {
                axisZ: 999
            }
        }
    },

    created() {

        // 普通的遮布，z-index属性由用户自己定义
        if (this.type === 'normal') return

        this.axis = generateLevel()

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
.modal_wrapper
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color #000
</style>
