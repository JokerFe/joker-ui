<template>
    <div class="full">
        <side-bar />
        <div class="cpts-body">
            <router-view v-if="isRouterAlive" />
            <!-- <j-footer /> -->
        </div>
    </div>
</template>
<script>
import SideBar from '../../components/sideBar'
// import jFooter from '../../components/footer'
export default {
    name: 'Components',
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