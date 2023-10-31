import {ref, reactive} from "../deps.js";

export const provide = {
    install(context){
        context.provide("@layout:navigation", ref(false));
        context.provide("@layout:loading", ref(false));
        context.provide("@layout:notify", reactive([]));
        context.provide("@count", ref(0));
    }
};