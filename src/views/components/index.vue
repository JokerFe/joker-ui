<template>
    <div class="full">
        <side-bar></side-bar>
        <div class="cpts-body">
            <router-view v-if="isRouterAlive"></router-view>
            <!-- <j-footer /> -->
        </div>
    </div>
</template>
<script>
import SideBar from '../../components/sideBar'
// import jFooter from '../../components/footer'
export default {
    name: 'components',
    data() {
        return {
            readMe: '',
            isRouterAlive: true
        }
    },
    components: {
        SideBar,
        // jFooter
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        }
    }
}
</script>