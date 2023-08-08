import {ref, reactive} from "../deps.js";

export default {
    install(context){
        context.provide("@layout:navigation", ref(false));
        context.provide("@layout:loading", ref(false));
        context.provide("@layout:notify", reactive([]));
        context.provide("@increment:count", ref(0));
    }
};