<!-- Template -->
<template>
    <div id="employee-list">
        <h5 v-text="heading" @click="toggleIsOpen"></h5>
        <ul class="employees" v-bind:class="{ 'closed': !isOpen }">
            <li @click="preselectEmployee(employee)" v-for="employee in employees" v-bind:class="{ 'preselected': isPreselected(employee) }">
                <span v-text="employee.firstName"></span>
                <span v-text="employee.lastName"></span>
                <i v-if="isPreselected(employee)" class="fa fa-check" aria-hidden="true"></i>
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
            isOpen: this.options.isOpen,
            limit: ('limit' in this.options) ? this.options.limit : 1,
            preselected: []
        }
    },
    props: [
        'employees',
        'options'
    ],
    computed: {
        heading: function(){
            return this.options.heading + ' ('+ this.employees.length +')';
        }
    },
    methods: {
        preselectEmployee: function(employee) {
            if(this.limit > 0) {
                if(this.isPreselected(employee)) {
                    this.removeEmployeeFromPreselection(employee);
                } else {
                    //  Push employee to preselected when we haven't reached the limit yet
                    if(this.preselected.length < this.limit) {
                        this.preselected.push(employee);
                    } else if(this.limit === 1 && this.preselected.length === 1){
                        this.preselected = [];
                        this.preselected.push(employee);
                    } else {
                        //  Remove employee from preselection
                        this.removeEmployeeFromPreselection(employee);
                    }
                }

                this.$emit('list-selection', { preselection: this.preselected });
            }
        },
        toggleIsOpen: function() {
            this.isOpen = !this.isOpen;
        },
        isPreselected: function(employee) {
            return this.preselected.filter(e => e === employee).length > 0;
        },
        removeEmployeeFromPreselection: function(employee) {
            this.preselected = this.preselected.filter(e => e !== employee);
        }
    }
}
</script>

<!-- Style -->
<style lang="stylus" scoped>
    #employee-list
        margin: 10px 0

        h5
            margin: 5px 0
            &:hover { cursor: pointer; }

        ul.employees
            list-style-type: none
            padding: 5px 10px
            margin: 0
            border-left: 1px solid rgba(0,0,0,0.1)

            &.closed { display: none }

            li
                font-size: 0.8em;

                &.preselected
                    color: green
                    font-weight: bold

                &:hover { cursor: pointer }
                &.not-present { opacity: .2; }
</style>
