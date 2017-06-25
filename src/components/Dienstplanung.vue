<!-- Template -->
<template>
    <div id="dienstplanung">
        <employee-selection @close="toggleEmployeeList()" v-bind:options="employeeSelection.options" v-bind:employees="filteredEmployees"></employee-selection>
        <h1 v-text="heading"></h1>

        <div class="row">
            <div class="column column-25">
                <h2 @click="isTabEmployeesExpanded = !isTabEmployeesExpanded">
                    Mitarbeiter
                    <i v-if="!isTabEmployeesExpanded" class="fa fa-caret-right" aria-hidden="true"></i>
                    <i v-if="isTabEmployeesExpanded" class="fa fa-caret-down" aria-hidden="true"></i>
                </h2>
                <employee-table v-show="isTabEmployeesExpanded" v-bind:employees="employees"></employee-table>
            </div>

            <div class="column column-75">
                <h2 @click="isTabVehiclesExpanded = !isTabVehiclesExpanded">
                    Fahrzeuge
                    <i v-if="!isTabVehiclesExpanded" class="fa fa-caret-right" aria-hidden="true"></i>
                    <i v-if="isTabVehiclesExpanded" class="fa fa-caret-down" aria-hidden="true"></i>
                </h2>
                <div v-show="isTabVehiclesExpanded" class="flex-container">
                    <div class="col-33" v-for="vehicle in vehicles">
                        <vehicle @toggleIsOpen="toggleEmployeeList()" v-bind:options="{ name: vehicle.name, color: vehicle.color, isOpen: false }" v-bind:seats="vehicle.seats"></vehicle>
                    </div>
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
            },
            isTabEmployeesExpanded: true,
            isTabVehiclesExpanded: true
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
    @font-face { font-family: 'Source Sans Pro'; src: url(../src/fonts/SourceSansPro-Regular.ttf); }
    @font-face { font-family: 'Roboto-Regular'; src: url(../src/fonts/Roboto-Regular.ttf); }
    @font-face { font-family: 'Roboto-Light'; src: url(../src/fonts/Roboto-Light.ttf); }
    @font-face { font-family: 'Roboto-Bold'; src: url(../src/fonts/Roboto-Bold.ttf); }
    @font-face { font-family: 'Roboto-Black'; src: url(../src/fonts/Roboto-Black.ttf); }
    @font-face { font-family: 'Roboto-Black'; src: url(../src/fonts/Roboto-Black.ttf); }

    html, body {
        font-family: 'Roboto-Light';
        margin: 0;
    }

    #dienstplanung {
        padding: 20px;
        margin: 0 auto;
    }

    #dienstplanung h2:hover {
        cursor: pointer;
    }

    #dienstplanung .bold {
        font-weight: bold;
    }

    #dienstplanung .red {
        color: #c06c84;
    }

    #dienstplanung .green {
        color: #c06c84;
    }

    .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;

        -ms-box-orient: horizontal;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -moz-flex;
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .col-33 {
        width: 33%;
    }

    .fade-enter-active, .fade-leave-active { transition: opacity .2s }
    .fade-enter, .fade-leave-to { opacity: 0 }
</style>
