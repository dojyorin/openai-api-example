<template>
    <v-container>
        <v-list class="pa-0">
            <v-list-item v-for="{time, own, type, value} in threads" class="mb-6 pa-0">
                <div class="d-flex" :class="own ? 'justify-end' : 'justify-start'">
                    <div style="max-width:70%;">
                        <v-card flat rounded="lg" variant="tonal" :color="own ? 'deep-purple-accent-4' : 'orange-darken-4'">
                            <v-card-text v-if="type === 'text'" class="pa-3 text-body-1 text-pre-wrap">{{value}}</v-card-text>
                            <v-img v-else-if="type === 'picture'" :src="value" width="256"></v-img>
                        </v-card>

                        <v-card flat class="d-flex align-end">
                            <v-card-text class="py-0 px-1" :class="own ? 'text-end' : 'text-start'">{{time}}</v-card-text>
                        </v-card>
                    </div>
                </div>
            </v-list-item>
        </v-list>
    </v-container>

    <v-sheet color="grey-lighten-2" width="100%" position="fixed" location="bottom">
        <x-input></x-input>
    </v-sheet>
</template>

<script>
    import {defineComponent, defineAsyncComponent, inject, fetchComponent} from "../../deps.js";

    export default defineComponent({
        components: {
            "x-input": defineAsyncComponent(fetchComponent("../component/input.vue")),
        },
        setup(){
            const threads = inject("xg-threads");

            return {threads};
        }
    });
</script>