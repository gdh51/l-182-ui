<template>
    <div class="mask_type_one">
        <div class="mask-box_top">
            {{ title }}
        </div>
        <div class="mask-box_bottom">
            {{ text }}
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.mask_type_one
    border 2px solid #1b1b1b
    border-radius 3px

    .mask-box_top
        width 100%
        padding .4vw 0
        font-size 3vw
        font-weight 200
        color #e3e3e1
        background-color #1b1b1b

    .mask-box_bottom
        padding 2vw 4vw
        font-size 6vw
        font-weight 700
        color #1b1b1b
</style>

<script>
export default {
    name: 'TypeOne',
    props: {
        title: {
            type: String,
            default: 'Authør'
        },

        text: {
            type: String,
            default: 'Lazybønes'
        }
    }
}
</script>