<template>
    <div class="wy-xhome">
        <Wy-header></Wy-header>
        <Wy-sidebar></Wy-sidebar>
        <router-view></router-view>
    </div>
</template>

<script>
    import WyHeader from './header.vue';
    import WySidebar from './sidebar.vue';
    import WyFooter from './footer.vue';
    export default {
        data() {
            return {
            }
        },
        components: {
            WyHeader,
            WyFooter,
            WySidebar
        },
        methods: {}
    }
</script>
