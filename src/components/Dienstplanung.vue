<!-- Template -->
<template>
    <div id="dienstplanung">
        <h1 v-text="heading"></h1>

        <ul>
            <li v-if="config" v-for="employee in config.employees" v-text="employee.firstName"></li>
        </ul>

        <vehicle v-for="vehicle in vehicles" v-bind:name="vehicle.name" v-bind:seats="vehicle.seats"></vehicle>
    </div>
</template>

<!-- Script -->
<script>
import Vehicle from './Vehicle.vue';

export default {
    name: 'dienstplanung',
    data: function(){
        return {
            heading: 'Feuerwehr Dienstplanung',
            config: '',
            employees: '',
            vehicles: ''
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

                //  Map seats
                this.vehicles.forEach(vehicle => {
                    vehicle.seats = vehicle.seats.map(seat => ({ id: seat, label: config.seats[seat] }) );
                });
            }, response => { });
        }
    },
    mounted: function () {
        let self = this;
        self.init();
    },
    components: {
        'vehicle': Vehicle
    }
}
</script>

<!-- Style -->
<style scoped>

</style>
