<template>
    <l-mask class="l-modal__container">
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
                        <l-button>{{cancel}}</l-button>
                        <l-button>{{confirm}}</l-button>
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

export default {
    name: 'LModal',
    components: { LMask, LIcon },

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
        }
    },

    computed: {
        modalSizeClz() {
            return 'l-modal_' + this.size
        }
    },

    methods: {}
}
</script>

<style lang="stylus">
@import '~@theme/modal'
</style>
