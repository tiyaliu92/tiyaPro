<template>
    <div class="c1">
        <h1>音乐</h1>
            <li v-for="(item,index) in list1" :key="index">{{item}}
        </li>
        <ul>
            <li v-for="item in list" :key="item._id">
                <h2 @click="updata(item)">{{item.name}}</h2>
                <p>{{item.content}}</p>
                <span @click="delmusic(item._id)">x</span>
            </li>
        </ul>
        <div class="inputbox">
            <el-input v-model="name" placeholder="请输入歌名"></el-input>
            <el-input v-model="content" placeholder="请输入内容"></el-input>
            <button class="el-button" @click="addmusic">{{state}}</button>
        </div>

<!--        <router-link to="/c1">音乐</router-link>-->
<!--        <router-link to="/c2">数学</router-link>-->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                state:"增加",
                name:"",
                content:"",
                list:[],
                item:null,
                list1:[],
            };
        },
        methods:{
            updata(item){
                if(this.state == "增加"){
                    this.state = "修改";
                    this.name = item.name;
                    this.content = item.content;
                    this.item = item;
                }else{
                    this.state = "增加";
                    this.name = "";
                    this.content = "";
                    this.item = null;
                }

            },
            addmusic(){
                let vm = this;
                if(vm.state == "增加"){
                    let url = `http://localhost:3001/music?name=${vm.name}&content=${vm.content}`;
                    this.post(url).then(res=>{
                        vm.list.push(res.data);
                        vm.name = "";
                        vm.content = "";
                    })
                }else{
                    this.http.put(`http://localhost:3001/music/${vm.item._id}?name=${vm.name}&content=${vm.content}`).then(res=>{
                        vm.getdata();
                        this.state = "增加";
                        vm.name = "";
                        vm.content = "";
                    })
                }

            },
            delmusic(id){
                let vm = this;
                let url = `http://localhost:3001/music/${id}`;
                this.http.delete(url).then(res=>{
                    vm.getdata();
                })
            },
            getdata(){
                let vm = this;
                let id = this.$route.params.id;
                // console.log(this.$route.params);
                let url1 =id ? `http://localhost:3001/subject/${id}`:`http://localhost:3001/subject/`;
                this.get("http://localhost:3001/music").then(res=>{
                    vm.list = res.data;
                    // vm.list = res.data;
                })
                this.get(url1).then(res=>{
                    vm.list1 = res.data;
                    // vm.list = res.data;
                })
            }
        },
        created() {
            this.getdata();
        },
        // watch:{
        //     $route(to,from){
        //         this.getdata();
        //     }
        // }
    }
</script>
<style lang="less" scoped>
    ul{
        li{
            margin-bottom: 30px;
            border: 1px solid orange;
            position: relative;
            span{
                position: absolute;
                line-height: 20px;
                right: 20px;
                font-size: 16px;
                color: orange;
                    top: 0;
                cursor: pointer;

            }
            h2{
                color: #333;
                font-size: 20px;
            }
            p{
                font-size: 14px;
            }
        }
    }

    .inputbox{
        display: flex;;
    }


</style>