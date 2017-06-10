<!-- Template -->
<template>
    <div id="vehicle">
        <h3>
            <span class="name" v-text="name"></span>
            <span>
                <i v-if="isFullySeated" class="fa fa-check"></i>
                <i v-if="!isFullySeated" class="fa fa-times"></i>
            </span>
        </h3>

        <ul class="seats">
            <li class="seat-bag" v-for="seat in seats">
                <span class="label" v-text="seat.label"></span>
                <span class="employee" v-on:click="toggleEmployeeList(seat)" v-text="seat.employee && seat.employee.firstName || '...'"></span>
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
    },
    computed: {
        isFullySeated: function() {
            return this.seats.every(s => s.employee !== null);
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

        span.name
            margin-right: 10px

        .fa-check { color: green }
        .fa-times { color: #c06c84 }

    .seats
        border-left: 1px solid rgba(0,0,0,0.1)
        list-style-type: none
        padding: 0
        margin: 0

        li
            padding: 5px 10px
            margin: 0
            font-size: 0.8em

            span.label
                display: inline-block
                min-width: 80px
                font-weight: bold

            span.employee
                border-bottom: 1px solid rgba(181,181,181,0.5)
                padding: 5px 10px
                color: #c06c84
                min-width: 100px
                display: inline-block
                text-align: center

                &:hover
                    cursor: pointer
</style>
