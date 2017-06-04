<template>
    <div id="dienstplanung">
        <h1 v-text="heading"></h1>
    </div>
</template>

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

<style scoped>

</style>
