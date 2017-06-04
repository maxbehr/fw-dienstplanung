import Vue from 'vue'
import Dienstplanung from '../../src/components/Dienstplanung.vue'

describe('Dienstplanung.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Dienstplanung)
    })
    expect(vm.$el.querySelector('h1').textContent).toBe('Feuerwehr Dienstplanung')
  })
})