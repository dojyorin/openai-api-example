<template>
    <v-navigation-drawer floating temporary v-model="nav">
        <v-toolbar density="compact" color="primary">
            <v-btn icon="mdi-close" @click="nav = false"></v-btn>
        </v-toolbar>

        <v-list>
            <template v-for="{path, name} in routes">
                <v-list-item :to="path">
                    <v-list-item-title>{{name}}</v-list-item-title>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {defineComponent, inject, useRouter} from "../../deps.js";

    export default defineComponent({
        setup(){
            const router = useRouter();

            const nav = inject("xg-navigation");

            const routes = router.getRoutes().toSpliced(-1, 1);

            return {nav, routes};
        }
    });
</script>