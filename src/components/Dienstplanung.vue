<!-- Template -->
<template>
    <div id="dienstplanung">
        <employee-list v-show="employeeListOptions.isEmployeeListOpen" v-bind:options="employeeListOptions" v-on:selectEmployeeForSeat="selectEmployeeForSeat"></employee-list>
        <h1 v-text="heading"></h1>

        <ul>
            <li v-if="config" v-for="employee in config.employees" v-text="employee.firstName"></li>
        </ul>

        <vehicle v-on:toggleEmployeeList="toggleEmployeeList" v-for="vehicle in vehicles" v-bind:name="vehicle.name" v-bind:seats="vehicle.seats"></vehicle>
    </div>
</template>

<!-- Script -->
<script>
import Vehicle from './Vehicle.vue';
import EmployeeList from './EmployeeList.vue';

export default {
    name: 'dienstplanung',
    data: function(){
        return {
            heading: 'Feuerwehr Dienstplanung',
            employees: '',
            vehicles: '',
            employeeListOptions: {
                isEmployeeListOpen: true,
                employees: [],
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
            let uri = 'src/config/config.json';
            this.$http.get(uri).then(response => {
                let config = JSON.parse(response.bodyText);

                // get body data
                this.employees = config.employees;
                this.vehicles = config.vehicles;

                this.employeeListOptions.employees = this.employees;

                //  Map seats
                this.vehicles.forEach(vehicle => {
                    vehicle.seats = vehicle.seats.map(seat => ({ id: seat, label: config.seats[seat] }) );
                });
            }, response => { });
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
    mounted: function () {
        let self = this;
        self.init();
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
