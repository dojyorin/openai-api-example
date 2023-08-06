import {ref, reactive} from "../deps.js";

export default {
    install(context){
        context.provide("g-layout-loading", ref(false));
        context.provide("g-layout-notify", reactive([]));
        context.provide("g-thread-message", reactive([]));
    }
};