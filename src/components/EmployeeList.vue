<!-- Template -->
<template>
    <div id="employee-list" v-show="isOpen">
        <input id="employee-search" type="text" v-model="searchText">
        <ul id="employees">
            <li @click="selectEmployeeForSeat(employee)" v-for="employee in filteredEmployees" >
                <span v-text="employee.firstName"></span>
                <span v-if="isAlreadySeated(employee)">x</span>
            </li>
        </ul>
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
<style lang="stylus" scoped>
#employee-list
    display: block
    position: absolute
    border: 1px solid black
    padding: 5px 10px
    background-color: white

#employees
    list-style-type: none
    padding: 5px 10px
    margin: 0

    li
        font-size: 11px
        color: black
</style>
