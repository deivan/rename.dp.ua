import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Api from './views/Api.vue'
import About from './views/About.vue'
import AreaTable from './views/AreaTable.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/api',
      name: 'api',
      component: Api
    },
    {
      path: '/proproekt',
      name: 'proproekt',
      component: About
    },
    {
      path: '/and',
      name: 'areaAND',
      component: AreaTable,
      props: { area: 'r61' }
    },
    {
      path: '/shevchenkivskiy',
      name: 'areaSevchenkivsiy',
      component: AreaTable,
      props: { area: 'r62' }
    },
    {
      path: '/soborniy',
      name: 'areaASoborniy',
      component: AreaTable,
      props: { area: 'r63' }
    },
    {
      path: '/industrialniy',
      name: 'areaIndustrialniy',
      component: AreaTable,
      props: { area: 'r64' }
    },
    {
      path: '/tsentralniy',
      name: 'areaTsentralniy',
      component: AreaTable,
      props: { area: 'r65' }
    },
    {
      path: '/chechelevskiy',
      name: 'areaChechelevskiy',
      component: AreaTable,
      props: { area: 'r66' }
    },
    {
      path: '/novokodatskiy',
      name: 'areaNovokodatskiy',
      component: AreaTable,
      props: { area: 'r67' }
    },
    {
      path: '/samarskiy',
      name: 'areaSamarskiy',
      component: AreaTable,
      props: { area: 'r68' }
    }
  ]
})
