<!-- Template -->
<template>
    <div id="dienstplanung">
        <employee-list @close="toggleEmployeeList()" v-bind:options="employeeList.options" v-bind:employees="filteredEmployees"></employee-list>
        <h1 v-text="heading"></h1>

        <employee-table v-bind:employees="employees"></employee-table>

        <vehicle @toggleIsOpen="toggleEmployeeList()" v-for="vehicle in vehicles" v-bind:name="vehicle.name" v-bind:seats="vehicle.seats"></vehicle>
    </div>
</template>

<!-- Script -->
<script>
import axios from 'axios';
import Vehicle from './Vehicle.vue';
import EmployeeList from './EmployeeList.vue';
import EmployeeTable from './EmployeeTable.vue';

export default {
    name: 'dienstplanung',
    data: function(){
        return {
            heading: 'Feuerwehr Dienstplanung',
            employeeList: {
                options: {
                    isOpen: false,
                }
            }
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
            this.employeeList.options.isOpen = !this.employeeList.options.isOpen;
            if(this.employeeList.options.isOpen) {
                // let pos = { top: event.target.offsetTop, left: event.target.offsetLeft };
                // this.position = pos;
            }
        }
    },
    computed: {
        employees: function() {
            return this.$store.getters.getEmployees;
        },
        filteredEmployees: function() {
            return this.$store.getters.getEmployeesWithLicenseForLastClickedSeat;
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
        'employee-list': EmployeeList,
        'employee-table': EmployeeTable
    }
}
</script>

<!-- Style -->
<style>
    @font-face { font-family: 'Source Sans Pro'; src: url(../src/font/SourceSansPro-Regular.ttf); }
    html, body {
        font-family: 'Source Sans Pro';
        font-size: 14px;
        margin: 0;
    }
</style>
