<template>
  <div class="hello">
    <h1>Cat cafés near you</h1>
    <city-search v-on:placeSelected="placeSelected"/>
  </div>
</template>

<script>
import CitySearch from './CitySearch'
import GeoServices from '../services/geo'

export default {
  components: {
    'city-search': CitySearch
  },
  data () {
    return {
      city: '',
      value: '',
      options: []
    }
  },
  created () {
    GeoServices.getCurrentPosition().then((position) => {
      console.log('pos', position);
      GeoServices.getLatLong(position);
    });
  },
  methods: {
    placeSelected (place) {
      this.$router.push({
        name: 'Cafes',
        params: { country: place.country, city: place.city }
      })
    }
  }
}
</script>

<style scoped>
  h1{
    font-weight: normal;
    text-align: center;
    margin-top: 0px;
    padding-top: 30px;
  }
</style>
