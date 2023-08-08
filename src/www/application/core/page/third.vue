<template>
    <v-img :height="height" class="text-center align-center text-white" gradient="45deg, #FF9F17, #FF4E0E">
        <div v-if="mobile" class="text-h4">MOBILE</div>
        <div v-else class="text-h2">DESKTOP</div>
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