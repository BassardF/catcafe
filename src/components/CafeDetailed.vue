<template>
  <div id="cafe-detail-wrapper" v-bind:style="{ padding: '20px', paddingBottom: '100px' }">
    <div class="button" v-on:click="$emit('hide')">
      <i
        v-bind:style="{ marginRight: '3px' }"
        class="fas fa-globe v-align-middle"></i>
      <span class="v-align-middle">back to the map</span>
    </div>
    <div>
      <slot name="header">
        <!-- Name && Rating -->
        <div class="flex">
          <div class="flex-1">
            <h2>{{ cafe.name }}</h2>
          </div>
          <!-- Rating -->
          <div class="flex-1 text-align-right">
            <h2 v-if="place && place.rating">
              <rating :rating="place.rating"/>
            </h2>
          </div>
        </div>
      </slot>
    </div>
    <div>
      <slot name="body">
        <div class="flex">
          <div class="flex-1">
            <!-- Address -->
            <div v-bind:style="{ marginBottom: '5px' }" v-if="placeDetails && placeDetails.url && cafe.address" >
              <i v-bind:style="{ marginLeft: '3px', marginRight: '5px' }"
                 class="fas fa-map-marker-alt v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="placeDetails.url">{{ cafe.address }}</a>
            </div>
            <!-- Contact -->
            <div v-bind:style="{ marginBottom: '5px' }" v-if="cafe.international_phone_number && cafe.formatted_phone_number">
              <i v-bind:style="{ marginRight: '5px' }"
                 class="fas fa-phone v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="`tel:${cafe.international_phone_number}`">{{ cafe.formatted_phone_number }}</a>
            </div>
            <div v-bind:style="{ marginBottom: '5px' }" v-if="cafe.email">
              <i v-bind:style="{ marginRight: '5px' }"
                 class="fas fa-at v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="`mailto:${cafe.email}`">{{ cafe.email }}</a>
            </div>
            <!-- Website -->
            <div v-bind:style="{ marginBottom: '5px' }" v-if="cafe.website && cafe.websiteFormatted">
              <i v-bind:style="{ marginRight: '5px' }"
                 class="fas fa-link v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="cafe.website">{{ cafe.websiteFormatted }}</a>
            </div>
          </div>
          <div class="flex-1 text-align-right">
            <!-- Distance -->
            <div v-if="cafe.distance" v-bind:style="{ marginBottom: '5px' }">
              <i class="fas fa-location-arrow v-align-middle"
                 v-bind:style="{ marginRight: '3px' }"></i>
              <span class="v-align-middle">{{ cafe.distance }}</span>
            </div>
            <!-- Fees -->
            <div v-if="cafe && cafe.fee && cafe.fee.from" v-bind:style="{ marginBottom: '5px' }">
              ${{ cafe.fee.from }} and up
            </div>
            <!-- Opening hours -->
            <div v-if="place && place.opening_hours && place.opening_hours && place.opening_hours.open_now">
              <div>open now</div>
            </div>
            <div v-if="place && place.opening_hours && place.opening_hours && !place.opening_hours.open_now">
              <div>currently close</div>
            </div>
            <div
              v-if="place && place.opening_hours && place.opening_hours"
              class="pointer blue text-align-center"
              v-on:click="showSchedule = !showSchedule"
              v-bind:style="{ fontSize: '12px', display: 'inline-block', width: (place.opening_hours.open_now ? '70px' : '92px') }">
                <div v-if="!showSchedule">show details</div>
                <div v-else>hide details</div>
                <div
                  v-bind:class="[{ 'rotate-180': showSchedule }, 'transform']"
                  v-bind:style="{ marginTop: '-5px' }">
                  <i class="fas fa-caret-down"></i>
                </div>
            </div>
            <div
              v-show="showSchedule"
              v-if="placeDetails && placeDetails.opening_hours && placeDetails.opening_hours.weekday_text"
              v-bind:style="{ fontSize: '12px'}">
              <div v-bind:key='"open-day-key-"+index'
                   v-for="(day, index) in placeDetails.opening_hours.weekday_text">
                <div v-bind:class="boldDay(day)">{{ day }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="cafe.booking || cafe.cats">
          <h3>Details and Social</h3>
          <!-- Details -->
          <div v-if="cafe.booking" v-bind:style="{ marginBottom : '5px' }">
            <i class="fas fa-book v-align-middle" v-bind:style="{ marginRight : '3px' }"></i>
            <span class="v-align-middle">Booking {{ cafe.booking.toLowerCase() }}</span>
          </div>
          <div v-if="cafe.cats && cafe.cats.count">
            <i class="fas fa-paw v-align-middle" v-bind:style="{ marginRight : '3px' }"></i>
            <span class="v-align-middle">{{ cafe.cats.count }} cats</span>
          </div>
        </div>
        <!-- Social -->
        <div v-if="!!cafe.social" class="flex" v-bind:style="{ marginTop: '10px' }">
          <div v-if="!!cafe.social.facebook" class="flex-1 text-align-center">
            <a class="social-name" :href="cafe.social.facebook"><i class="fab fa-3x fa-facebook"></i></a>
          </div>
          <div v-if="!!cafe.social.instagram" class="flex-1 text-align-center">
            <a class="social-name" :href="cafe.social.instagram"><i class="fab fa-3x fa-instagram"></i></a>
          </div>
          <div v-if="!!cafe.social.tripadvisor" class="flex-1 text-align-center">
            <a class="social-name" :href="cafe.social.tripadvisor"><i class="fab fa-3x fa-tripadvisor"></i></a>
          </div>
          <div v-if="!!cafe.social.twitter" class="flex-1 text-align-center">
            <a class="social-name" :href="cafe.social.twitter"><i class="fab fa-3x fa-twitter-square"></i></a>
          </div>
          <div v-if="!!cafe.social.youtube" class="flex-1 text-align-center">
            <a class="social-name" :href="cafe.social.youtube"><i class="fab fa-3x fa-youtube"></i></a>
          </div>
        </div>

        <!-- Images -->
        <h3>Photos</h3>
        <div>
          <div v-if="placeDetails && placeDetails.photos" v-bind:style="{ marginTop: '10px' }">
            <carousel :paginationActiveColor="'#2c3e50'" :paginationColor="'rgb(230, 230, 230)'" :perPage="1" :perPageCustom="[[480, 1], [768, 1]]">
              <slide v-bind:key='"pic-key-"+index' v-for="(pic, index) in placeDetails.photos">
                <div class="text-align-center"><img :src="pic.url"/></div>
              </slide>
            </carousel>
          </div>
        </div>
        <div v-bind:style="{ height: '30px' }"></div>

        <div v-if="placeDetails && placeDetails.reviews && placeDetails.reviews.length">
          <h3>Reviews</h3>
          <!-- Reviews -->
          <div v-bind:key='"review-key-"+index' v-for="(review, index) in placeDetails.reviews">
            <div v-if="index === 0 || showAllReviews">
              <div class="flex">
                <div class="flex-1">
                  <h4>
                    <span>{{ review.author_name }}</span>
                    <span v-bind:style="{ marginLeft: '5px', opacity: .8, fontSize: '12px' }">{{ review.timeFormatted }}</span>
                  </h4>
                </div>
                <div class="flex-1 text-align-right">
                  <h4 v-if="place && place.rating">
                    <rating :rating="review.rating"/>
                  </h4>
                </div>
              </div>
              <div>{{ review.text }}</div>
            </div>
          </div>

          <div v-if="placeDetails.reviews && placeDetails.reviews.length > 1 && !showAllReviews" class="button" v-on:click="showAllReviews = true">
            <i
              v-bind:style="{ marginRight: '3px' }"
              class="fas fa-plus v-align-middle"></i>
            <span class="v-align-middle">show more reviews</span>
          </div>

        </div>
      </slot>
    </div>

  </div>
</template>

<script>
import GeoServices from '../services/geo'
import FormatterServices from '../services/formatter'
import Rating from './dumbs/Rating'

export default {
  name: 'CafeDetailed',
  components: { Rating },
  data () {
    return {
      place: {},
      placeDetails: {},
      showSchedule: false,
      dayIndex: 0,
      showAllReviews: false
    }
  },
  watch: {
    cafe () {
      this.placeSearch(this.cafe.name);
    }
  },
  created () {
    this.placeSearch(this.cafe.name);
    this.dayIndex = new Date().getDay();
  },
  methods: {
    boldDay (key) {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return {
        bold: key && weekdays && key.includes(weekdays[this.dayIndex])
      };
    },
    placeSearch (query) {
      GeoServices.placeSearch(this.map, query).then((ans) => {
        if (ans && ans.place_id) this.placeDetailsSearch(ans.place_id);
        this.place = ans;
      }).catch(() => {
        console.log('Place query: silent fail');
      });
    },
    placeDetailsSearch (placeId) {
      GeoServices.detailedPlaceSearch(this.map, placeId).then((ans) => {
        if (ans.photos) {
          for (let i = 0; i < ans.photos.length; i++) {
            let url = ans.photos[i].getUrl({'maxWidth': 420, 'maxHeight': 250});
            ans.photos[i].url = url;
          }
        }
        if (ans.reviews) {
          for (let i = 0; i < ans.reviews.length; i++) {
            if (ans.reviews[i].time) ans.reviews[i].timeFormatted = FormatterServices.formatDate(ans.reviews[i].time);
          }
        }
        this.placeDetails = ans;
      }).catch((err) => {
        console.log('Detailed place query: silent fail', err);
      });
    }
  },
  props: {
    cafe: Object,
    map: Object
  }
}
</script>

<style scoped>
h2{
  font-weight: normal;
  border-bottom: solid 1px #3f51b5;
}
h3{
  font-weight: normal;
  padding: 10px 20px;
  background-color: rgb(250, 250, 250);
  margin-left: -20px;
  margin-right: -20px;
}
h4{
  font-weight: normal;
  border-bottom: solid 1px #3f51b5;
}
.flex{
  display: flex;
}
.flex-1{
  flex-grow: 1;
}
.text-align-center{
  text-align: center;
}
.text-align-right{
  text-align: right;
}
.v-align-middle{
  vertical-align: middle;
}
.pointer{
  cursor: pointer;
}
.blue{
  color: #3f51b5;
}
.rotate-180{
  transform: rotate(180deg);
}
.transform{
  transition: all .2s linear;
}
a{
  text-decoration: none;
  color: #3f51b5;
}
.social-name{
  font-size: 12px
}
.bold{
  font-weight: bold;
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
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
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
