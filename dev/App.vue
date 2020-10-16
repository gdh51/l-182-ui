<template>
    <div id="app">
        <l-slide-box width="600px" height="300px" direction="vertical">
            <l-slide-plane>sdsd</l-slide-plane>
            <l-slide-plane>sdsd</l-slide-plane>
            <l-slide-plane>sdsd</l-slide-plane>
            <l-slide-plane>sdsd</l-slide-plane>
            <l-slide-plane>sdsd</l-slide-plane>
        </l-slide-box>
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default { name: 'App' }
</script>

<style lang="stylus" scoped>
#app
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover
</style>
