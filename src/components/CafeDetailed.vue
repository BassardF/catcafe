<template>
  <div v-bind:style="{ padding: '20px' }">
    <div class="pointer blue text-align-center"
      v-on:click="$emit('hide')">
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
            <h2 v-if="place && place.rating">{{ place.rating }}/5</h2>
          </div>
        </div>
      </slot>
    </div>

    <div>
      <slot name="body">
        <div class="flex">
          <div class="flex-1">
            <!-- Address -->
            <div v-if="placeDetails && placeDetails.url" v-bind:style="{ marginBottom: '5px' }">
              <i v-bind:style="{ marginLeft: '3px', marginRight: '5px' }"
                 class="fas fa-map-marker-alt v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="placeDetails.url">{{ cafe.address }}</a>
            </div>
            <!-- Contact -->
            <div v-bind:style="{ marginBottom: '5px' }">
              <i v-bind:style="{ marginRight: '5px' }"
                 class="fas fa-phone v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="`tel:${cafe.phone}`">{{ cafe.phoneFormatted }}</a>
            </div>
            <div v-bind:style="{ marginBottom: '5px' }">
              <i v-bind:style="{ marginRight: '5px' }"
                 class="fas fa-at v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="`mailto:${cafe.email}`">{{ cafe.email }}</a>
            </div>
            <!-- Website -->
            <div v-bind:style="{ marginBottom: '5px' }">
              <i v-bind:style="{ marginRight: '5px' }"
                 class="fas fa-link v-align-middle"></i>
              <a target="_blank" class="v-align-middle" :href="cafe.website">{{ cafe.websiteFormatted }}</a>
            </div>
          </div>
          <div class="flex-1 text-align-right">
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
              <div v-bind:key='"open-day-key-"+index' v-for="(day, index) in placeDetails.opening_hours.weekday_text">
                <div>{{ day }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Images -->
        <div v-if="placeDetails && placeDetails.photos" v-bind:style="{ marginTop: '10px' }">
          <carousel :perPage="2" :perPageCustom="[[480, 1], [768, 2]]">
            <slide v-bind:key='"pic-key-"+index' v-for="(pic, index) in placeDetails.photos">
              <div class="text-align-center"><img :src="pic.url"/></div>
            </slide>
          </carousel>
        </div>
        <!-- Details -->
        <div>{{ cafe.booking }}</div>
        <div>{{ cafe.cats }}</div>
        <!-- Social -->
        <div v-if="!!cafe.social">
          <div v-if="!!cafe.social.facebook">
            <a :href="cafe.social.facebook">facebook</a>
          </div>
          <div v-if="!!cafe.social.instagram">
            <a :href="cafe.social.instagram">instagram</a>
          </div>
          <div v-if="!!cafe.social.tripadvisor">
            <a :href="cafe.social.tripadvisor">tripadvisor</a>
          </div>
          <div v-if="!!cafe.social.twitter">
            <a :href="cafe.social.twitter">twitter</a>
          </div>
          <div v-if="!!cafe.social.youtube">
            <a :href="cafe.social.youtube">youtube</a>
          </div>
        </div>
        <!-- Reviews -->
        <div v-if="placeDetails && placeDetails.reviews">
          <carousel :perPage="1">
            <slide v-bind:key='"review-key-"+index' v-for="(review, index) in placeDetails.reviews">
              <div v-if="review.language == 'en'">
                <div class="flex">
                  <div class="flex-1">
                    <h3>{{ review.author_name }}</h3>
                  </div>
                  <div class="flex-1 text-align-right">
                    <h3 v-if="place && place.rating">{{ review.rating }}/5</h3>
                  </div>
                </div>
                <div>{{ review.time }}</div>
                <div>{{ review.text }}</div>
              </div>
            </slide>
          </carousel>
        </div>
      </slot>
    </div>

  </div>
</template>

<script>
import GeoServices from '../services/geo'

export default {
  name: 'CafeDetailed',
  data () {
    return {
      place: {},
      placeDetails: {},
      showSchedule: false
    }
  },
  watch: {
    cafe () {
      this.placeSearch(this.cafe.name);
    }
  },
  created () {
    this.placeSearch(this.cafe.name);
  },
  methods: {
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
          for (var i = 0; i < ans.photos.length; i++) {
            let url = ans.photos[i].getUrl({'maxWidth': 400, 'maxHeight': 400});
            ans.photos[i].url = url;
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
</style>
