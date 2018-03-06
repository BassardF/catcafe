<template>
  <div v-on:click="select" class="cafe-list-unit" v-bind:class="{ 'selected-cafe-list-unit': expanded === cafe.key }">
    <h2>{{ cafe.name }}</h2>
    <div>{{ cafe.address }}</div>
    <div class="inner-info">
      <div>{{ cafe.phone }}</div>
      <div>{{ cafe.email }}</div>
      <div v-if="!!cafe.open">
        from {{ cafe.open.hours[0] }} to {{ cafe.open.hours[1] }}
      </div>
      <div>
        <a :href="cafe.website">See Website</a>
      </div>
      <div class="see-more" v-on:click="showModal">See Details</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CafeListUnit',
  props: {
    cafe: Object,
    expanded: String
  },
  data () {
    return {
    }
  },
  methods: {
    select () {
      this.$emit('select', this.cafe.key)
    },
    showModal () {
      this.$emit('modal', this.cafe.key)
    }
  }
}
</script>

<style scoped>
h2{
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.cafe-list-unit{
  padding: 10px;
  transition: all .5s linear;
  border: solid 1px white;
}
.selected-cafe-list-unit{
  border-color: #3f51b5;
  border-radius: 5px;
}
.inner-info{
  max-height: 0px;
  overflow: hidden;
  transition: max-height .5s linear;
}
.selected-cafe-list-unit .inner-info{
  max-height: 200px!important;
}
.see-more{
  cursor: pointer;
  color: #3f51b5;
  text-align: right;
}
a{
  text-decoration: none;
  color: #3f51b5;
}
</style>
