<template>
  <div id="topbar">
    <img src="../../../static/logo-cat.svg" v-bind:style="{ width: '40px', verticalAlign: 'middle' }"/>
    <span id="brand" v-on:click="goToMainPage" v-bind:style="{ marginLeft: '20px', verticalAlign: 'middle' }">CAT CAFE NEAR YOU</span>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  methods: {
    goToMainPage () {
      this.$router.push({name: 'Index'})
    }
  }
}
</script>

<style scoped>
#topbar{
  padding: 15px;
  font-size: 20px;
  background-color: #3f51b5;
  color: white;
  letter-spacing: 1px;
}
#brand{
  cursor: pointer;
}
</style>
