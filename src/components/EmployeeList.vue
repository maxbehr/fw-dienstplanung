<!-- Template -->
<template>
    <div id="employee-list" v-show="isOpen">

        <div id="wrapper">
            <input id="employee-search" type="text" v-model="searchText">
            <ul id="employees">
                <li @click="selectEmployeeForSeat(employee)" v-for="employee in filteredEmployees" >
                    <span v-text="employee.firstName"></span>
                    <span v-if="isAlreadySeated(employee)">x</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<!-- Script -->
<script>

export default {
    name: 'employeeList',
    data: function(){
        return {
            searchText: ''
        }
    },
    props: [
        'employees',
        'options'
    ],
    computed: {
        filteredEmployees: function() {
            return this.employees &&
                this.employees.filter(e => {
                    let fn = e.firstName.toLowerCase();
                    let ln = e.lastName.toLowerCase();
                    let st = this.searchText.toLowerCase();

                    return fn.includes(st) || ln.includes(st);
                });
        },
        isOpen: function() {
            return this.options && this.options.isOpen;
        }
    },
    methods: {
        init: function() {
            var self = this;

        },
        selectEmployeeForSeat: function(employee) {
            this.$store.commit('SELECT_EMPLOYEE_FOR_SEAT', { employee: employee })
            this.$emit('close');
        },
        isAlreadySeated: function(employee) {
            return this.$store.state.vehicles.some(vehicle => {
                return vehicle.seats.some(seat => seat.employee === employee);
            });
        }
    }
}
</script>

<!-- Style -->
<style lang="stylus" >
    #employee-list
        width: 100%
        height: 100%
        background-color: rgba(0,0,0,0.4)
        position: absolute

        #wrapper
            position: absolute
            margin: 0 auto
            left: 0
            right: 0
            top: 10%
            width: 500px
            border: 1px solid rgba(0,0,0,0.5)
            padding: 5px 10px
            background-color: white
            border-radius: 3px
            box-shadow: 0px 10px 50px rgba(0,0,0,0.2)

            #employees
                list-style-type: none
                padding: 5px 10px
                margin: 0

                li
                    font-size: 11px
                    color: black
</style>
