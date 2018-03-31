<template>
  <div v-on:click="select" class="cafe-list-unit pointer">
    <div class="pic-wrapper" v-if="cafe && cafe.photos[0] && cafe.photos[0].url" v-bind:style="{ height: imageHeight + 'px' }">
      <img class="pic" :src="cafe.photos[0].url"/>
    </div>
    <div v-bind:style="{ padding: '10px' }">
      <div>
        {{ cafe.country.capitalize() }}, {{ cafe.city.capitalize() }}
      </div>
      <h2>
        {{ cafe.name }}
      </h2>
      <h2 v-if="cafe.distance">
        <i class="fas fa-location-arrow v-align-middle"
           v-bind:style="{ marginRight: '3px' }"></i>
        <span class="v-align-middle">{{ cafe.distance }}</span>
      </h2>
      <div class="inner-info">
        <div>{{ opening }}</div>
        <div>{{ cafe.email }}</div>
      </div>
      <rating :rating="cafe.rating" :showNumber="true"/>
    </div>
  </div>
</template>

<script>
import Rating from './dumbs/Rating'
export default {
  name: 'FavUnit',
  props: {
    cafe: Object,
    ratio: Number
  },
  mounted () {
    let el = document.querySelector('.single-fav');
    if (el) {
      const totalWidth = el.offsetWidth - 30;
      this.imageHeight = Math.round(totalWidth / this.ratio);
    }
  },
  components: { Rating },
  data () {
    return {
      imageHeight: 0
    }
  },
  computed: {
    opening: function () {
      if (!this.cafe || !this.cafe.opening_hours || !this.cafe.opening_hours.weekday_text) return '';
      const day = new Date().getDay();
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (var i = 0; i < this.cafe.opening_hours.weekday_text.length; i++) {
        if (this.cafe.opening_hours.weekday_text[i].includes(weekdays[day])) {
          return this.cafe.opening_hours.weekday_text[i].replace((weekdays[day] + ':'), '').trim();
        }
      }
    }
  },
  methods: {
    select () {
      this.$router.push({
        name: 'CafesDirect',
        params: {
          country: this.cafe.country,
          city: this.cafe.city,
          placeid: this.cafe.place_id
        }
      })
    }
  }
}
</script>

<style scoped>
h2{
  font-size: 18px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.bold{
  font-weight: bold;
}
.cafe-list-unit{
  transition: all .3s linear;
  font-size: 13px;
}
.inner-info{
  overflow: hidden;
  transition: max-height .5s linear;
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
.text-align-right{
  text-align: right;
}
.pic{
  vertical-align: middle;
  width: 100%;
  height: 100%;
}
.img-helper{
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.pic{
  border-radius: 4px;
}
</style>
