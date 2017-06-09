import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		employees: '',
		vehicles: '',
		seats: '',
		lastClickedSeat: ''
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
			state.seats = list.seats;

            //  Map new properties into employees
            state.employees.forEach(e => e.isPresent = true );

            //  Map new objects for seats
            state.vehicles.forEach(vehicle => {
                vehicle.seats = vehicle.seats.map(seat => ({ id: seat, label: state.seats[seat], employee: null }) );
            });
		},
		SET_LAST_CLICKED_SEAT: (state, payload) => {
			state.lastClickedSeat = payload;
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