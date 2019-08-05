<template>
    <el-form ref="form" :model="form">
        <el-form-item>
            <el-input v-model="form.name" type="types" class=" " :maxlength="maxlength" placeholder="placeholder" ></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "search",
        props: {
            number:{
                type: Number,
                validator: function (value) {
                    return !isNaN(value)
                }
            },
            maxlength:[Number],
            value: Boolean,
            types: [Number, String],
        },
        data(){
            return {
                form:{
                    name:'11232'
                }
            }
        }

    }
</script>

<style scoped>

</style>