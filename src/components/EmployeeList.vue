<!-- Template -->
<template>
    <div id="employee-list">
        <input id="employee-search" type="text" v-model="searchText">
        <ul id="employees">
            <li v-for="employee in filteredEmployees" v-text="employee.firstName"></li>
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
        'isOpen'
    ],
    computed: {
        filteredEmployees: function() {
            return this.employees && this.employees.filter(e => e.firstName.includes(this.searchText) || e.lastName.includes(this.searchText));
        }
    },
    methods: {
        init: function() {
            var self = this;

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

    li
        font-size: 11px
        color: black
</style>
