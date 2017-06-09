<!-- Template -->
<template>
    <div id="employee-selection" v-show="isOpen">
        <div id="wrapper">
            <input id="employee-search" type="text" v-model="searchText" autofocus>

            <employee-list @list-selection="setPreselected" v-bind:options="{ heading: 'Verfügbar', isOpen: true, limit: 1 }" v-bind:employees="availableEmployees"></employee-list>
            <employee-list v-bind:options="{ heading: 'Eingeteilt', isOpen: true }" v-bind:employees="alreadySeatedEmployees"></employee-list>
            <employee-list v-bind:options="{ heading: 'Nicht anwesend', isOpen: true }" v-bind:employees="notPresentEmployees"></employee-list>

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
            padding: 15px 10px
            background-color: white
            border-radius: 5px
            box-shadow: 0px 10px 50px rgba(0,0,0,0.2)

</style>
