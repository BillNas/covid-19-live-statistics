import Vue from "vue";
import VueRouter from "vue-router";
import States from "./views/States.vue";
import Continents from "./views/Continents.vue";
import World from "./views/World.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: World
    },
    {
        path: "/continents",
        name: "continents",
        component: Continents
    },
    {
        path: "/usa",
        name: "usa",
        component: States
    },

];

const router = new VueRouter({
    routes
});

export default router;