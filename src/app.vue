<template>
    <div id="app">
        <Nav v-if="!isBlog" />
        <router-view />
    </div>
</template>

<script>
import Nav from './components/jokerNav';
export default {
    name: 'App',
    components: {
        Nav,
    },
    data() {
        return {
            isBlog: true
        }
    },
    watch: {
        '$route'(to, from) {
            if (this.$route.path.indexOf('blog') >= 0) {
                this.isBlog = true;
            } else {
                this.isBlog = false;
            }
        }
    }
};
</script>

