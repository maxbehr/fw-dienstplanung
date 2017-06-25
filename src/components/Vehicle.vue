<!-- Template -->
<template>
    <div id="vehicle">
        <h3 @click="isOpen = !isOpen">
            <span class="name" v-text="name"></span>
            <span>
                <i v-if="isFullySeated" class="fa fa-check"></i>
            </span>
        </h3>

        <transition name="fade">
            <ul v-if="isOpen" class="seats">
                <li class="seat-bag" v-bind:class="{ 'not-active': !seat.isActive }" v-for="seat in seats">
                    <span class="label" @click="toggleActive(seat)" v-text="seat.label"></span>

                    <template v-if="seat.isActive">
                        <span class="employee" v-on:click="toggleEmployeeList(seat)" v-text="getEmployeeName(seat)"></span>
                    </template>

                    <span class="remove" v-if="seat.employee !== null" v-on:click="removeEmployee(seat)"><i class="fa fa-times"></i></span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<!-- Script -->
<script>
export default {
    name: 'vehicle',
    data: function(){
        return {
            name: this.options.name,
            isOpen: this.options.isOpen,
        }
    },
    props: [
        'options',
        'seats'
    ],
    methods: {
        init: function() {
            var self = this;

        },
        toggleEmployeeList: function(seat) {
            this.$store.commit('SET_LAST_CLICKED_SEAT', { event: event, vehicle: this.name, seat: seat })
            this.$emit('toggleIsOpen');
        },
        toggleActive: function(seat) {
            this.$store.commit('TOGGLE_SEAT_ACTIVE', { event: event, seat: seat })
            this.$emit('toggleActive');
        },
        removeEmployee: function(seat) {
            console.log('seatc', seat);
            this.$store.commit('REMOVE_EMPLOYEE_FROM_SEAT', { event: event, seat: seat })
        },
        getEmployeeName: function(seat) {
            return seat.employee ? seat.employee.firstName + ' ' + seat.employee.lastName : '...';
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
    padding: 15px 10px

    h3
        margin: 0
        padding: 5px 10px

        &:hover { cursor: pointer }

        span.name
            margin-right: 10px

        .fa-check { color: green }

    ul.seats
        list-style-type: none
        padding: 15px 5px
        margin: 0
        background-color: rgba(123,123,123,0.05)
        border-radius: 5px

        li
            padding: 5px 10px
            margin: 0
            font-size: 0.8em

            &.not-active
                opacity: 0.3

            span.label
                display: inline-block
                min-width: 80px
                font-weight: bold

                &:hover
                    cursor: pointer

            span.employee
                border-bottom: 1px solid rgba(181,181,181,0.5)
                // padding: 5px 10px
                color: #c06c84
                min-width: 100px
                display: inline-block
                text-align: center

            span.employee:hover, span.remove:hover
                cursor: pointer
</style>
