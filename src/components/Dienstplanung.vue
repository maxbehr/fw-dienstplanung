<!-- Template -->
<template>
    <div id="dienstplanung">
        <h1 v-text="heading"></h1>
    </div>
</template>

<!-- Script -->
<script>
export default {
    name: 'dienstplanung',
    data () {
        return {
            heading: 'Feuerwehr Dienstplanung',
            employees: null
        }
    }
}
</script>

<!-- Style -->
<style scoped>

</style>
