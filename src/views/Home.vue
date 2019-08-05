<template>
    <el-container class="home">
        <el-header>
            <img alt="Vue logo" class="tiyaLogo" src="../assets/images/tiyaLogo-c.png">
            <router-link class="system-name" tag="span" :to="{name: 'c1', params: {id:'math',test:'test'}}">烦恼会解决烦恼</router-link>
        </el-header>
        <el-container>
            <el-aside>
                <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        router
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">音乐库</span>
                        </template>
                        <el-menu-item index="/musicLibrary/China">
                            <router-link tag="li" :to="{id:'China'}">中国</router-link>
                        </el-menu-item>
                        <el-menu-item index="/musicLibrary/Europe">
                            <router-link tag="li" :to="{id:'Europe'}">欧美</router-link>
                        </el-menu-item>
<!--                        <el-menu-item index="/c2">-->
<!--                            <router-link tag="li" :to="{name: 'c2'}">数学</router-link>-->
<!--                        </el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">音乐歌单</span>
                        </template>
                        <el-menu-item index="/c2">
                            <router-link tag="li" :to="{name: 'c1'}">歌单1</router-link>
                        </el-menu-item>
                        <el-menu-item index="/c3">
                            <router-link tag="li" :to="{name: 'c1'}">歌单2</router-link>
                        </el-menu-item>
                        <el-menu-item index="/c4">
                            <router-link tag="li" :to="{name: 'c1'}">歌单3</router-link>
                        </el-menu-item>
                        <!--                        <el-menu-item index="/c2">-->
                        <!--                            <router-link tag="li" :to="{name: 'c2'}">数学</router-link>-->
                        <!--                        </el-menu-item>-->
                    </el-submenu>
                    <el-menu-item index="3" >
                        <i class="el-icon-menu"></i>
                        <span slot="title">收藏夹</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">音乐歌单</span>
                        </template>
                        <el-menu-item index="/c5">
                            <router-link tag="li" :to="{name: 'c1'}">收藏夹</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
        <el-footer>Footer</el-footer>
    </el-container>
</template>
<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created() {

        },
        watch: {

        }
    }
</script>
<style lang="less">
    .home {
        width: 100%;
        height: 100%;

        .el-header, .el-footer {
            color: #fff;
            text-align: left;
        }
        .el-header{
            height: 60px;
            line-height: 60px;
            /*background: #ffa39c;*/
            background: -webkit-linear-gradient(left, #f04b81 , #ff9b71); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #f04b81, #ff9b71); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #f04b81, #ff9b71); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #f04b81 , #ff9b71); /* 标准的语法 */

        }
        .el-footer{
            background:#ee0056;
            height: 30px !important;
            line-height: 30px;
            /*background: -webkit-linear-gradient(#ffe4e7, #d9e8f7); !* Safari 5.1 - 6.0 *!*/
            /*background: -o-linear-gradient(#ffe4e7, #d9e8f7); !* Opera 11.1 - 12.0 *!*/
            /*background: -moz-linear-gradient(#ffe4e7, #d9e8f7); !* Firefox 3.6 - 15 *!*/
            /*background: linear-gradient(#ffe4e7, #d9e8f7); !* 标准的语法 *!*/
        }
        .el-aside {
            width:200px !important;
            background: -webkit-linear-gradient(#ff9d66, #f14c81); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#ff9d66, #f14c81); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#ff9d66, #f14c81); /* Firefox 3.6 - 15 */
            background: linear-gradient(#ff9d66, #f14c81); /* 标准的语法 */
            ul{
                border:none;
                background:none;
                color:#fff;
                text-align:left;
                .el-submenu__title{
                    color:#fff;
                    i{
                        color:#fff;
                    }
                    &:hover{
                        background:#fa6460;
                    }
                }
                .el-menu-item{
                    color:#fff;
                    border-bottom:1px solid #ffbfbf;
                    i{color:#fff;}
                    &:first-child{
                          border-top:1px solid #ffbfbf;
                      }
                    &:hover{
                        background:#fa6460;
                    }
                    &.is-active{
                        background:#ff4a48;
                        color:#fff;
                    }
                }
            }
        }
        .el-main {
            background-color: #fff;
            /*background: -webkit-linear-gradient(#ffb3c2, #d9e8f7); !* Safari 5.1 - 6.0 *!*/
            /*background: -o-linear-gradient(#ffb3c2, #d9e8f7); !* Opera 11.1 - 12.0 *!*/
            /*background: -moz-linear-gradient(#ffb3c2, #d9e8f7); !* Firefox 3.6 - 15 *!*/
            /*background: linear-gradient(#ffb3c2, #d9e8f7); !* 标准的语法 *!*/
            color: #333;
            height:100%;
            border-left:1px solid #f5f5f5;
        }

        body > .el-container {
            margin-bottom: 40px;
        }

        .tiyaLogo {
            height: 50px;
            float:left;
            padding-top:5px;

            img {
                height: 100%
            }
        }
        .system-name {
            color: #fff;
            font-size: 20px;
        }
    }
</style>