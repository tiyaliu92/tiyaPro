<template>
    <el-container class="home">
        <el-header>
            <img alt="Vue logo" class="tiyaLogo" src="../assets/images/tiyaLogo-c.png">
            <router-link class="system-name" tag="span" :to="{name: 'c1', params: {id:'math',test:'test'}}">看看天上于是我剪下了月光</router-link>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        router
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">账号管理</span>
                        </template>
                        <el-menu-item index="/c1/yuwen">
                            <router-link tag="li" :to="{name: 'c1', params: {id:'yuwen'}}">语文</router-link>
                        </el-menu-item>
                        <el-menu-item index="/c2">
                            <router-link tag="li" :to="{name: 'c2'}">数学</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <keep-alive>
                        <router-view :key="$route.fullPath"></router-view>
                    </keep-alive>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
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
            background-color: #f5cfdb;
            color: #333;
            height: 60px;
            line-height: 60px;
            text-align: left;
        }
        .el-aside {
            background-color: #D3DCE6;
            color: #333;
        }
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            height: calc(100% - 120px);
        }

        body > .el-container {
            margin-bottom: 40px;
        }

        .tiyaLogo {
            height: 40px;
            vertical-align: middle;

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