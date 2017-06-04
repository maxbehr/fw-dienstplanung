global.$ = require('jquery');
global.jQuery = $;

import Vue from 'vue';
var VueResource = require('vue-resource');
Vue.use(VueResource);

import App from './App.vue';

require('./main.js');

new Vue({
  el: '#app',
  render: (h) => h(App)
})
