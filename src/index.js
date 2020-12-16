/**
 * @ 入口文件
 *
 */
import Vue from 'vue';
import App from './app.vue';
import router from './router/index.js';
import './directives/preEdit.js';
import './directives/highlight.js';
import './asseets/styles/index.scss';
import 'github-markdown-css/github-markdown.css'
new Vue({
    router,
    el: '#app',
    ...App
});
