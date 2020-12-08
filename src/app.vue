<template>
    <div class="full">
        <div class="title">
            Joker UI
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>
<style lang="scss" scoped>
.full {
    background-color: black;
    width: 100vw;
    height: 100vh;
    padding: 24px;
    .title {
        color: yellowgreen;
        font-size: 18px;
    }
}
</style>

