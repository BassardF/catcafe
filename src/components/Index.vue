<template>
  <div class="hello">
    <h1>Cat cafés near you</h1>
    <city-search v-on:placeSelected="placeSelected"/>
    <div class="button" v-if="fetchedCountry && fetchedCity" v-on:click="goToFetchedLocation">
      <i
        v-bind:style="{ marginRight: '3px' }"
        class="fas fa-globe v-align-middle"></i>
      <span class="v-align-middle">in {{ fetchedCountry }} {{ fetchedCity }} ?</span>
    </div>
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
      fetchedCountry: '',
      fetchedCity: '',
      options: []
    }
  },
  created () {
    GeoServices.getCurrentPosition().then((position) => {
      GeoServices.getLatLong(position).then((place) => {
        this.fetchedCountry = place.country;
        this.fetchedCity = place.city;
      }).catch(() => {
        console.log('Google invert geolocation : silent fail');
      });
    }).catch(() => {
      console.log('Geolocalisation unauthorized : silent fail');
    });
  },
  methods: {
    goToFetchedLocation () {
      this.placeSelected({
        country: this.fetchedCountry.toLowerCase().split(' ').join('-'),
        city: this.fetchedCity.toLowerCase().split(' ').join('-')
      });
    },
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
  .button {
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    text-align: center;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .button .main{
    font-size: 16px;
  }
  .button .second{
    font-size: 13px;
    opacity: .8;
    margin-top: 2px;
  }
</style>
