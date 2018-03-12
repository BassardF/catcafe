<template>
  <div>
    <span v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating === 0" class="fas fa-star"></i>
      <i v-if="rating && rating === 0.5" class="fas fa-star-half"></i>
      <i v-if="rating && rating >= 1" class="fas fa-star"></i>
    </span>
    <span v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating <= 1" class="fas fa-star"></i>
      <i v-if="rating && rating === 1.5" class="fas fa-star-half"></i>
      <i v-if="rating && rating >= 2" class="fas fa-star"></i>
    </span>
    <span v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating <= 2" class="fas fa-star"></i>
      <i v-if="rating && rating === 2.5" class="fas fa-star-half"></i>
      <i v-if="rating && rating >= 3" class="fas fa-star"></i>
    </span>
    <span v-bind:style="{ marginRight: '-5px' }">
      <i v-if="rating && rating <= 3" class="fas fa-star"></i>
      <i v-if="rating && rating === 3.5" class="fas fa-star-half"></i>
      <i v-if="rating && rating >= 4" class="fas fa-star"></i>
    </span>
    <span>
      <i v-if="rating && rating <= 4" class="fas fa-star"></i>
      <i v-if="rating && rating === 4.5" class="fas fa-star-half"></i>
      <i v-if="rating && rating === 5" class="fas fa-star"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    rating: Number
  }
}
</script>

<style scoped>

</style>
