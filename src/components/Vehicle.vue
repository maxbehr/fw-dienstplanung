<!-- Template -->
<template>
    <div id="vehicle">
        <h3 v-text="name"></h3>

        <ul class="seats">
            <li v-for="seat in seats" v-text="seat.label"></li>
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

        }
    }
}
</script>

<!-- Style -->
<style lang="stylus" scoped>
#vehicle
    border: 1px solid black
    padding: 5px 10px

    .seats
        list-style-type: none
        padding: 0

        li
            border: 1px dotted black
            padding: 5px 10px
            margin-bottom: 5px
            color: red
</style>
