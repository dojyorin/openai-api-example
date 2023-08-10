import {createRouter, createWebHashHistory, fetchComponent} from "../deps.js";

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        name: "index",
        component: fetchComponent(import.meta.resolve("./page/index.vue"))
    }, {
        path: "/:catchAll(.*)",
        name: "404",
        component: fetchComponent(import.meta.resolve("./page/404.vue"))
    }]
});