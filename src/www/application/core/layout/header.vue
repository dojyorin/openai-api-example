<template>
    <v-app-bar density="compact" color="primary">
        <v-app-bar-title class="ml-0 text-center">OpenAI API Example</v-app-bar-title>
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