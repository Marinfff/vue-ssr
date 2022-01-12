import Vue from 'vue';
import Router from 'vue-router';
import About from '../modules/about/index.vue';
import Home from '../modules/home/index.vue';
import Page404 from "../modules/errors/Page404.vue";

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Home,
                name: 'home'
            },
            {
                path: '/about/:id',
                component: About,
                name: 'about'
            },
            {path: "*", component: Page404}
        ]
    });
};
