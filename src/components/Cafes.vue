<template>
  <div>
    <div class="flex">
      <div id="left-column">
        <h1>{{ $route.params.city.capitalize() }}, {{ $route.params.country.capitalize() }}</h1>
        <div id="cafe-list-wrapper">
          <city-search v-on:placeSelected="placeSelected"/>
          <div v-for="cafe in cafes" v-bind:key="cafe.key">
            <cafe-list-unit
              :cafe="cafe"
              :expanded="expanded"
              :detailed="detailed"
              v-on:select="selectExpanded"
              v-on:details="showDetailedView"
              v-on:hide="hideDetailedView"/>
          </div>
          <div v-if="loading === false && !cafes.length" class="text-align-center" v-bind:style="{ marginTop: '30px', marginBottom: '30px' }">
            No result available for {{ $route.params.city.capitalize() }}, {{ $route.params.country.capitalize() }}
          </div>
          <button class="button">
            <div class="main">Another Cat cafe?</div>
            <div class="second">share your discovery with us!</div>
          </button>
        </div>
      </div>
      <div id="right-column">
        <div v-show="!detailed || !selectedCafe" id="map-global-wrapper">
          <cafes-map
            :search="$route.params.city+$route.params.country"
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
      map: null,
      loading: true
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
        if (cafe.website) cafe.websiteFormatted = FormatterServices.formatWebsite(cafe.website);
      }
      return cafe;
    },
    fetchCafes () {
      let tmpCafes = [];
      let preSelectedKey = null;
      db.collection(`countries/${this.$route.params.country}/cities/${this.$route.params.city}/catcafes`).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let docData = this.formatCafe(doc.data());
          if (this.$route.params.placeid && this.$route.params.placeid === docData.place_id) preSelectedKey = doc.id;
          tmpCafes.push({
            ...docData,
            key: doc.id
          })
        })
        console.log('tmpCafes', tmpCafes);
        this.cafes = tmpCafes;
        this.loading = false;
        this.reCalculateCafeDistance();
        if (preSelectedKey) this.expanded = preSelectedKey;
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
          this.reCalculateCafeDistance();
        }
      }).catch(() => {
        console.log('Geolocalisation unauthorized : silent fail');
      });
    },
    reCalculateCafeDistance () {
      if (this.cafes && this.geo && this.geo.lat && this.geo.lng) {
        for (var i = 0; i < this.cafes.length; i++) {
          if (this.cafes[i].geo) {
            const distance = GeoServices.calculateDistance(this.geo, {
              lat: this.cafes[i].geo[0],
              lng: this.cafes[i].geo[1]
            });
            this.cafes[i].mathDistance = distance;
            if (distance > 1) this.cafes[i].distance = `${Math.round(distance)} km`;
            else this.cafes[i].distance = `${Math.round(distance * 1000)} m`;
          }
        }
        this.cafes.sort((a, b) => {
          if (!a.mathDistance || !b.mathDistance) return -1;
          return a.mathDistance > b.mathDistance ? 1 : -1;
        });
      }
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
  #left-column{
    display: none;
  }
  #right-column{
    display: block;
  }
}
@media (min-width: 769px) {
  #left-column{
    display: inline-block;
    width: 40%;
    background-color: rgb(250, 250, 250);
  }
  #right-column{
    display: inline-block;
    width: 60%;
  }
}

#map-global-wrapper{
  min-width: 400px;
  max-width: 100%!important;
}
#cafe-list-wrapper {
  padding: 15px;
}
#cafe-list-wrapper > div{
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}
#cafe-list-wrapper > div:nth-child(even){
  background-color: rgb(250, 250, 250);
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
  margin-top: 15px;
  cursor: pointer;
}
.button .main{
  font-size: 16px;
}
.button .second{
  font-size: 13px;
  opacity: .8;
  margin-top: 2px;
}
.text-align-center{
  text-align: center;
}
</style>
