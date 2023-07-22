<template>
    <v-snackbar v-for="notify in notifies" model-value position="fixed" location="top" z-index="2100" :color="notify.color" timeout="-1" v-bind="notifyTimeout(notify, 5000)">
        <span>{{notify.message}}</span>

        <template #actions>
            <v-btn ripple density="comfortable" icon="mdi-close" @click="notifyTimeout(notify, 0)"></v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import {defineComponent, inject} from "../../deps.js";

    export default defineComponent({
        setup(){
            const notifies = inject("xg-notifies");

            async function notifyTimeout(notify, ms){
                await new Promise(done => setTimeout(done, ms));

                const i = notifies.findIndex(v => v === notify);

                if(i === -1){
                    return;
                }

                notifies.splice(i, 1);
            }

            return {notifies, notifyTimeout};
        }
    });
</script>