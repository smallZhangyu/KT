<template>
   <ReactiveDemo></ReactiveDemo> 
   <hr>
   <LifeCycleDemo></LifeCycleDemo>
   <hr>
   <WatchDemo></WatchDemo>
   <hr>
   <WatchEffectDemo></WatchEffectDemo>
   <hr>
   <ProvideDemo></ProvideDemo>
   <hr>
   <UseCounterDemo></UseCounterDemo>
   <hr>
   <DefinePropsDemo></DefinePropsDemo>
   <hr>
   <hr>
   <hr>
</template>

<script>
import ReactiveDemo from './01_reactive&ref.vue';
import LifeCycleDemo from "./02_lifeCycle.vue";
import WatchDemo from './03_watch.vue';
import WatchEffectDemo from './04_watchEffect.vue';
import ProvideDemo from './05_provide.vue';
import UseCounterDemo from './06_useXXX.vue';
import DefinePropsDemo from './07_defineProps.vue';
// import SearchMusicDemo from './10_searchMusic.vue';
// import TransitionDemo from './09_transition.vue';
// import ComponentDemo from './10_component&keepAlive.vue';
// import ProvideInjectDemo from './11_provideInject.vue';

export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    ReactiveDemo,
    LifeCycleDemo,
    WatchDemo,
    WatchEffectDemo,
    ProvideDemo,
    UseCounterDemo,
    DefinePropsDemo,
    // SearchMusicDemo,
    // TransitionDemo,
    // ComponentDemo,
    // ProvideInjectDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
