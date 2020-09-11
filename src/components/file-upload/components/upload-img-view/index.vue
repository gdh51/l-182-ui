<template v-if="unComplete">
    <div :style="viewStyle" class="view-container">
        <progress-bar v-bind="progressOptions" class="view-progress" />
        <button
            @click="$emit('cancel')"
            class="view-btn"
            :style="buttonStyle"
        >取消</button>
    </div>
</template>

<script>
const D_REG = /^(\d+)([a-z]*)$/

import { extend } from '../../util/index'

export default {
    name: 'UploadImgView',
    props: {
        size: {
            type: Object,
            default() {
                return {
                    width: '100px',
                    height: '40px'
                }
            }
        },

        progress: {
            type: Number,
            default: 0
        },

        url: {
            type: String,
            required: true
        }
    },

    data() {
        return {}
    },

    computed: {
        unComplete() {
            return this.progress <= 100
        },

        viewStyle() {
            let style = extend({}, this.size)
            style.background = `url(${this.url})`
            return style
        },

        buttonStyle() {
            return {
                height: this.progressOptions.size.height
            }
        },

        progressOptions() {
            let size = this.size,
                heightMatch = size.height.match(D_REG)
            return {
                size: {
                    width: this.size.width,
                    height: heightMatch[1] / 4 + heightMatch[2],
                    progress: this.progress
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.view-container
    position relative

    .view-progress
        position absolute
        bottom 0
        left 0

        &:hover + .view-btn
            display block

    .view-btn
        position absolute
        right 0
        bottom 0
        left 0
        display none
        margin 0 auto
        opacity .7
</style>

