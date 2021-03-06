<!-- Template -->
<template>
    <div id="employee-selection" v-show="isOpen">
        <div id="wrapper">
            <p>Folgende Mitarbeiter sind berechtigt, auf dem <span class="bold hint" v-text="vehicleLabel"></span> als <span class="bold hint" v-text="seatLabel"></span> zu fahren</p>

            <input id="employee-search" type="text" v-model="searchText" placeholder="Mitarbeiter suchen..." autofocus>

            <div class="row">
                <div class="column column-33">
                    <employee-list @list-selection="setPreselected" v-bind:options="{ heading: 'Verfügbar', isOpen: true }" v-bind:employees="availableEmployees"></employee-list>
                </div>
                <div class="column column-33">
                    <employee-list v-bind:options="{ heading: 'Eingeteilt', isOpen: true }" v-bind:employees="alreadySeatedEmployees"></employee-list>
                </div>
                <div class="column column-33">
                    <employee-list v-bind:options="{ heading: 'Nicht anwesend', isOpen: true, limit: 0 }" v-bind:employees="notPresentEmployees"></employee-list>
                </div>
            </div>

            <div class="row">
                <div class="column column-100 center">
                    <a class="button button" @click="btnSubmit">Ok</a>
                    <a class="button button-outline" @click="btnCancel">Abbrechen</a>
                </div>
            </div>


        </div>
    </div>
</template>

<!-- Script -->
<script>
import EmployeeList from './EmployeeList.vue';

export default {
    name: 'employeeSelection',
    data: function(){
        return {
            searchText: '',
            preselected: []
        }
    },
    props: [
        'employees',
        'options'
    ],
    computed: {
        availableEmployees: function() {
            return this.employees &&
                this.employees.filter(e => e.isPresent && !this.isAlreadySeated(e)).filter(this.searchFilter);
        },
        alreadySeatedEmployees: function() {
            return this.employees &&
                this.employees.filter(e => e.isPresent && this.isAlreadySeated(e)).filter(this.searchFilter);
        },
        notPresentEmployees: function() {
            return this.employees &&
                this.employees.filter(e => !e.isPresent).filter(this.searchFilter);
        },
        seatLabel: function() {
            if(this.$store.getters.getLastClickedSeat !== undefined && this.$store.getters.getLastClickedSeat !== '') {
                return this.$store.getters.getLastClickedSeat.seat.label;
            } else {
                return '';
            }
        },
        vehicleLabel: function() {
            if(this.$store.getters.getLastClickedSeat !== undefined && this.$store.getters.getLastClickedSeat !== '') {
                return this.$store.getters.getLastClickedSeat.vehicle;
            } else {
                return '';
            }
        },
        isOpen: function() {
            return this.options && this.options.isOpen;
        }
    },
    methods: {
        init: function() {
            var self = this;

        },
        searchFilter: function(e) {
            let fn = e.firstName.toLowerCase();
            let ln = e.lastName.toLowerCase();
            let st = this.searchText.toLowerCase();

            return fn.includes(st) || ln.includes(st);
        },
        isAlreadySeated: function(employee) {
            return this.$store.state.vehicles.some(vehicle => {
                return vehicle.seats.some(seat => seat.employee === employee);
            });
        },
        setPreselected: function(event) {
            this.preselected = event.preselection;
        },
        btnSubmit: function() {
            console.log('btnSubmit', this.preselected[0]);
            this.$store.commit('SELECT_EMPLOYEE_FOR_SEAT', { employee: this.preselected[0] })
            this.$emit('close');
        },
        btnCancel: function() {
            this.$emit('close');
        }
    },
    components: {
        'employee-list': EmployeeList
    }
}
</script>

<!-- Style -->
<style lang="stylus" >
    #employee-selection
        width: 100%
        height: 100%

        #wrapper
            z-index: 1000
            position: absolute
            margin: 0 auto
            left: 0
            right: 0
            top: 10%
            width: 500px
            border: 1px solid rgba(0,0,0,0.2)
            padding: 15px 10px
            background-color: white
            border-radius: 5px
            box-shadow: 0px 10px 50px rgba(0,0,0,0.5)

            p
                font-size: 1.4rem

            .hint
                color: #c06c84

</style>
