<template>
    <div class="song_controler">
        <div class="song_command">
            <icon icon="download1"
                  class="other"/>
            <icon icon="comments"
                  class="other"/>
        </div>
        <div class="playing_progress">
            <drag-bar :size="dragbarSize"/>
            <div class="progress_time"></div>
        </div>
        <div class="playing_command">
            <icon icon="one_repeat"
                  class="other"/>
            <div class="playing_command-song">
                <icon icon="prev"
                  class="other"/>
                <icon icon="playing"
                      class="playing"/>
                <icon icon="next"
                      class="other"/>
            </div>
            <icon icon="queue_music"
                  class="other"/>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.song_controler
    position absolute
    bottom 0
    width calc(100% - 60px)
    height 160px
    padding-bottom 20px
    background-color red

    .song_command
        display flex
        justify-content space-around
        align-items center
        height 40px

    .playing_progress
        margin 10px 0 10px

    .playing_command
        display flex
        justify-content space-between
        align-items center
        height 60px

        .playing_command-song
            display flex
            align-items center

            .playing
                font-size 60px

    .other
        font-size 37.5px
</style>

<script>
export default {
    name: 'SongControler',
    data () {
        return {
            dragbarSize: {
                width: '100%',
                height: '5px'
            }
        }
    }
}
</script>