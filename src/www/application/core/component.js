import {fetchComponent, defineAsyncComponent} from "../deps.js";

export const component = {
    install(context){
        context.component("x-reflect", defineAsyncComponent(fetchComponent("./core/component/reflect.vue")));
    }
};