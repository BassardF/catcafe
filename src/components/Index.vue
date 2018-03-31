<template>
  <div class="hello">
    <div class="first-section">
      <h1>Looking for a nice café with felin friends ?</h1>
      <div class="place-search-wrapper">
        <city-search v-on:placeSelected="placeSelected"/>
      </div>
    </div>
    <h3>
      <span>Featured</span>
    </h3>
    <div v-if="favs" class="fav-wrapper">
      <div class="single-fav" v-for="fav in favs" v-bind:key="fav.key">
        <fav-unit :ratio="smallerRatio" :cafe="fav"/>
      </div>
    </div>
  </div>
</template>

<script>
import CitySearch from './CitySearch'
import GeoServices from '../services/geo'
import db from '../services/firebaseInit'
import FavUnit from './FavUnit'

export default {
  components: {
    'city-search': CitySearch,
    'fav-unit': FavUnit
  },
  data () {
    return {
      city: '',
      value: '',
      fetchedCountry: '',
      fetchedCity: '',
      options: [],
      favs: [],
      loadingFavs: false,
      smallerRatio: 0
    }
  },
  created () {
    GeoServices.getCurrentPosition().then((position) => {
      GeoServices.getLatLong(position).then((place) => {
        this.fetchedCountry = place.country;
        this.fetchedCity = place.city;
        if (position && position.coords) {
          this.geo = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        }
      }).catch(() => {
        console.log('Google invert geolocation : silent fail');
      });
    }).catch(() => {
      console.log('Geolocalisation unauthorized : silent fail');
    });
    this.fetchFavs();
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
    },
    fetchFavs () {
      let tmpCafes = [];
      this.loadingFavs = true;
      let smallerRatioTmp = Infinity;
      db.collection(`fav`).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let docData = doc.data();
          const photos = docData.photos;
          if (photos && photos[0] && photos[0].ratio && photos[0].ratio < smallerRatioTmp) smallerRatioTmp = photos[0].ratio;
          tmpCafes.push({
            ...docData,
            key: doc.id
          })
        })
        console.log('favs', smallerRatioTmp, tmpCafes);
        this.smallerRatio = smallerRatioTmp;
        this.favs = tmpCafes;
        this.loadingFavs = false;
      });
    }
  }
}
</script>

<style scoped>
  h1{
    font-weight: normal;
    text-align: center;
    margin-top: 0px;
    padding-top: 200px;
    padding-bottom: 0px;
    color: white;
  }
  h3{
    font-size: 25px;
    padding-left: 25px;
    margin-top: 50px;
    margin-bottom: 0px;
  }
  .button {
    background-color: rgb(250, 250, 250);
    border: solid 1px rgb(220, 220, 220);
    border-radius: 5px;
    padding: 10px 20px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: 0px;
    margin-bottom: 0px;
    cursor: pointer;
    text-align: center;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    transition: all .3s linear;
  }
  .button:hover{
    border: solid 1px #3f51b5;
  }
  @media (max-width: 768px) {
    .single-fav{
      display: block;
      padding: 5px;
    }
  }
  @media (min-width: 769px) {
    .single-fav{
      display: inline-block;
      width: 25%;
      padding: 5px;
    }
  }
  .fav-wrapper{
    padding: 20px;

  }
  .first-section{
    margin-top: -70px;
    padding-bottom: 120px;
    background: url("../../static/cat-bcg.jpg");
    background-size: 100% auto;
    background-position: center center;
  }
  .place-search-wrapper{
    max-width: 590px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
