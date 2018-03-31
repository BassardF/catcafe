<template>
  <div id="bottom-bar">
    <div class="left-column">
      Contact
      <div class="subs">
        <div>- Contact us directly <a href="https://goo.gl/forms/farvIl0B9uoi89GH2" target="_blank">here</a></div>
        <div>- Send us an email <a href="mailto:f.bassard@gmail.com,j.huguet9@gmail.com" target="_blank">here</a></div>
        <div>- Shares a discovery with us <a href="https://goo.gl/forms/dceEOK9lgOPk8cqN2" target="_blank">here</a></div>
      </div>
    </div>
    <div class="right-column">
      Media
      <div class="subs">
        <div>- Awesome cat pictures <a href="https://tumbler-of-cats.tumblr.com/" target="_blank">here</a></div>
        <div>- Daily cat news <a href="https://worldcatnews.tumblr.com/" target="_blank">here</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bottombar'
}
</script>

<style scoped>
a, .as-a{
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}
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
    vertical-align: top;
  }
  .right-column{
    display: inline-block;
    width: 49%;
    vertical-align: top;
  }
}
.subs{
  opacity: .8;
  font-size: 13px;
  padding-left: 15px;
}
.subs > div{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
