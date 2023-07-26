import {ref, reactive} from "../deps.js";

export const provide = ((o)=>{
    return {
        install(context){
            for(const [k, v] of Object.entries(o)){
                context.provide(k, v);
            }
        }
    };
})({
    "g-navigation": ref(false),
    "g-loading": ref(true),
    "g-notifies": reactive([])
});