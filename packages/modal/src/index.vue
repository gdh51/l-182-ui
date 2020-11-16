<template>
    <l-mask
        class="l-modal__container"
        @click.native="handleMaskClick"
        :visible="visible"
    >
        <l-card class="l-modal" :class="modalSizeClz">
            <div class="l-modal__header">
                <slot name="header">
                    <span class="l-modal__title">{{ title }}</span>
                    <l-icon icon="close" />
                </slot>
            </div>
            <div class="l-modal__content">
                <slot>{{ content }}</slot>
            </div>
            <div class="l-modal__footer">
                <slot name="footer">
                    <div class="l-modal__footer_default">
                        <l-button
                            v-if="cancel"
                            @click="handleBtnClick('cancel')"
                        >{{cancel}}</l-button>
                        <l-button
                            v-if="confirm"
                            @click="handleBtnClick('confirm')"
                        >{{confirm}}</l-button>
                    </div>
                </slot>
            </div>
        </l-card>
    </l-mask>
</template>

<script>

// import { config } from './utils'
// import { zGenerate } from '@/utils/axis-z'
import LMask from '@pack/mask'
import LIcon from '@pack/icon'
import LButton from '@pack/button'

export default {
    name: 'LModal',
    components: {
        LMask,
        LIcon,
        LButton
    },

    props: {
        title: {
            type: String,
            default: '标题'
        },

        type: {
            type: String,
            default: 'cancel'
        },

        content: {
            type: String,
            default: '该弹框暂时未有内容'
        },
        size: {
            type: String,
            validator(val) {
                return val === 'large' || val === 'small'
            },
            default: 'small'
        },
        confirm: {
            type: [ Boolean, String ],
            validator(val) {
                if (val === true) return new Error('It display by default.')
                return true
            },
            default: '确定'
        },
        cancel: {
            type: [ Boolean, String ],
            validator(val) {
                if (val === true) return new Error('It display by default.')
                return true
            },
            default: '取消'
        },

        closeByMask: {
            type: Boolean,
            default: true
        },

        once: {
            type: Boolean,
            default: true
        },
        beforeClose: Function
    },

    data() {
        return { visible: true }
    },

    computed: {
        modalSizeClz() {
            return 'l-modal_' + this.size
        }
    },

    methods: {

        // 如果传入beforeClose，则将关闭行为转交给用户
        closePreCheck(type) {
            if (this.beforeClose) {
                this.beforeClose(type, this, this.hide.bind(this))
                return true
            }
            return false
        },
        handleMaskClick() {
            if (!this.handleMaskClick) return
            !this.closePreCheck() && this.hide()
        },

        handleBtnClick(type) {

            // 传入beforeClose时
            if (!this.closePreCheck(type)) {
                this.hide()
            }

            // 其他情况放出对应事件后关闭
            this.$emit(type, this)
            this.hide()
        },

        hide() {
            this.visible = false

            // 销毁实例，不可复用
            if (this.once) this.$nextTick(() => this.$destroy())
        }
    },

    destroyed() {
        this.$el.remove()
    }
}
</script>

<style lang="stylus">
@import '~@theme/modal'
</style>
