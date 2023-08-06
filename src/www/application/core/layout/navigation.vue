<template>
    <v-navigation-drawer floating temporary v-model="nav">
        <v-toolbar density="compact" color="transparent">
            <v-btn icon="mdi-close" @click="nav = false"></v-btn>
        </v-toolbar>

        <v-list nav density="compact">
            <v-list-item v-for="{path, name} in routes" :to="path">
                <v-list-item-title>{{name}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {defineComponent, inject, useRouter} from "../../deps.js";

    export default defineComponent({
        setup(){
            const router = useRouter();

            const nav = inject("g-layout-navigation");

            const routes = router.options.routes.filter(({path}) => !/:/.test(path));

            return {nav, routes};
        }
    });
</script>