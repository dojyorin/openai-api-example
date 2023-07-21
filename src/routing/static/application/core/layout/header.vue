<template>
    <v-app-bar density="compact" color="primary">
        <v-app-bar-nav-icon @click="nav = !nav"></v-app-bar-nav-icon>
        <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
</template>

<script>
    import {defineComponent, inject} from "../../deps.js";

    export default defineComponent({
        setup(){
            const nav = inject("xg-navigation");

            return {nav};
        }
    });
</script>