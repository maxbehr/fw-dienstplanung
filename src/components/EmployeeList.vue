<!-- Template -->
<template>
    <div id="employee-list">
        <h5 v-text="options.heading" @click="toggleIsOpen"></h5>

        <ul class="employees" v-bind:class="{ 'closed': !isOpen }">
            <li @click="selectEmployeeForSeat(employee)" v-for="employee in employees" >
                <span v-text="employee.firstName"></span>
            </li>
        </ul>
    </div>
</template>

<!-- Script -->
<script>
export default {
    name: 'employeeList',
    data: function() {
        return {
            isOpen: false
        }
    },
    props: [
        'employees',
        'options'
    ],
    computed: {

    },
    methods: {
        selectEmployeeForSeat: function(employee) {
            this.$store.commit('SELECT_EMPLOYEE_FOR_SEAT', { employee: employee })
            this.$emit('employeeWasSelected');
        },
        toggleIsOpen: function() {
            this.isOpen = !this.isOpen;
        }
    }
}
</script>

<!-- Style -->
<style lang="stylus" scoped>
    #employee-list

        .employees
            list-style-type: none
            padding: 5px 10px

            &.closed { display: none }

            li
                font-size: 0.9em;
                &:hover { cursor: pointer }
                &.not-present { opacity: .2; }
</style>
