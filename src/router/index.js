/**
 * @ 路由跳转
 *
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home/index.vue';
Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'index',
        conponents: Home
    }
    // {
    //     path: '/home',
    //     name: 'home',
    //     conponents: Home
    // }
];
const router = new Router({
    // mode: 'history',
    routes: [...routes],
    //切换路由时滚动条回到顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    }
});

export default router;
