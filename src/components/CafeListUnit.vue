<template>
  <div v-on:click="select" class="cafe-list-unit" v-bind:class="{ 'selected-cafe-list-unit': expanded === cafe.key }">
    <h2>{{ cafe.name }}</h2>
    <div>{{ cafe.address }}</div>
    <div>{{ distance }}</div>
    <div class="inner-info">
      <div>{{ cafe.phoneFormatted }}</div>
      <div>{{ cafe.email }}</div>
      <div v-if="!!cafe.open">
        from {{ cafe.open.hours[0] }} to {{ cafe.open.hours[1] }}
      </div>
      <div class="flex">
        <div class="flex-1 blue">
          <i v-bind:style="{ marginRight: '3px' }"
             class="fas fa-link v-align-middle"></i>
          <a target="_blank" class="v-align-middle" :href="cafe.website">{{ cafe.websiteFormatted }}</a>
        </div>
        <div class="flex-1">
          <div v-show="!detailed" class="see-more" v-on:click="showDetails">
            <i class="fas fa-info v-align-middle"
               v-bind:style="{ marginRight: '3px' }"></i>
            <span class="v-align-middle">See Details</span>
          </div>
          <div v-show="detailed" class="see-more" v-on:click="hideDetails">
            <i class="fas fa-globe v-align-middle"
               v-bind:style="{ marginRight: '3px' }"></i>
            <span class="v-align-middle">back to the map</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeoServices from '../services/geo'

export default {
  name: 'CafeListUnit',
  props: {
    cafe: Object,
    expanded: String,
    geo: Object,
    detailed: Boolean
  },
  data () {
    return {
      distance: null
    }
  },
  watch: {
    geo () {
      if (this.cafe && this.cafe.geo && this.geo && this.geo.lat && this.geo.lng) {
        const distance = GeoServices.calculateDistance(this.geo, {
          lat: this.cafe.geo[0],
          lng: this.cafe.geo[1]
        });
        if (distance > 1) this.distance = `${Math.round(distance)} km`;
        else this.distance = `${Math.round(distance * 1000)} m`;
      }
    }
  },
  methods: {
    select () {
      this.$emit('select', this.cafe.key)
    },
    showDetails () {
      this.$emit('details', this.cafe.key)
    },
    hideDetails () {
      this.$emit('hide')
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
.blue{
  color: #3f51b5;
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
.v-align-middle{
  vertical-align: middle;
}
.pointer{
  cursor: pointer;
}
.flex{
  display: flex;
}
.flex-1{
  flex-grow: 1;
}
</style>
