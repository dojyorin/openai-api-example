<template>
    <v-app>
        <x-loading></x-loading>
        <x-notify></x-notify>
        <x-navigation></x-navigation>
        <x-header></x-header>
        <v-main>
            <router-view></router-view>
        </v-main>
        <x-footer></x-footer>
    </v-app>
</template>

<script>
    import {defineComponent, defineAsyncComponent, fetchComponent} from "../../deps.js";

    export default defineComponent({
        components: {
            "x-header": defineAsyncComponent(fetchComponent("./main_header.vue")),
            "x-footer": defineAsyncComponent(fetchComponent("./main_footer.vue")),
            "x-loading": defineAsyncComponent(fetchComponent("./main_loading.vue")),
            "x-notify": defineAsyncComponent(fetchComponent("./main_notify.vue")),
            "x-navigation": defineAsyncComponent(fetchComponent("./main_navigation.vue"))
        }
    });
</script>