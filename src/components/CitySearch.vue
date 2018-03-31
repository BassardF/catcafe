<template>
  <div>
    <div id="center-wrap">
      <multiselect
        v-model="value"
        :options="options"
        :searchable="true"
        @search-change="changeInput"
        @input="inputSelected"
        placeholder="City">
      </multiselect>
    </div>

  </div>
</template>

<script>
import FetchServices from '../services/fetch'
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data () {
    return {
      city: '',
      value: '',
      options: []
    }
  },
  methods: {
    changeInput (label) {
      FetchServices.fetchCities(label).then(x => {
        this.options = x
      })
    },
    inputSelected (label) {
      const split = label.split(', ')
      if (split[0] && split[2]) {
        const country = split[2].toLowerCase().split(' ').join('-')
        const city = split[0].toLowerCase().split(' ').join('-')
        this.$emit('placeSelected', { country: country, city: city })
      }
    }
  }
}
</script>

<style scoped>
  #center-wrap{
    margin-left: auto;
    margin-right: auto;
  }
</style>
