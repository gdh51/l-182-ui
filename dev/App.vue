<template>
    <div id="app">
        <!-- <full-page :options="options">
            <div class="section">
                <button class="next">Next</button>
                Section 1
            </div>
            <div class="section">
                <button class="prev">Prev</button>
                Section 2
            </div>
        </full-page>-->
        <l-slide-box direction="vertical">
            <l-slide-panel>sdsd</l-slide-panel>
            <l-slide-panel>xxxx</l-slide-panel>
            <l-slide-panel>1111</l-slide-panel>
        </l-slide-box>
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default {
    name: 'App',
    data() {
        return { options: { afterLoad: this.afterLoad, licenseKey: '231' } }
    },
    methods: {
        afterLoad() {
            console.log("Emitted 'after load' event.")
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

    .container
        overflow scroll
        width 0

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover
</style>
