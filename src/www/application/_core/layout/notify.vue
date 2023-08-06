<template>
    <v-snackbar v-for="notify in notifies" model-value position="fixed" location="top" z-index="3000" :color="notify.color" timeout="-1" v-bind="notifyTimeout(notify, 5000)">
        <div>{{notify.message}}</div>

        <template #actions>
            <v-btn ripple density="comfortable" icon="mdi-close" @click="notifyTimeout(notify, 0)"></v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import {defineComponent, inject} from "../../deps.js";

    export default defineComponent({
        setup(){
            const notifies = inject("g-notifies");

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