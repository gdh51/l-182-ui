<template>
    <div id="app">
            <!-- <div class="container">
                <div></div>
            </div> -->
            <l-bar-slot style="width: 300px;" bar-size-radio="30%" horizontal />
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'
import LBarSlot from '@pack/scrollbar/src/components/bar-slot'

export default { name: 'App', components: { LBarSlot } }
</script>

<style lang="stylus" scoped>
#app
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%

    .container
        width 0
        overflow scroll

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover
</style>
