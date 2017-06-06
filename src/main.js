global.$ = require('jquery');
global.jQuery = $;


import Vue from 'vue';
var VueResource = require('vue-resource');
Vue.use(VueResource);

import Vuex from 'vuex';
Vue.use(Vuex);

import App from './App.vue';
import store from './store/store.js';

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
