import {reactive} from "../deps.js";

export const provide = ((o)=>{
    return {
        install(context){
            for(const [k, v] of Object.entries(o)){
                context.provide(k, v);
            }
        }
    };
})({
    "g-notifies": reactive([]),
    "g-threads": reactive([])
});