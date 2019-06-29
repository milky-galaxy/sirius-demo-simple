<template>
    <div class="wy-xhome">
        <Wy-header></Wy-header>
        <router-view></router-view>
        <!--<Wy-footer></Wy-footer>-->
    </div>
</template>

<script>
    import WyHeader from './header.vue';
    import WyFooter from './footer.vue';
    export default {
        data() {
            return {
            }
        },
        components: {
            WyHeader,
            WyFooter
        },
        methods: {}
    }
</script>
