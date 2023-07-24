import {reactive} from "../deps.js";

export const provide = ((arg)=>{
    return {
        install(context){
            for(const [k, v] of Object.entries(arg)){
                context.provide(k, v);
            }
        }
    };
})({
    "xg-notifies": reactive([]),
    "xg-threads": reactive([])
});