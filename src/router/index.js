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
        redirect: '/blog/JS/闭包'
    },
    {
        path: '/guid',
        name: 'index',
        component: resolve => require(['../views/guid/guid'], resolve)
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/components',
        component: resolve => require(['../views/components/index'], resolve),
        // redirect: '/components/guid/intro',
        children: [
            {
                path: '/components/:id',
                component: resolve => require(['../views/components/components'], resolve)
            },
            // {
            //     path: '/components/guid/:id',
            //     component: resolve => require(['../views/components/guid'], resolve)
            // }
        ]
    },
    {
        path: '/blogs',
        component: resolve => require(['../views/blogs/index'], resolve)
    },
    {
        path: '/blog/:id/:name',
        component: resolve => require(['../views/blogs/blog'], resolve)
    }
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
