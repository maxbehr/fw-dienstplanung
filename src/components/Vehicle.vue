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
<style scoped>

</style>
