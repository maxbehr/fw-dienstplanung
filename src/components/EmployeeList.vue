<!-- Template -->
<template>
    <div id="employee-list">
        <input id="employee-search" type="text" v-model="searchText">
        <ul id="employees">
            <li @click="selectEmployeeForSeat(employee)" v-for="employee in filteredEmployees" v-text="employee.firstName"></li>
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
        'employees'
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
        }
    },
    methods: {
        init: function() {
            var self = this;

        },
        selectEmployeeForSeat: function(employee) {
            this.$store.state.lastClickedSeat.seat.employee = employee;
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
