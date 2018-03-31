<template>
  <div id="app">
    <topbar/>
    <div id="core-wrapper" v-bind:style="{ minHeight: height + 'px' }">
      <router-view/>
    </div>
    <bottombar/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import Topbar from './components/dumbs/Topbar'
import Bottombar from './components/dumbs/Bottombar'

Vue.use(VueCarousel);
export default {
  name: 'App',
  data () {
    return {
      height: window.innerHeight
    }
  },
  components: { Topbar, Bottombar },
  mounted () {
    const elTB = document.querySelector('#bottom-bar');
    const elBB = document.querySelector('#topbar');
    if (elTB && elBB) {
      // Topbar + Bottombar + core-wrapper padding bottom
      this.height = window.innerHeight - elTB.offsetHeight - elBB.offsetHeight;
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(245, 245, 245);
  font-size: 13px;
}
#core-wrapper {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
body, html{
  margin: 0px;
  height: 100%;
}
.VueCarousel-pagination{
  position: absolute;
  top: 10px;
}
</style>
