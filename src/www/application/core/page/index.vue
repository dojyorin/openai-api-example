<template>
    <v-container class="py-0">
        <v-virtual-scroll ref="vScroll" :height="balloonHeight" :items="balloons" class="py-2">
            <template #="{item}">
                <div class="d-flex" :class="item.own ? 'justify-end' : 'justify-start'">
                    <div class="rounded-lg bg-white" style="max-width: 70%;">
                        <v-card flat rounded="lg" variant="tonal" :color="item.own ? 'deep-purple-accent-4' : 'orange-darken-4'">
                            <v-card-text v-if="item.type === 'text'" class="pa-3 text-body-1 text-pre-wrap">{{item.value}}</v-card-text>
                            <v-img v-else-if="item.type === 'picture'" :src="item.value" width="256"></v-img>
                        </v-card>
                    </div>
                </div>

                <div class="px-1 mb-4 text-caption" :class="item.own ? 'text-end' : 'text-start'">{{item.time}}</div>
            </template>
        </v-virtual-scroll>
    </v-container>

    <v-footer :height="inputHeight" color="grey-lighten-2" class="justify-start align-center py-0 w-100">
        <v-btn-toggle v-if="!focus" mandatory density="comfortable" color="secondary" v-model="formType">
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

        <v-textarea no-resize hide-details single-line flat clearable density="compact" variant="solo" rows="1" class="mx-3" label="入力 (送信:Alt+Enter)" @keyup.alt.enter.exact="({target}) => target.blur() || requestAPI()" v-model="formInput"></v-textarea>

        <v-tooltip location="top" text="送信">
            <template #activator="{props}">
                <v-btn :="props" flat density="comfortable" color="transparent" icon="mdi-send" @click="requestAPI()"></v-btn>
            </template>
        </v-tooltip>
    </v-footer>
</template>

<script>
    import {defineComponent, ref, reactive, inject, computed, nextTick, useDisplay, useLayout, fetchComponent, fetchExtend, base64Decode} from "../../deps.js";

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
            const display = useDisplay();
            const layout = useLayout();

            const formInput = ref("");
            const formType = ref("chat");
            const vScroll = ref(null);
            const inputHeight = ref(56);
            const balloons = reactive([]);

            const notifies = inject("@layout:notify");

            const balloonHeight = computed(() => display.height.value - layout.mainRect.value.top - inputHeight.value);

            async function bottomStick(){
                const {scrollHeight, scrollTop, clientHeight} = vScroll.value._.vnode.el;

                if(scrollHeight - (clientHeight + scrollTop)){
                    return;
                }

                await nextTick();
                vScroll.value.scrollToIndex(balloons.length - 1);
            }

            async function requestAPI(){
                const formInputValue = formInput.value;

                if(!formInputValue){
                    return;
                }

                balloons.push(displayContent(true, "text", formInputValue));
                await bottomStick();

                formInput.value = "";

                try{
                    switch(formType.value){
                        case "chat": {
                            const {value} = await fetchAPI("/api/chat", {
                                query: formInputValue
                            });

                            balloons.push(displayContent(false, "text", value));
                            await bottomStick();
                        } break;

                        case "image": {
                            const {value} = await fetchAPI("/api/image", {
                                query: formInputValue
                            });

                            balloons.push(displayContent(false, "picture", blobURL(base64Decode(value), "image/png")));
                            await bottomStick();
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

            return {formInput, inputHeight, formType, requestAPI, balloons, balloonHeight, vScroll};
        }
    });
</script>