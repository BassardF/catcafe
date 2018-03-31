<template>
  <div class="outer-carousel">

    <div v-if="photos && photos.length">
      <button class="see-more-button" v-on:click="show = true">
        <i v-bind:style="{ marginRight: '3px' }" class="v-align-middle far fa-images"></i>
        <span class="v-align-middle">More photos</span>
      </button>
      <img class="main-pic" :src="photos[selectHigherIndex].url"/>
    </div>

    <div v-if="show" class="full-page-modal-overlay"></div>
    <div v-if="show" class="full-page-modal-images" v-on:click="show = true">
      <carousel :perPage="1" :navigationEnabled="true" paginationColor="white">
        <slide class="slide" v-bind:style="{ maxHeight: windowHeight + 'px' }"  v-for="(img, index) in photos" v-bind:key="`key-modal-img${index}`">
          <span class="single-image-helper"></span>
          <img class="modal-pic" :src="img.url"/>
        </slide>
      </carousel>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FullPageCarousel',
  props: {
    photos: Array
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    show () {
      let el = document.getElementById('app');
      if (el && this.show) el.style.overflow = 'hidden';
      if (el && !this.show) el.style.overflow = 'auto';
    }
  },
  computed: {
    windowHeight () {
      console.log('computed', window.innerHeight);
      return window.innerHeight;
    },
    selectHigherIndex () {
      let maxRatio = 0;
      let mrIndex = 0;
      if (this.photos) {
        for (let i = 0; i < this.photos.length; i++) {
          const ratio = this.photos[i].width / this.photos[i].height;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mrIndex = i;
          }
        }
      }
      return mrIndex;
    }
  }
}
</script>

<style scoped>
  .v-align-middle{
    vertical-align: middle;
  }
  .slide{
    text-align: center;
  }
  .main-pic{
    max-width: 100%;
    position: relative;
  }
  .modal-pic{
    max-width: 80%;
    max-height: 80%;
    vertical-align: middle;
    display: inline-block;
  }
  .see-more-button{
    cursor: pointer;
    border: none;
    float: right;
    position: relative;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: -40px;
    z-index: 300;
    top: 15px;
    right: 20px;
    background-color: white;
  }
  .full-page-modal-overlay{
    width: 100%;
    height: 100%;
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000;
    opacity: .7;
  }
  .single-image-helper{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .full-page-modal-images{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000005;
  }
</style>
