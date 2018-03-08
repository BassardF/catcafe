<template>
  <div>
    <div class="flex">
      <div class="left-column">
        <h1>{{ $route.params.city }}, {{ $route.params.country }}</h1>
        <div id="cafe-list-wrapper">
          <city-search v-on:placeSelected="placeSelected"/>
          <div v-for="cafe in cafes" v-bind:key="cafe.key">
            <cafe-list-unit
              :cafe="cafe"
              :geo="geo"
              :expanded="expanded"
              :detailed="detailed"
              v-on:select="selectExpanded"
              v-on:details="showDetailedView"
              v-on:hide="hideDetailedView"/>
          </div>
        </div>
      </div>
      <div class="right-column">
        <div v-show="!detailed || !selectedCafe" id="map-global-wrapper">
          <cafes-map
            :cafes="cafes"
            :geo="geo"
            :expanded="expanded"
            v-on:setmap="setMap"
            v-on:select="selectExpanded"
            v-on:details="showDetailedView"/>
        </div>
        <div v-if="detailed && selectedCafe" id="detailed-global-wrapper">
          <cafe-detailed :map="map" :cafe="selectedCafe" v-on:hide="hideDetailedView"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../services/firebaseInit'
import GeoServices from '../services/geo'
import CafeListUnit from './CafeListUnit'
import CafesMap from './CafesMap'
import CafeDetailed from './CafeDetailed'
import CitySearch from './CitySearch'
import FormatterServices from '../services/formatter'

export default {
  name: 'Cafes',
  components: {
    'cafe-list-unit': CafeListUnit,
    'cafes-map': CafesMap,
    'city-search': CitySearch,
    'cafe-detailed': CafeDetailed
  },
  data () {
    return {
      cafes: [],
      selectedCafe: null,
      expanded: '',
      geo: {},
      detailed: false,
      map: null
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchCafes();
    }
  },
  created () {
    this.fetchGeo();
    this.fetchCafes();
  },
  methods: {
    setMap (map) {
      this.map = map;
    },
    formatCafe (cafe) {
      if (cafe) {
        if (cafe.phone) cafe.phoneFormatted = FormatterServices.formatPhoneNumber(cafe.phone);
        if (cafe.website) cafe.websiteFormatted = FormatterServices.formatWebsite(cafe.website);
      }
      return cafe;
    },
    fetchCafes () {
      let tmpCafes = [];
      db.collection(`countries/${this.$route.params.country}/cities/${this.$route.params.city}/catcafes`).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let docData = this.formatCafe(doc.data());
          tmpCafes.push({
            ...docData,
            key: doc.id
          })
        })
        this.cafes = tmpCafes;
      });
    },
    selectExpanded (key) {
      if (key && this.expanded !== key) {
        this.expanded = key;
        for (var i = 0; i < this.cafes.length; i++) {
          if (this.cafes[i].key === key) this.selectedCafe = this.cafes[i];
        }
      }
    },
    showDetailedView (key) {
      if (key) {
        this.expanded = key;
        this.detailed = true;
        for (var i = 0; i < this.cafes.length; i++) {
          if (this.cafes[i].key === key) this.selectedCafe = this.cafes[i];
        }
      }
    },
    hideDetailedView () {
      this.detailed = false;
      this.selectedCafe = null;
    },
    placeSelected (place) {
      this.$router.push({
        name: 'Cafes',
        params: { country: place.country, city: place.city }
      })
    },
    fetchGeo () {
      GeoServices.getCurrentPosition().then((position) => {
        if (position && position.coords) {
          this.geo = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        }
      }).catch(() => {
        console.log('Geolocalisation unauthorized : silent fail');
      });
    }
  }
}
</script>

<style scoped>
h1{
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: normal;
}
.flex{
  display: flex;
}
.flex-1{
  flex-grow: 1;
}
.flex-2{
  flex-grow: 2;
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
    width: 40%;
  }
  .right-column{
    display: inline-block;
    width: 60%;
  }
}

#map-global-wrapper{
  min-width: 400px;
  max-width: 100%!important;
}
#cafe-list-wrapper {
  padding: 10px;
}
#cafe-list-wrapper > div{
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}
#cafe-list-wrapper > div:nth-child(even){
  background-color: rgb(248, 248, 250);
}
</style>
