<!-- Template -->
<template>
    <div id="dienstplanung">
        <h1 v-text="heading"></h1>

        <ul>
            <li v-if="config" v-for="employee in config.employees" v-text="employee.firstName"></li>
        </ul>

    </div>
</template>

<!-- Script -->
<script>
import Vehicle from './Vehicle.vue';

export default {
    name: 'dienstplanung',
    data: function(){
        return {
            heading: 'Feuerwehr Dienstplanung',
            config: ""
        }
    },
    methods: {
        init: function() {
            var self = this;

            let uri = 'src/config/config.json';

            // GET /someUrl
            this.$http.get(uri).then(response => {

                // get body data
                this.config = JSON.parse(response.bodyText);
            }, response => { });
        }
    },
    mounted: function () {
        let self = this;
        self.init();
    },
    components: {
        'vehicle': Vehicle
    }
}
</script>

<!-- Style -->
<style scoped>

</style>
