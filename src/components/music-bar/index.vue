<template>
    <div class="music_bar">
        <!-- 虽然html中对属性大小写不敏感，但这也仅限于html中，vue模版中会按原模版解析 -->
        <circle-box innerClass="music_poster-img"></circle-box>
        <div class="music_info ellipsis">
            <div class="music_info-title">Kiss & Tell</div>
            <div class="music_info-author">Blink 182</div>
        </div>
        <div class="music_icons">
            <icon icon="playing" />
            <icon icon="queue_music" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'MusicBar',
    data() {
        return {}
    }
}
</script>

<style lang="stylus" scoped>
.music_bar
    position fixed
    bottom 0
    left 0
    display flex
    align-items center
    padding 10px
    width 100%
    height 1.733333rem
    border-top 1px solid $lw1

    >>>.music_poster-img
        background-image url('./香蕉猫.jpg')
        background-size cover

    .music_info
        flex 1
        padding 0 10px
        height 1.2rem

        .music_info-title
            height 60%
            font-size .64rem

        .music_info-author
            height 40%
            font-size .373333rem
</style>

