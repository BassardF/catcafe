<template>
  <div id="bottom-bar">
    <div class="left-column">
      Contact
    </div>
    <div class="right-column">
      Media
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bottombar'
}
</script>

<style scoped>
#bottom-bar{
  padding: 15px;
  font-size: 20px;
  background-color: #3f51b5;
  color: white;
  letter-spacing: 1px;
}
#brand{
  cursor: pointer;
}
@media (max-width: 768px) {
  .left-column{
    display: none;
  }
  .right-column{
    display: block;
  }
}
@media (min-width: 769px) {
  .left-column{
    display: inline-block;
    width: 50%;
  }
  .right-column{
    display: inline-block;
    width: 49%;
  }
}
</style>
