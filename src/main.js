import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import vuetify from './plugins/vuetify'

//Vue.use(Vuetify)
Vue.use(VueResource)

const app = new Vue({
  el: '#app',
  router,
  Vuetify,
  vuetify,
  render: h => h(App)
})