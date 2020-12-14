<template>
    <div class="container origin-container">
        <div
            class="bd-content"
            v-if="blog"
            v-html="blog"
        />
    </div>
</template>
<script>
import {mdBlogFile} from '../../content'
import {renderBlogMdList} from '../../utils/mdUtil'
export default {
    name: 'Blog',
    data() {
        return {
            timer: null,
            name: '',
            blog: '',
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
        this.reload()
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
            const me = this
            // const mdUrl = mdBlogFile[id][`/${id}/${name}`];
            const mdUrl = `/${id}/${name}`;
            let demo = renderBlogMdList(mdUrl);
            me.blog = demo;
        }
    }
}
</script>