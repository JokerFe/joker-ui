<template>
    <div id="app">
        <j-nav />
        <router-view></router-view>
    </div>
</template>

<script>
import JNav from './components/nav';
export default {
    name: 'App',
    components: {
        JNav,
    }
};
</script>

