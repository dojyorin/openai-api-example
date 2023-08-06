<template>
    <v-app>
        <x-loading></x-loading>
        <x-notify></x-notify>
        <x-header></x-header>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import {defineComponent, defineAsyncComponent, fetchComponent} from "../deps.js";

    export default defineComponent({
        components: {
            "x-header": defineAsyncComponent(fetchComponent("./layout/header.vue")),
            "x-loading": defineAsyncComponent(fetchComponent("./layout/loading.vue")),
            "x-notify": defineAsyncComponent(fetchComponent("./layout/notify.vue"))
        }
    });
</script>