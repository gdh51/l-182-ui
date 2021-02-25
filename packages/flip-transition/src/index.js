import { addClass, removeClass } from '@/utils/class-utils'
export let transitionEndEvent = 'transitionend'

export default {
    name: 'LFlipTransition',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        name: {
            type: String,
            default: 'l'
        }
    },
    render(h) {
        const { tag } = this

        return h(tag, { class: this.transitionClass }, this.$slots.default)
    },
    mounted() {
        this.pos = this.$el.getBoundingClientRect()
    },
    updated() {
        const el = this.$el,
            cb = e => {
                if (e && e.target !== el) {
                    return
                }
                if (!e || /transform$/.test(e.propertyName)) {
                    el.removeEventListener(transitionEndEvent, cb)
                    this.restoreTransitionClass(false)
                }
            },
            isSamePos = this.applyTransition(false)

        if (isSamePos) return

        // 强制浏览器reflow一次，好执行动画
        document.body.offsetHeight

        this.restoreTransitionClass(true)
        this.applyTransition(true)

        el.addEventListener(transitionEndEvent, cb)
    },

    methods: {
        // 还原或应用过渡效果
        applyTransition(positive) {
            const s = this.$el.style

            // 正向的动画过渡
            if (positive) {
                s.transform = s.transitionDuration = ''

                // 逆向将元素还原到变动前位置
            } else {
                const newPos = this.$el.getBoundingClientRect(),
                    oldPos = this.pos,
                    dx = oldPos.left - newPos.left,
                    dy = oldPos.top - newPos.top

                if (dx || dy) {
                    s.transform = `translate(${dx}px,${dy}px)`
                    s.transitionDuration = `0s`
                } else {
                    return true
                }

                this.pos = newPos
            }
        },
        restoreTransitionClass(add) {
            const { name, $el } = this,
                moveClz = `${name}-move`

            if (add) {
                addClass($el, moveClz)
            } else {
                removeClass($el, moveClz)
            }
        }
    }
}
