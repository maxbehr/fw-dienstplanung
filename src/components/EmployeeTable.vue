<!-- Template -->
<template>
    <div id="employee-table">
        <ul>
            <li v-for="employee in employees">
                <span v-text="employee.firstName"></span>
                <span v-text="employee.lastName"></span>
                <span v-text="employee.license.HLF"></span>
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
    }
}
</script>

<!-- Style -->
<style lang="stylus" scoped>

</style>
