global.$ = require('jquery');
global.jQuery = $;

import Vue from 'vue'
import App from './App.vue'

require('./main.js');

new Vue({
  el: '#app',
  render: (h) => h(App)
})
