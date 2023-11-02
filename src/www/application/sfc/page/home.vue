<template>
    <v-container class="py-0">
        <v-virtual-scroll class="py-2" ref="bubbleView" :height="bubbleHeight" :items="posts" v-scroll.self="onScroll">
            <template #="{item}">
                <div class="d-flex" :class="`justify-${item.own ? 'end' : 'start'}`">
                    <v-card flat max-width="70%" rounded="lg" variant="tonal" class="bg-white" :color="item.own ? 'deep-purple-accent-4' : 'orange-darken-4'">
                        <v-card-text v-if="item.type === 'text'" class="text-body-1 text-pre-wrap">{{item.value}}</v-card-text>
                        <v-img v-else-if="item.type === 'picture'" width="256" class="v-card--link" :src="item.value" @click="openTab(item.value)"></v-img>
                    </v-card>
                </div>

                <v-card flat class="px-1 mb-6">
                    <v-card-text class="pa-0" :class="`text-${item.own ? 'end' : 'start'}`">{{item.time}}</v-card-text>
                </v-card>
            </template>
        </v-virtual-scroll>
    </v-container>

    <v-slide-y-transition>
        <v-alert position="absolute" location="bottom" density="compact" elevation="4" variant="tonal" color="light-blue-accent-4" class="bg-white" :style="`bottom: ${inputHeight + 8}px;`" v-model="alertNewPost">新着メッセージ</v-alert>
    </v-slide-y-transition>

    <v-footer app height="56" color="grey-lighten-2" class="justify-start align-center py-0 px-2 w-100">
        <v-btn-toggle v-if="!focus" mandatory density="comfortable" color="primary" v-model="formType">
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

        <v-textarea no-resize hide-details single-line flat clearable density="compact" variant="solo" rows="1" label="入力 (送信:Alt+Enter)" class="mx-2" @keyup.alt.enter.exact="requestAPI" v-model="formText"></v-textarea>

        <v-tooltip location="top" text="送信">
            <template #activator="{props}">
                <v-btn :="props" flat density="comfortable" color="transparent" icon="mdi-send" @click="requestAPI"></v-btn>
            </template>
        </v-tooltip>
    </v-footer>
</template>

<script>
    import {defineComponent, ref, reactive, inject, computed, nextTick, useDisplay, useLayout, fetchExtend, b64Decode} from "../../deps.js";

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

    function blobURL(data, mime){
        return URL.createObjectURL(new Blob([data], {type: mime}));
    }

    export default defineComponent({
        setup(){
            const display = useDisplay();
            const layout = useLayout();

            const formText = ref("");
            const formType = ref("chat");
            const alertNewPost = ref(false);
            const bubbleView = ref(null);
            const posts = reactive([]);

            const notifies = inject("@layout:notify");

            const bubbleHeight = computed(() => display.height.value - layout.mainRect.value.top - layout.mainRect.value.bottom);
            const inputHeight = computed(() => layout.mainRect.value.bottom);

            function stickNewPost(){
                const {scrollHeight, scrollTop, clientHeight} = bubbleView.value._.vnode.el;

                return scrollHeight - (clientHeight + scrollTop) === 0;
            }

            async function displayPost(own, type, value){
                posts.push({
                    time: new Date().toLocaleString().replace(/:\d{2}$/, ""),
                    own: own,
                    type: type,
                    value: value
                });

                if(stickNewPost()){
                    await nextTick();
                    bubbleView.value.scrollToIndex(posts.length - 1);
                }
                else if(!own){
                    alertNewPost.value = true;
                }
            }

            function onScroll(){
                if(stickNewPost() && alertNewPost.value){
                    alertNewPost.value = false;
                }
            }

            async function requestAPI(){
                const formInputValue = formText.value;

                if(!formInputValue){
                    return;
                }

                await displayPost(true, "text", formInputValue);

                formText.value = "";

                try{
                    switch(formType.value){
                        case "chat": {
                            const {value} = await fetchAPI("/api/chat", {
                                query: formInputValue
                            });

                            await displayPost(false, "text", value);
                        } break;

                        case "image": {
                            const {value} = await fetchAPI("/api/image", {
                                query: formInputValue
                            });

                            await displayPost(false, "picture", blobURL(b64Decode(value), "image/png"));
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

            function openTab(link){
                window.open(link, "_blank");
            }

            return {formText, formType, posts, bubbleView, alertNewPost, bubbleHeight, inputHeight, requestAPI, openTab, onScroll};
        }
    });
</script>