<template>
  <div id="app">
    <HelloWorld msg="Test App"/>
  </div>
</template>

<script>
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld
  }
})

</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body{
  margin: 0 0 0 0;
  background-color: lightgrey;
}
</style>
