<template>
  <div>
    <div class="flex">
      <div v-for="cafe in cafes" v-bind:key="'modal-' + cafe.key">
        <cafe-modal :cafe="cafe" v-if="showModal === cafe.key" @close="showModal = ''"/>
      </div>
      <div class="flex-1 hidden-xs">
        <h1>{{ $route.params.city }}, {{ $route.params.country }}</h1>
        <div id="cafe-list-wrapper">
          <city-search v-on:placeSelected="placeSelected"/>
          <div v-for="cafe in cafes" v-bind:key="cafe.key">
            <cafe-list-unit :cafe="cafe" :expanded="expanded" v-on:select="selectExpanded" v-on:modal="showModalKey"/>
          </div>
        </div>
      </div>
      <div class="flex-2">
        <div id="map-global-wrapper">
          <cafes-map :cafes="cafes" :expanded="expanded" v-on:select="selectExpanded" v-on:modal="showModalKey"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import CafeListUnit from './CafeListUnit'
import CafesMap from './CafesMap'
import CitySearch from './CitySearch'
import CafeModal from './CafeModal'

export default {
  name: 'Cafes',
  components: {
    'cafe-list-unit': CafeListUnit,
    'cafes-map': CafesMap,
    'city-search': CitySearch,
    'cafe-modal': CafeModal
  },
  data () {
    return {
      cafes: [],
      expanded: '',
      showModal: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchCafes();
    }
  },
  created () {
    this.fetchCafes();
  },
  methods: {
    fetchCafes () {
      let tmpCafes = [];
      db.collection(`countries/${this.$route.params.country}/cities/${this.$route.params.city}/catcafes`).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tmpCafes.push({
            ...doc.data(),
            key: doc.id
          })
        })
        this.cafes = tmpCafes;
      });
    },
    selectExpanded (key) {
      if (key && this.expanded !== key) this.expanded = key;
    },
    showModalKey (key) {
      if (key && this.showModal !== key) this.showModal = key;
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
  .hidden-xs{
    display: none;
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
