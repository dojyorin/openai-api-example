import {fetchComponent, defineAsyncComponent} from "../deps.js";

export default {
    install(context){
        context.component("g-x-reflect", defineAsyncComponent(fetchComponent(import.meta.resolve("./component/reflect.vue"))));
    }
};