import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		employees: '',
		vehicles: ''
	},
	actions: {
		LOAD_CONFIG: function ({ commit }) {
            let self = this;
            let uri = 'src/config/config.json';
            axios.get(uri)
                .then(function (response) {
                    commit('SET_CONFIG', { list: response.data });
                })
                .catch(function (error) {

                });
		}
	},
	mutations: {
		SET_CONFIG: (state, { list }) => {
			state.employees = list.employees;
			state.vehicles = list.vehicles;
		}
	},
	getters: {
		getEmployees: state => {
			return state.employees;
		},
		getVehicles: state => {
			return state.vehicles;
		}
	}
	})

export default store