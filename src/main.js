import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  VueResource,
  render: h => h(App)
}).$mount('#app')
