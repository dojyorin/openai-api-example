<template>
    <v-overlay persistent no-click-animation z-index="3000" class="justify-center align-center" v-model="loading">
        <v-progress-circular indeterminate size="60" width="4" color="primary"></v-progress-circular>
    </v-overlay>
</template>

<script>
    import {defineComponent, inject} from "../../deps.js";

    export default defineComponent({
        setup(){
            const loading = inject("g-loading");

            return {loading};
        }
    });
</script>