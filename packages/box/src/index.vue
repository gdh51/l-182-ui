<template functional>
    <div class="l-box" v-bind="data.$attrs" v-on="listeners">
        <slot />
    </div>
</template>

<script>
export default { name: 'LBox' }
</script>

<style lang="stylus">
@import '~@theme/container.styl'
</style>
