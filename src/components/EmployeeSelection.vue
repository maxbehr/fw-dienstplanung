<!-- Template -->
<template>
    <div id="employee-selection" v-show="isOpen" @click="close">
        <div id="wrapper">
            <input id="employee-search" type="text" v-model="searchText" autofocus>

            <employee-list v-bind:options="{ heading: 'Verfügbar' }" v-bind:employees="availableEmployees"></employee-list>
            <employee-list v-bind:options="{ heading: 'Eingeteilt' }" v-bind:employees="alreadySeatedEmployees"></employee-list>
            <employee-list v-bind:options="{ heading: 'Nicht anwesend' }" v-bind:employees="notPresentEmployees"></employee-list>

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
            searchText: ''
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
        selectEmployeeForSeat: function(employee) {
            this.$store.commit('SELECT_EMPLOYEE_FOR_SEAT', { employee: employee })
            this.close();
        },
        isAlreadySeated: function(employee) {
            return this.$store.state.vehicles.some(vehicle => {
                return vehicle.seats.some(seat => seat.employee === employee);
            });
        },
        close: function() {
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
        background-color: rgba(0,0,0,0.4)
        position: absolute

        #wrapper
            position: absolute
            margin: 0 auto
            left: 0
            right: 0
            top: 10%
            width: 500px
            border: 1px solid rgba(0,0,0,0.5)
            padding: 5px 10px
            background-color: white
            border-radius: 3px
            box-shadow: 0px 10px 50px rgba(0,0,0,0.2)

            ul.employees
                list-style-type: none
                padding: 5px 10px
                margin: 0

                li
                    font-size: 11px
                    color: black
</style>
