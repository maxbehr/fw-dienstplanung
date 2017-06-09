<!-- Template -->
<template>
    <div id="dienstplanung">
        <employee-selection @close="toggleEmployeeList()" v-bind:options="employeeSelection.options" v-bind:employees="filteredEmployees"></employee-selection>
        <h1 v-text="heading"></h1>

        <div class="tab">
            <h2>Mitarbeiter</h2>
            <employee-table v-bind:employees="employees"></employee-table>
        </div>

        <div class="tab">
            <h2>Fahrzeuge</h2>
            <div class="row">
                <div class="column column-25" v-for="vehicle in vehicles">
                    <vehicle @toggleIsOpen="toggleEmployeeList()" v-bind:name="vehicle.name" v-bind:seats="vehicle.seats"></vehicle>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Script -->
<script>
import axios from 'axios';
import Vehicle from './Vehicle.vue';
import EmployeeSelection from './EmployeeSelection.vue';
import EmployeeTable from './EmployeeTable.vue';

export default {
    name: 'dienstplanung',
    data: function(){
        return {
            heading: 'Feuerwehr Dienstplanung',
            employeeSelection: {
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
            this.employeeSelection.options.isOpen = !this.employeeSelection.options.isOpen;
            if(this.employeeSelection.options.isOpen) {
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
        'employee-selection': EmployeeSelection,
        'employee-table': EmployeeTable
    }
}
</script>

<!-- Style -->
<style>
    @font-face { font-family: 'Source Sans Pro'; src: url(../src/font/SourceSansPro-Regular.ttf); }
    @font-face { font-family: 'Roboto-Regular'; src: url(../src/font/Roboto-Regular.ttf); }
    @font-face { font-family: 'Roboto-Light'; src: url(../src/font/Roboto-Light.ttf); }
    @font-face { font-family: 'Roboto-Bold'; src: url(../src/font/Roboto-Bold.ttf); }
    @font-face { font-family: 'Roboto-Black'; src: url(../src/font/Roboto-Black.ttf); }
    @font-face { font-family: 'Roboto-Black'; src: url(../src/font/Roboto-Black.ttf); }

    html, body {
        font-family: 'Roboto-Light';
        margin: 0;
    }

    #dienstplanung {
        padding: 20px;
        margin: 0 auto;
    }
</style>
