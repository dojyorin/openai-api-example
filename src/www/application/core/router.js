import {createRouter, createWebHashHistory, fetchComponent} from "../deps.js";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        name: "index",
        component: fetchComponent("./core/page/index.vue")
    }, {
        path: "/sub",
        name: "sub",
        component: fetchComponent("./core/page/sub.vue")
    }, {
        path: "/third",
        name: "third",
        component: fetchComponent("./core/page/third.vue")
    }, {
        path: "/:catchAll(.*)",
        name: "404",
        component: fetchComponent("./core/page/404.vue")
    }]
});