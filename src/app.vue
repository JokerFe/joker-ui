<template>
    <div id="app">
        <j-nav v-if="!isBlog" />
        <router-view></router-view>
    </div>
</template>

<script>
import JNav from './components/nav';
export default {
    name: 'App',
    components: {
        JNav,
    },
    data() {
        return {
            isBlog: false
        }
    },
    watch: {
        '$route'(to, from) {
            if (this.$route.path.indexOf('blog') >= 0) {
                this.isBlog = true;
            }
            console.log('---------------', this.$route);
        }
    }
};
</script>

