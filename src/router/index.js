import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

// import Donations from '@/components/Donations'
// import Donate from '@/components/Donate'

const Donate = () => import(/* webpackChunkName: "group-foo" */ '@/components/Donate');
const Donations = () => import(/* webpackChunkName: "group-foo" */ '@/components/Donations');

import Edit from '@/components/Edit'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import DMap from '@/components/DMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/donations',
      name: 'Donations',
      component: Donations
    },
    {
      path: '/donate',
      name: 'Donate',
      component: Donate
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/map',
      name: 'Map',
      component: DMap
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    }
  ]
})
