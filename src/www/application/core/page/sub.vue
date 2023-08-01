<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols>
                <v-card>
                    <v-card-item>
                        <v-card-title class="text-center">{{countx}}</v-card-title>
                    </v-card-item>

                    <v-card-actions class="justify-center">
                        <g-x-reflect>
                            <v-btn color="orange-darken-1" variant="flat" @click="resetx()">ResetX</v-btn>
                            <v-btn color="teal-darken-1" variant="flat" @click="resetdelayx()">ResetDelayX</v-btn>
                        </g-x-reflect>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {defineComponent, inject, computed, useStore} from "../../deps.js";

    export default defineComponent({
        setup(){
            const store = useStore();

            const loading = inject("g-loading");
            const notifies = inject("g-notifies");

            const countx = computed(() => store.getters.count);

            function resetx(){
                store.commit("reset");

                notifies.push({
                    color: "orange-darken-1",
                    message: "ResetX!"
                });
            }

            async function resetdelayx(){
                loading.value = true;
                await store.dispatch("delayReset");
                loading.value = false;

                notifies.push({
                    color: "teal-darken-1",
                    message: "ResetDelayX!"
                });
            }

            return {countx, resetx, resetdelayx};
        }
    });
</script>