import {fetchComponent} from "../deps.js";

export const component = ((arg)=>{
    return {
        install(context){
            for(const [k, v] of Object.entries(arg)){
                context.component(k, v);
            }
        }
    };
})({
    "xg-input": await fetchComponent(import.meta.resolve("./component/input.vue"))()
});