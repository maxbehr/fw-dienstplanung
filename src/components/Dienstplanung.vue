<!-- Template -->
<template>
    <div id="dienstplanung">
        <employee-list v-show="isEmployeeListOpen" v-bind:employees="filteredEmployees"></employee-list>
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
            isEmployeeListOpen: false,
            filteredEmployees: []
        }
    },
    watch: {
      isEmployeeListOpen: function(changes) {
        if(changes) {
            // let offset = 20;
            // $('div#employee-list').css({'top': this.employeeListOptions.position.top+offset, 'left': this.employeeListOptions.position.left });
        }
      }
    },
    methods: {
        init: function() {
            this.$store.dispatch('LOAD_CONFIG');
        },
        toggleEmployeeList: function() {
            this.isEmployeeListOpen = !this.isEmployeeListOpen;
            if(this.isEmployeeListOpen) {
                // let pos = { top: event.target.offsetTop, left: event.target.offsetLeft };
                // this.position = pos;
                let vehicle = this.$store.state.lastClickedSeat.vehicle;
                console.log('vehicle', vehicle);
                this.filteredEmployees = this.employees.filter(employee => {
                    return employee.license[vehicle] !== undefined;
                });
            }
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
