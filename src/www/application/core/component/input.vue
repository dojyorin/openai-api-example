<template>
    <div class="d-flex justify-start align-center px-3 py-2 w-100">
        <v-btn-toggle v-if="!focus" mandatory density="comfortable" color="secondary" v-model="type">
            <v-tooltip location="top" text="文章応答モード">
                <template #activator="{props}">
                    <v-btn :="props" icon="mdi-message-text-outline" value="chat"></v-btn>
                </template>
            </v-tooltip>

            <v-tooltip location="top" text="画像応答モード">
                <template #activator="{props}">
                    <v-btn :="props" icon="mdi-image-outline" value="image"></v-btn>
                </template>
            </v-tooltip>
        </v-btn-toggle>

        <v-textarea no-resize hide-details single-line flat clearable density="compact" variant="solo" rows="1" class="mx-3" label="入力 (送信:Alt+Enter)" @keyup.alt.enter.exact="({target}) => target.blur() || requestApi()" v-model="input"></v-textarea>

        <v-tooltip location="top" text="送信">
            <template #activator="{props}">
                <v-btn :="props" flat density="comfortable" color="transparent" icon="mdi-send" @click="requestApi()"></v-btn>
            </template>
        </v-tooltip>
    </div>
</template>

<script>
    import {defineComponent, ref, inject, fetchExtend, base64Decode} from "../../deps.js";

    async function fetchAPI(path, body){
        return await fetchExtend(path, "json", {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            headers: {
                ...body && {
                    "Content-Type": "application/json"
                }
            }
        });
    }

    function displayContent(own, type, value){
        return {
            time: new Date().toLocaleString().replace(/:\d{2}$/, ""),
            own: own,
            type: type,
            value: value
        };
    }

    function blobURL(data, mime){
        return URL.createObjectURL(new Blob([data], {
            type: mime
        }));
    }

    export default defineComponent({
        setup(){
            const notifies = inject("g-notifies");
            const threads = inject("g-threads");

            const input = ref("");
            const type = ref("chat");

            async function requestApi(){
                const inputValue = input.value;

                if(!inputValue){
                    return;
                }

                threads.push(displayContent(true, "text", inputValue));

                input.value = "";

                try{
                    switch(type.value){
                        case "chat": {
                            const {value} = await fetchAPI("/api/chat", {
                                query: inputValue
                            });

                            threads.push(displayContent(false, "text", value));
                        } break;

                        case "image": {
                            const {value} = await fetchAPI("/api/image", {
                                query: inputValue
                            });

                            threads.push(displayContent(false, "picture", blobURL(base64Decode(value), "image/png")));
                        } break;

                        default: break;
                    }
                }
                catch(e){
                    console.error(e);

                    notifies.push({
                        color: "error",
                        message: "送信できませんでした"
                    });
                }
            }

            return {input, type, requestApi};
        }
    });
</script>