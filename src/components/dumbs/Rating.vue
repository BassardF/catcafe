<template>
  <div>
    <span class="v-align-middle" v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating === 0" class="fas fa-star"></i>
      <i v-if="rating && rating === 0.5" class="fas fa-star-half"></i>
      <i v-if="rating && rating >= 1" class="fas fa-star"></i>
    </span>
    <span class="v-align-middle" v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating <= 1" class="far fa-star"></i>
      <i v-if="rating && rating > 1 && rating < 2" class="fas fa-star-half"></i>
      <i v-if="rating && rating > 1 && rating < 2" class="far fa-star" v-bind:style="{ marginLeft: large ? '-34px' : '-18px' }"></i>
      <i v-if="rating && rating >= 2" class="fas fa-star"></i>
    </span>
    <span class="v-align-middle" v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating <= 2" class="far fa-star"></i>
      <i v-if="rating && rating > 2 && rating < 3" class="fas fa-star-half"></i>
      <i v-if="rating && rating > 2 && rating < 3" class="far fa-star" v-bind:style="{ marginLeft: large ? '-34px' : '-18px' }"></i>
      <i v-if="rating && rating >= 3" class="fas fa-star"></i>
    </span>
    <span class="v-align-middle" v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating <= 3" class="far fa-star"></i>
      <i v-if="rating && rating > 3 && rating < 4" class="fas fa-star-half"></i>
      <i v-if="rating && rating > 3 && rating < 4" class="far fa-star" v-bind:style="{ marginLeft: large ? '-34px' : '-18px' }"></i>
      <i v-if="rating && rating >= 4" class="fas fa-star"></i>
    </span>
    <span class="v-align-middle">
      <i v-if="rating && rating <= 4" class="far fa-star"></i>
      <i v-if="rating && rating > 4 && rating < 5" class="fas fa-star-half"></i>
      <i v-if="rating && rating > 4 && rating < 5" class="far fa-star" v-bind:style="{ marginLeft: large ? '-34px' : '-18px' }"></i>
      <i v-if="rating && rating === 5" class="fas fa-star"></i>
    </span>
    <span class="v-align-middle" v-if="showNumber">
      ({{ rating }})
    </span>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    rating: Number,
    showNumber: Boolean,
    large: Boolean
  }
}
</script>

<style scoped>
  .v-align-middle{
    vertical-align: middle;
  }
</style>
