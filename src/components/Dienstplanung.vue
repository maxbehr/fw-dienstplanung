<!-- Template -->
<template>
    <div id="dienstplanung">
        <employee-list v-show="employeeListOptions.isEmployeeListOpen" v-bind:options="employeeListOptions" v-on:selectEmployeeForSeat="selectEmployeeForSeat"></employee-list>
        <h1 v-text="heading"></h1>

        <ul>
            <li v-for="employee in employees">
                <span v-text="employee.firstName"></span>
                <span v-text="employee.lastName"></span>
                <span v-text="employee.license.HLF"></span>
            </li>
        </ul>

        <vehicle v-on:toggleEmployeeList="toggleEmployeeList" v-for="vehicle in vehicles" v-bind:name="vehicle.name" v-bind:seats="vehicle.seats"></vehicle>
    </div>
</template>

<!-- Script -->
<script>
import axios from 'axios';
import Vehicle from './Vehicle.vue';
import EmployeeList from './EmployeeList.vue';

export default {
    name: 'dienstplanung',
    data: function(){
        return {
            heading: 'Feuerwehr Dienstplanung',
            employeeListOptions: {
                isEmployeeListOpen: true,
                position: ''
            }
        }
    },
    watch: {
      'employeeListOptions.isEmployeeListOpen': function(changes) {
        if(changes) {
            let offset = 20;
            $('div#employee-list').css({'top': this.employeeListOptions.position.top+offset, 'left': this.employeeListOptions.position.left });
        }
      }
    },
    methods: {
        init: function() {
            this.$store.dispatch('LOAD_CONFIG');
        },
        toggleEmployeeList: function(customClickEvent) {
            console.log('clicked seat', customClickEvent);
            let event = customClickEvent.event;

            this.employeeListOptions.isEmployeeListOpen = !this.employeeListOptions.isEmployeeListOpen;
            if(event && this.employeeListOptions.isEmployeeListOpen) {
                let pos = { top: event.target.offsetTop, left: event.target.offsetLeft };
                this.employeeListOptions.position = pos;
                this.employeeListOptions.employees = this.employeeListOptions.employees.filter(employee => {
                    return employee.license[customClickEvent.vehicle] !== undefined;
                });
            }
        },
        selectEmployeeForSeat: function(employee) {
            console.log('event', employee);
        }
    },
    computed: {
        employees: function() {
            return this.$store.state.employees;
        },
        vehicles: function() {
            return this.$store.state.vehicles;
        }
    },
    created: function() {
        this.init();
    },
    mounted: function () {
    },
    components: {
        'vehicle': Vehicle,
        'employee-list': EmployeeList
    }
}
</script>

<!-- Style -->
<style scoped>

</style>
