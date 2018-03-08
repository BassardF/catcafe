<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h2>{{ cafe.name }}</h2>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div>{{ cafe.address }}</div>
              <div>{{ cafe.phone }}</div>
              <div>{{ cafe.email }}</div>
              <div v-if="!!cafe.open">
                from {{ cafe.open.hours[0] }} to {{ cafe.open.hours[1] }}
              </div>
              <div>
                <a :href="cafe.website">See Website</a>
              </div>
              <div>{{ cafe.booking }}</div>
              <div>{{ cafe.fee }}</div>
              <div>{{ cafe.cats }}</div>

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

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CafeModal',
  methods: {},
  props: {
    cafe: Object
  },
  mounted () {
    console.log(this.cafe);
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
