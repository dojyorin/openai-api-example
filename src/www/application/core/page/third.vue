<template>
    <v-img :height="height" class="text-center align-center text-white" gradient="45deg, #FF9F17, #FF4E0E">
        <h1 v-if="mobile">MOBILE</h1>
        <h1 v-else>DESKTOP</h1>
    </v-img>
</template>

<script>
    import {defineComponent, computed, useDisplay, useLayout} from "../../deps.js";

    export default defineComponent({
        setup(){
            const display = useDisplay();
            const layout = useLayout();

            const mobile = computed(() => display.mobile.value);
            const height = computed(() => display.height.value - layout.mainRect.value.top - layout.mainRect.value.bottom);

            return {mobile, height};
        }
    });
</script>