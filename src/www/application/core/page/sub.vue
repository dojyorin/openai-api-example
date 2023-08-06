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
                            <v-btn color="teal-darken-1" variant="flat" @click="delayresetx()">DelayResetX</v-btn>
                        </g-x-reflect>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {defineComponent, inject} from "../../deps.js";

    export default defineComponent({
        setup(){
            const loading = inject("g-layout-loading");
            const notifies = inject("g-layout-notify");
            const countx = inject("g-increment-count");

            function resetx(){
                countx.value = 0;

                notifies.push({
                    color: "orange-darken-1",
                    message: "ResetX!"
                });
            }

            async function delayresetx(){
                loading.value = true;
                await new Promise(done => setTimeout(done, 1000));
                countx.value = 0;
                loading.value = false;

                notifies.push({
                    color: "teal-darken-1",
                    message: "ResetDelayX!"
                });
            }

            return {countx, resetx, delayresetx};
        }
    });
</script>