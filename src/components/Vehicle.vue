<!-- Template -->
<template>
    <div id="vehicle">
        <h3 v-text="name"></h3>

        <ul class="seats">
            <li class="seat-bag" v-for="seat in seats">
                <span class="label" v-text="seat.label"></span>
                <span class="employee" v-on:click="toggleEmployeeList(seat)" v-text="seat.employee && seat.employee.firstName || 'Mitarbeiter'">Mitarbeiter</span>
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
            this.$store.commit('SET_LAST_CLICKED_SEAT', { event: event, vehicle: this.name, seat: seat })
            this.$emit('toggleIsOpen');
        }
    }
}
</script>

<!-- Style -->
<style lang="stylus" scoped>
#vehicle
    padding: 5px 10px

    h3
        margin: 0

    .seats
        border: 1px solid black
        list-style-type: none
        padding: 0
        margin: 0

        li
            padding: 5px 10px
            margin: 10px 0
            font-size: 0.8em

            span.label
                display: inline-block
                min-width: 80px
                font-weight: bold

            span.employee
                border: 1px dotted black
                padding: 5px 10px
                color: red

                &:hover
                    cursor: pointer
</style>
