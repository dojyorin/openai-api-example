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
    import {defineComponent, defineAsyncComponent, inject, onMounted, fetchComponent} from "../deps.js";

    export default defineComponent({
        components: {
            "x-header": defineAsyncComponent(fetchComponent("./layout/header.vue")),
            "x-footer": defineAsyncComponent(fetchComponent("./layout/footer.vue")),
            "x-loading": defineAsyncComponent(fetchComponent("./layout/loading.vue")),
            "x-notify": defineAsyncComponent(fetchComponent("./layout/notify.vue")),
            "x-navigation": defineAsyncComponent(fetchComponent("./layout/navigation.vue"))
        },
        setup(){
            const loading = inject("xg-loading");

            onMounted(()=>{
                loading.value = false;
            });

            return {};
        }
    });
</script>