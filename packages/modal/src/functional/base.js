import Vue from 'vue'
import LModal from '../index'
import { resolveSlot } from './slot-resolve'
import { isObject } from '@/utils/type'
import { beforeCloseWrapper } from './event'

const DEFAULT_OPTIONS = {
        title: '我是标题',
        closeByMask: true,
        once: true,
        header: undefined,
        footer: undefined,
        confirm: '确定',
        cancel: '取消',
        size: 'small',
        content: '我是内容',
        confirmCb: () => {},
        cancelCb: () => {},
        buttonReverse: false
    },
    SLOTS_NAMES = ['header', 'content', 'footer']

Object.freeze(DEFAULT_OPTIONS)

export class Modal {
    constructor(options = {}) {
        this._init(options)
    }

    _init(options) {
        this._initOptions(options)
        this._initState()
        this._initEvent()
        this._initInstance()
        this._initSlot()
    }

    _initOptions(options) {
        this.$options = Object.freeze(options)
        this.options = Object.assign({}, DEFAULT_OPTIONS, options)

        // 当content使用组件时，传入组件的属性
        this.options.props = Object.assign({}, this.options.props || {})
    }

    _initState() {
        this.state = {
            /* visible */
        }

        this.slots = {
            footer: undefined,
            content: null,
            header: undefined
        }

        SLOTS_NAMES.forEach(slotName => {
            // content插槽允许使用字符串，使用时不将其作为插槽
            if (isObject(this.options[slotName])) {
                this.slots[slotName] = this.options[slotName]
                delete this.options[slotName]
            }
        })

        this.props = { ...this.options.props }

        // modal实例
        this.instance = null

        // 如果content使用组件，使用组件时的实例
        this.slotInstances = {
            header: null,
            content: null,
            footer: null
        }
        this._resolve = null
        this._reject = null

        // 一个表示当前modal状态的Promise对象
        this.pending = new Promise((resolve, reject) => {
            this._resolve = resolve
            this._reject = reject
        })
            .then(p => {
                this.hide()
                return p
            })
            .catch(() => {})

        this.$el = document.createElement('div')
    }

    _initEvent() {
        let { confirmCb, cancelCb } = this.options
        this.options.confirmCb = beforeCloseWrapper(confirmCb, 'confirm', this)

        this.options.cancelCb = beforeCloseWrapper(cancelCb, 'cancel', this)
    }

    _initInstance() {
        const ModalConstructor = Vue.extend(LModal),
            modal = this

        document.body.append(this.$el)
        this.instance = new ModalConstructor({
            el: this.$el,
            propsData: this.options,
            created() {
                this.$on('cancel', modal.options.cancelCb)
                this.$on('confirm', modal.options.confirmCb)
                modal.options.closeByMask &&
                    this.$on('mask-click', modal.options.cancelCb)
            },

            updated() {
                const slotInstancess = this.$children[0].$children,
                    { footer, confirm, cancel } = modal.options

                // eslint-disable-next-line
                let handledSlotCount = 0

                if (!footer) {
                    confirm && handledSlotCount++
                    cancel && handledSlotCount++
                }

                SLOTS_NAMES.forEach(slotName => {
                    if (modal.slots[slotName]) {
                        modal.slotInstances[slotName] =
                            slotInstancess[handledSlotCount]
                        handledSlotCount++
                    }
                })
            }
        })

        // 代理modal visible
        Object.defineProperty(this.state, 'visible', {
            get: () => this.instance.visible,
            set: val => {
                this.instance.visible = val
            }
        })
    }

    // 处理插槽内容，将其转化为VNode存储slots属性对应的命名空间中
    _initSlot() {
        const slots = this.slots

        // footer和header仅支持false与VNode或组件
        SLOTS_NAMES.forEach(slotName => {
            const slotContent = this.slots[slotName]

            if (slotContent) {
                // 组件插槽在使用props时，优先会使用具有命名的props
                // 未定义命名插槽时， 会直接传入当前已有的插槽
                const props = this.options.props[slotName] || this.options.props

                resolveSlot({
                    slotContent,
                    slotName,
                    slotsState: slots,
                    props,
                    h: this.instance.$createElement
                })

                this.instance.$slots[
                    slotName === 'content' ? 'default' : slotName
                ] = slots[slotName]
            }
        })
    }

    show() {
        this.state.visible = true
        return this
    }

    // 使用实例的方法，该方法会合适的时候自主的销毁实例
    hide() {
        this.instance.hide()
        if (this.options.once) this.destroy()
        return this
    }

    destroy() {
        this.$el = null
    }
}
