import {createRouter, createWebHashHistory, fetchComponent} from "../deps.js";

function f(path){
    return fetchComponent(import.meta.resolve(path));
}

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        name: "home",
        component: f("./page/home.vue")
    }, {
        path: "/sub",
        name: "sub",
        component: f("./page/sub.vue")
    }, {
        path: "/third",
        name: "third",
        component: f("./page/third.vue")
    }, {
        path: "/:catchAll(.*)",
        name: "404",
        component: f("./page/404.vue")
    }]
});