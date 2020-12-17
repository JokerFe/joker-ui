<template>
    <div class="blogs-wrapper">
        <Nav />
        <!-- <div>
            <p
                v-for="(blog, key) in mdBlogFile"
                :key="key"
            >
                {{key}}
            </p>
        </div> -->
    </div>
</template>
<script>
import {mdBlogFile} from '../../content';
import Nav from '../../components/blogNav';
export default {
    name: 'BlogIndex',
    components: {
        Nav
    },
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