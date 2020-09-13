<template>
    <i class="icon" :class="icon"></i>
</template>

<script>
export default {
    name: 'Icon',

    props: {
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.icon
    font-style normal
    font-size 1rem
    font-family 'iconfont' !important
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale

.liked:before
    content '\ed3d'

.like:before
    content '\ed3e'

.download1:before
    content '\ed3f'

.menu1:before
    content '\ed41'

.search:before
    content '\ed42'

.playing1:before
    content '\ed48'

.next:before
    content '\ed49'

.queue_music:before
    content '\ed4a'

.one_repeat:before
    content '\ed4b'

.pause:before
    content '\ed4c'

.prev:before
    content '\ed4d'

.pause_wc:before
    content '\ed4e'

.random_play:before
    content '\ed4f'

.list_repeat:before
    content '\ed50'

.playing:before
    content '\ed51'

.comments:before
    content '\ed52'

.download:before
    content '\ed60'

.menu:before
    content '\ed6a'
</style>
