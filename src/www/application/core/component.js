import {fetchComponent, defineAsyncComponent} from "../deps.js";

export const component = {
    install(context){
        context.component("g-x-reflect", defineAsyncComponent(fetchComponent(import.meta.resolve("./component/reflect.vue"))));
    }
};