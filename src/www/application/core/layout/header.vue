<template>
    <v-app-bar density="compact" class="text-white">
        <v-app-bar-nav-icon @click="nav = !nav"></v-app-bar-nav-icon>
        <v-app-bar-title class="text-h5">Application</v-app-bar-title>

        <template #image>
            <v-img gradient="45deg, #174AFF, #0ECDFF"></v-img>
        </template>
    </v-app-bar>
</template>

<script>
    import {defineComponent, inject} from "../../deps.js";

    export default defineComponent({
        setup(){
            const nav = inject("g-layout-navigation");

            return {nav};
        }
    });
</script>