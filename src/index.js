/**
 * @ 入口文件
 *
 */
import Vue from 'vue';
import App from './app.vue';
import router from './router/index.js';
import './asseets/styles/index.scss'
new Vue({
    router,
    el: '#app',
    ...App
});
