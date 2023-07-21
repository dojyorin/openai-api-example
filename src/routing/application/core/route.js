import {createRouter, createWebHashHistory, fetchComponent} from "../deps.js";

export const route = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        name: "Home",
        component: fetchComponent(import.meta.resolve("./page/index.vue"))
    }, {
        path: "/sub",
        name: "Sub",
        component: fetchComponent(import.meta.resolve("./page/sub.vue"))
    }, {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: fetchComponent(import.meta.resolve("./page/404.vue"))
    }]
});