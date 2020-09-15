<template>
    <div class="mask_type_one">
        <div class="mask-box_top">{{ title }}</div>
        <div class="mask-box_bottom">{{ text }}</div>
    </div>
</template>

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

<style lang="stylus" scoped>
.mask_type_one
    border 2px solid #1b1b1b
    border-radius 3px

    .mask-box_top
        padding .4vw 0
        width 100%
        background-color #1b1b1b
        color #e3e3e1
        font-weight 200
        font-size 3vw

    .mask-box_bottom
        padding 2vw 4vw
        color #1b1b1b
        font-weight 700
        font-size 6vw
</style>
