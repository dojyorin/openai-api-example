import {fetchComponent} from "../deps.js";

export const component = ((o)=>{
    return {
        install(context){
            for(const [k, v] of Object.entries(o)){
                context.component(k, v);
            }
        }
    };
})({
    "g-x-reflect": await fetchComponent(import.meta.resolve("./component/reflect.vue"))()
});