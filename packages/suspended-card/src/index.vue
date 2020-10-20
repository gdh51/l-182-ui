<template functional>
    <l-card class="l-suspended-card" v-bind="data.$attrs" v-on="listeners">
        <slot />
    </l-card>
</template>

<script>
import LCard from '@pack/card'

export default {
    name: 'LSuspendedCard',
    components: { LCard },
    data() {
        return {}
    }
}
</script>

<style lang="stylus">
@import '~@theme/suspended-card.styl'
</style>
