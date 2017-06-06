<!-- Template -->
<template>
    <div id="vehicle">
        <h3 v-text="name"></h3>

        <ul class="seats">
            <li class="seat-bag" v-for="seat in seats">
                <span v-text="seat.label"></span>
                <span class="employee" v-on:click="toggleEmployeeList(seat)">Mitarbeiter</span>
            </li>
        </ul>
    </div>
</template>

<!-- Script -->
<script>
export default {
    name: 'vehicle',
    data: function(){
        return {
        }
    },
    props: [
        'name',
        'seats'
    ],
    methods: {
        init: function() {
            var self = this;

        },
        toggleEmployeeList: function(seat) {
            this.$emit('toggleEmployeeList', { event: event, vehicle: this.name, seat: seat });
        }
    }
}
</script>

<!-- Style -->
<style lang="stylus" scoped>
#vehicle
    border: 1px solid black
    padding: 5px 10px

    .seats
        list-style-type: none
        padding: 0

        li
            padding: 5px 10px
            margin-bottom: 5px

            span.employee
                border: 1px dotted black
                color: red
</style>
