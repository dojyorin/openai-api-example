import {fetchComponent, defineAsyncComponent} from "../_deps.js";

function f(path){
    return defineAsyncComponent(fetchComponent(import.meta.resolve(path)));
}

export const component = {
    install(context){
        context.component("x-reflect", f("./common/reflect.vue"));
    }
};