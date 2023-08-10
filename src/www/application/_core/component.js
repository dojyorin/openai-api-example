import {fetchComponent, defineAsyncComponent} from "../deps.js";

export default {
    install(context){
        context.component("g-x-blank", defineAsyncComponent(fetchComponent(import.meta.resolve("./component/blank.vue"))));
    }
};