<template>
    <div class="blog-wrapper">
        <Nav />
        <div class="markdown-body md">
            <VueMarkdown
                :source="blog"
                v-highlight>
            </VueMarkdown>
        </div>
        <div class="guid-wrapper">
            <ul class="time-line">
                <li
                    class="time-line-item"
                    v-for="(item,index) in guids"
                    :key="'menu'+index"
                    v-html="item">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {renderBlogMdList} from '../../utils/mdUtil'
import VueMarkdown from 'vue-markdown';
import Nav from '../../components/blogNav';
export default {
    name: 'Blog',
    components: {
        VueMarkdown,
        Nav
    },
    data() {
        return {
            timer: null,
            name: '',
            blog: '',
            blogHtml: '',
            guids: [],
            currentRoute: ''
        }
    },
    watch: {
        '$route'(to, from) {
            let id = this.$route.params.id;
            let name = this.$route.params.name
            if (this.currentRoute !== name) {
                this.blog = null;
                this.reload();
            }
        }
    },
    created() {
        this.reload();
    },
    methods: {
        reload() {
            const id = this.$route.params.id || '';
            const name = this.$route.params.name || '';
            this.currentRoute = name;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.renderHtmlDate(id, name);
            }, 100);
        },
        renderHtmlDate(id, name) {
            const mdUrl = `/${id}/${name}`;
            let demo = renderBlogMdList(mdUrl);
            this.blog = demo.markdown;
            this.blogHtml = demo.html
            this.guids = this.renderGuid(demo.html);
        },
        renderGuid(text) {
            const STYLE_REGEX = /<(h2)[^<>]*?>(.|\s)*?<\/h2>/g;
            let styles = text.match(STYLE_REGEX);
            console.log(styles, text);
            let guids = [];
            for (let i = 0; i < styles.length; i++) {
                const e = styles[i];
                guids.push(
                    e.replace(/h2/g, 'a')
                        .replace(/id="/g, 'href="#')
                        .replace(/<(\/)?strong>/g, '')
                )
            }
            return guids
        }
    }
}
</script>