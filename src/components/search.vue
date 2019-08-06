<template>
    <el-form ref="form" :model="form">
        <el-input  type="types" class=" " :maxlength="maxlength" :placeholder="placeholder" :v-model="form.name">
            <template slot="append"><i class="el-icon-search" @click="childMethod()"></i></template>
        </el-input>
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
            //value: [Number, String,Boolean],
            types: [Number, String],
            placeholder:[Number, String]
        },
        data(){
            return {
                form:{
                    name:'11232'
                }
            }
        },
        methods: {
            childMethod() {
                this.$emit('fatherMethod');
            }
        }

    }
</script>

<style scoped>

</style>