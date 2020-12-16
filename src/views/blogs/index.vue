<template>
    <div class="blogs-wrapper">
        <div>
            <p
                v-for="(blog, key) in mdBlogFile"
                :key="key"
            >
                {{key}}
                <router-link
                    :to="getBlogLink(item)"
                    v-for="item in blog"
                    :key="item"
                >
                    {{getBlogName(item)}}
                </router-link>
            </p>
        </div>
    </div>
</template>
<script>
import {mdBlogFile} from '../../content';
export default {
    name: 'BlogIndex',
    data() {
        return {
            mdBlogFile: mdBlogFile,
            blogFile: []
        }
    },
    created() {
        console.log(mdBlogFile);
    },
    methods: {
        getBlogName(path) {
            return path.split('/')[2];
        },
        getBlogLink(path) {
            return `/blog${path}`
        }
    }
}
</script>