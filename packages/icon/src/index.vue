<template functional>
    <i
        class="l-icon"
        :class="[ `l-icon_${props.icon}`, data.staticClass, data.class ]"
        v-bind="data.attrs"
        :style="[ data.style, data.staticStyle ]"
        v-on="listeners"
    />
</template>

<script>
import '@theme/icon.styl'

export default {
    name: 'LIcon',
    props: { icon: String }
}
</script>
