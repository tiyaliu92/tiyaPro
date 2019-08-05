<template>
    <search type="text" :name="searchBox" :placeholder="placeholder" :maxlength="maxlength"></search>
</template>

<script>
    export default {
        name: "musicLibrary",
        data(){
            return {
                searchBox:'',
                maxlength:6,
                placeholder:'歌手/歌名'
            }
        }
    }
</script>

<style scoped>

</style>