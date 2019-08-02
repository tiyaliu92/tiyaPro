<template>
    <div class="c1">
        子组件1
        <ul>
            <li v-for="item in list">{{item}}</li>
        </ul>
        <router-link to="/c1">语文</router-link>
        <router-link to="/c2">数学</router-link>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list:[]
            };
        },
        methods:{
            getdata(){
                let vm = this;
                let id = this.$route.params.id;
                console.log(this.$route.params);
                let url =id ? `http://localhost:3001/subject/${id}`:`http://localhost:3001/subject/`;
                this.get(url).then(res=>{
                    vm.list = res.data;
                })
            }
        },
        created() {
            this.getdata();
        },
        watch:{
            $route(to,from){
                this.getdata();
            }
        }
    }
</script>