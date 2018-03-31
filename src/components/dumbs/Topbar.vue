<template>
  <div id="topbar" v-bind:style="{backgroundColor: bcg}">
    <img src="../../../static/logo-cat.svg" v-bind:style="{ width: '40px', verticalAlign: 'middle' }"/>
    <span id="brand" v-on:click="goToMainPage" v-bind:style="{ marginLeft: '20px', verticalAlign: 'middle' }">CAT CAFE NEAR ME</span>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  data () {
    return {
      bcg: 'transparent'
    }
  },
  mounted () {
    this.checkRoute();
  },
  methods: {
    goToMainPage () {
      this.$router.push({name: 'Index'})
    },
    checkRoute () {
      this.bcg = this.$route && this.$route.name === 'Index' ? 'transparent' : '#3f51b5';
    }
  },
  watch: {
    $route () {
      this.checkRoute();
    }
  }
}
</script>

<style scoped>
#topbar{
  padding: 15px;
  font-size: 20px;
  color: white;
  letter-spacing: 1px;
}
#brand{
  cursor: pointer;
}
</style>
