<template>
    <div
        class="progress_bar-container"
        :class="disabled ? 'disabled' : ''"
        :style="size"
        @click="changeProgress"
    >
        <div v-if="deputy" class="deputy-bar"></div>
        <div
            class="progress-bar"
            :class="disabled ? 'disabled' : ''"
            :style="progressBarStyle"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',

    props: {
        size: {
            type: Object,
            default() {
                return {
                    width: '70px',
                    height: '10px'
                }
            }
        },

        progress: {
            type: Number,
            default: 0
        },

        disabled: {
            type: Boolean,
            default: false
        },

        deputy: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            progressRect: {
                left: 0,
                width: 0
            }
        }
    },

    computed: {
        progressBarStyle() {
            return { width: this.progress + '%' }
        }
    },

    mounted() {
        this.initProgressInfo()
    },

    methods: {
        changeProgress(e) {
            if (this.disabled) return
            let progressRect = this.progressRect
            this.$emit(
                'click-progress',
                (e.clientX - progressRect.left) / progressRect.width
            )
        },

        initProgressInfo() {
            this.progressRect = this.$el.getBoundingClientRect()
        }
    }
}
</script>

<style lang="stylus" scoped>
.progress_bar-container
    border-radius 5px
    background-color $lw1

    .progress-bar
        position relative
        height 100%
        border-radius 5px
        background-color $lg2

    >.disabled
        background-color $dgy1
</style>
