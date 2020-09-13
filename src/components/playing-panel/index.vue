<template>
    <div class="playing_panel">
        <div class="router_panel"></div>
        <div class="song_panel">
            <div class="album_cover-container">
                <div class="album_cover-img"></div>
            </div>
            <song-info />
            <song-controler />
        </div>
    </div>
</template>

<script>
import SongInfo from './components/song-info/index'
import SongControler from './components/song-controler/index'

export default {
    name: 'PlayingPanel',
    data() {
        return {}
    },

    components: {
        SongInfo,
        SongControler
    }
}
</script>

<style lang="stylus" scoped>
.playing_panel
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(0, 0, 0, .8)

    .router_panel
        width 100%
        height 1.333333rem

    .song_panel
        padding 0 30px

        .album_cover-container
            width 100%

        .album_cover-img
            margin 10px 0
            width calc(10rem - 60px)
            height calc(10rem - 60px)
            border-radius 10px
            background-image url('./ablum_img.jpg')
            background-size cover
</style>
