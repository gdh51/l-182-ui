<template>
    <div id="app">
        <div :style="style">
            <l-scrollbar wrapStyle="height:100px">
                <div style="background: aqua;">
                    <div>sdsds</div>
                    <div>sdsds</div>
                    <div>sdsds</div>
                    <div>sdsds</div>
                    <div>sdsds</div>
                    <div>sdsds</div>
                    <div>sdsds</div>
                </div>
            </l-scrollbar>
        </div>
        <el-button @click="change">dia</el-button>
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default {
    name: 'App',
    data() {
        return {
            a: 0,
            style: { width: '100px' }
        }
    },
    methods: {
        change() {
            this.style.width = `${Math.floor(Math.random() * 10)}00px`
            this.style.height = `${Math.floor(Math.random() * 10)}00px`
        }
    }
}
</script>

<style lang="stylus" scoped>
#app
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%
    background-color #515254 + 92%

    .box
        width 800px

    .container
        overflow scroll
        width 0

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover

.flip-list-move
    transition transform 1s
</style>
