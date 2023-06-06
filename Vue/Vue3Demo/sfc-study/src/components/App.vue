<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
   -->
   <ElRate v-model="value1">{{ value1 }}</ElRate> 
   <ElRate :max="10" v-model="value2" >{{ value2 }}</ElRate>
   <hr />
   <RefDemo></RefDemo>
   <hr />
   <NextTickDemo></NextTickDemo>
   <hr>
   <DirectiveDemo></DirectiveDemo>
   <hr>
   <GlobalPropertyDemo></GlobalPropertyDemo>
   <hr>
   <MixinsDemo></MixinsDemo>
   <hr>
   <PluginsDemo></PluginsDemo>
   <hr> 
   <ElementPlusDemo></ElementPlusDemo>
   <hr>
   <TransitionDemo></TransitionDemo>
   <hr>
   <ComponentDemo></ComponentDemo>
   <hr>
   <ProvideInjectDemo></ProvideInjectDemo>
   <hr>
   <hr>
   <hr>
   <hr>
   <hr>
   <hr>
   <hr>
   <hr>
   <hr>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ElRate from './ElRate.vue'
import RefDemo from "./01_refs.vue";
import NextTickDemo from './03_nextTick.vue';
import DirectiveDemo from './04_directive.vue';
import GlobalPropertyDemo from './05_globalProperties.vue';
import MixinsDemo from './06_mixins.vue';
import PluginsDemo from './07_plugin.vue';
import ElementPlusDemo from './08_elementPlus.vue';
import TransitionDemo from './09_transition.vue';
import ComponentDemo from './10_component&keepAlive.vue';
import ProvideInjectDemo from './11_provideInject.vue';

export default {
  name: 'App',
  data(){
    return {
      value1: 0,
      value2: 3
    }
  },
  components: {
    // HelloWorld,
    ElRate,
    RefDemo,
    NextTickDemo,
    DirectiveDemo,
    GlobalPropertyDemo,
    MixinsDemo,
    PluginsDemo,
    ElementPlusDemo,
    TransitionDemo,
    ComponentDemo,
    ProvideInjectDemo
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
