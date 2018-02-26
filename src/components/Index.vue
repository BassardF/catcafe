<template>
  <div class="hello">
    <h1>Cat cafés near you</h1>
    <div id="center-wrap">
      <multiselect
        v-model="value"
        :options="options"
        :searchable="true"
        @search-change="changeInput"
        placeholder="City">
      </multiselect>
    </div>

  </div>
</template>

<script>
import FetchServices from '../services/fetch'
import Multiselect from 'vue-multiselect'

export default {
  name: 'HelloWorld',
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
    }
  }
}
</script>

<style scoped>
  h1{
    font-weight: normal;
  }
  #center-wrap{
    margin-left: auto;
    margin-right: auto;
    width: 600px;
    max-width: 95%;
  }
</style>
