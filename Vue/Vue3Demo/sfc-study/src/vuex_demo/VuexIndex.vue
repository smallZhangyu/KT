<template>
    <div style="margin-top: 50px;">
        Hello Vuex Index, {{ count }}, {{ doubleCount }}
        <!-- <button @click="handleClick">Click Add count</button> -->
        <!-- mapActions 的click事件触发 -->
        <button @click="change(6)">Click Add count</button>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    export default {
        name: 'VuexIndex',
        methods: {
            // handleClick(){
            //     // mutations 的触发方式commit
            //     // this.$store.commit('change');

            //     // actions 的触发方式 dispatch
            //     this.$store.dispatch('change', 5);
            // }
            ...mapActions(['change'])
        },
        computed: {
            // count() {
            //     return this.$store.state.count;
            // },
            // doubleCount(){
            //     return this.$store.getters.doubleCount
            // }
            ...mapState(['count']),
            ...mapGetters(['doubleCount'])
        }
    }
</script>

<style scoped>

</style>