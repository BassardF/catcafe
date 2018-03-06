<template>
  <div id="app">
    <topbar/>
    <div id="core-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Topbar from './components/Topbar'

export default {
  name: 'App',
  components: { Topbar }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(245, 245, 245);
}
#core-wrapper{
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
body{
  margin: 0px;
}
</style>
