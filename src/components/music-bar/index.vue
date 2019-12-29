<template>
    <div class="music_bar">
        <div class="music_poster-container">
            <div class="music_poster-img"></div>
        </div>
        <div class="music_info ellipsis">
            <div class="music_info-title">
                Kiss & Tell
            </div>
            <div class="music_info-author">
                Blink 182
            </div>
        </div>
        <div class="music_icons">
            <icon icon="playing"/>
            <icon icon="queue_music"/>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.music_bar
    position fixed
    bottom 0
    left 0
    display flex
    align-items center
    width 100%
    height 1.733333rem
    padding 10px
    border-top 1px solid $lw1

    .music_poster-container
        width 1.2rem
        height 1.2rem

        .music_poster-img
            width 100%
            height 100%
            border-radius 50%
            background-image url('./香蕉猫.jpg')
            background-size cover

    .music_info
        flex 1
        height 1.2rem
        padding 0 10px

        .music_info-title
            height 60%
            font-size .64rem

        .music_info-author
            height 40%
            font-size .373333rem
</style>

<script>
export default {
    name: 'MusicBar',
    data () {
        return {}
    }
}
</script>