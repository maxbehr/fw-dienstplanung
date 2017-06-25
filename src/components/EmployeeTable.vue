<!-- Template -->
<template>
    <div id="employee-table">
        <ul id="employees">
            <li v-for="employee in employees" @click="togglePresent(employee)" v-bind:class="{ 'not-present': !employee.isPresent }">
                <span class="icon"><i class="fa fa-user-o"></i></span>
                <span v-text="employee.firstName"></span>
                <span v-text="employee.lastName"></span>
            </li>
        </ul>
    </div>
</template>

<!-- Script -->
<script>

export default {
    name: 'employeeTable',
    data: function() {
        return {}
    },
    props: [
        'employees',
        'options'
    ],
    computed: {

    },
    methods: {
        togglePresent: function(employee) {
            this.$store.commit('TOGGLE_PRESENT', { employee: employee })
        }
    }
}
</script>

<!-- Style -->
<style lang="stylus" scoped>
    #employees {
        list-style-type: none
        padding: 5px 10px

        li {
            font-size: 0.9em;
            &:hover { cursor: pointer }
            &.not-present { opacity: .2; }
        }
    }
</style>
