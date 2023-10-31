<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols>
                <v-card>
                    <v-card-item>
                        <v-card-title class="text-center">{{count}} : {{countx}}</v-card-title>
                    </v-card-item>

                    <v-card-actions class="justify-center">
                        <v-btn color="green" variant="flat" @click="increment()">Increment</v-btn>
                        <v-btn color="purple" variant="flat" @click="incrementx()">IncrementX</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {defineComponent, ref, inject} from "../../deps.js";

    export default defineComponent({
        setup(){
            const count = ref(0);

            const notifies = inject("@layout:notify");
            const countx = inject("@count");

            function increment(){
                count.value++;

                notifies.push({
                    color: "green",
                    message: "Increment!"
                });
            }

            function incrementx(){
                countx.value++;

                notifies.push({
                    color: "purple",
                    message: "IncrementX!"
                });
            }

            return {count, countx, increment, incrementx};
        }
    });
</script>