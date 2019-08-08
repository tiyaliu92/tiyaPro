<template>
    <el-container class="musicLibrary">
        <el-header  class="musicLibrarySearch">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <search type="text" @fatherMethod="fatherMethod" :name="searchBox" :placeholder="placeholder" :maxlength="maxlength"></search>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="musicLibraryBox">
            <el-row>
                <el-col :span="24">
                    <el-table
                            :data="tableData"
                            :height="tableHeight"
                            style="width: 100%">
                        <el-table-column  type="expand" width="80">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="歌曲名称">
                                        <span>{{ props.row.musicName }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="musicName"
                                label="歌曲"
                                width="180">
                            <template slot-scope="scope">
                                <i :class="{'el-icon-star-on':scope.row.star,'el-icon-star-off':!scope.row.star}" @click="getStar(scope)"></i>
                                <span @contextmenu.prevent="rightClick($event)">{{ scope.row.musicName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="singerName"
                                label="歌手"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="album"
                                label="专辑">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-main>
        <el-footer class="musicLibraryPage">
            <el-row>
                <el-col :span="12">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-footer>
        <el-cascader-panel :style="contextmenuStyle" :options="options" v-model="selectedOptions" @change="catchange()"></el-cascader-panel>
    </el-container>
</template>

<script>
    export default {
        name: "musicLibrary",
        data() {
            return {
                searchBox: '',
                maxlength: 6,
                placeholder: '歌手/歌名',
                showContextmenu:false,
                contextmenuStyle:{
                    visibility:'hidden',
                    background:'#fff',
                    position:'absolute',
                    zIndex:3
                },
                selectedOptions:[],
                tableHeight:document.documentElement?(document.documentElement.clientHeight - 230):(document.body.clientHeight - 230),
                elIconStar:false,
                tableData: [{
                    musicName: '2016-05-03',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:true
                }, {
                    musicName: '2016-05-02',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:false
                }, {
                    musicName: '2016-05-04',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:true
                }, {
                    musicName: '2016-05-01',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:false
                }, {
                    musicName: '2016-05-08',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:false
                }, {
                    musicName: '2016-05-06',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:true
                }, {
                    musicName: '2016-05-07',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:false
                }, {
                    musicName: '2016-05-07',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:true
                }, {
                    musicName: '2016-05-09',
                    singerName: '王小虎',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:true
                }, {
                    musicName: '2016-05-11',
                    singerName: '王小虎1',
                    album: '上海市普陀区金沙江路 1518 弄',
                    star:false
                }],
                options: [{
                    value: 'add',
                    label: '添加到',
                    children: [
                    {
                        value: 'shejiyuanze',
                        label: '收藏夹',
                    },{
                        value: 'shejiyuanze',
                        label: '新建歌单',
                    }, {
                        value: 'shejiyuanze',
                        label: '歌单1',
                    }, {
                        value: 'daohang',
                        label: '歌单2',
                    }]
                }, {
                    value: 'move',
                    label: '移动到',
                    children: [{
                        value: 'shejiyuanze',
                        label: '收藏夹',
                    },{
                        value: 'shejiyuanze',
                        label: '新建歌单',
                    }, {
                        value: 'shejiyuanze',
                        label: '歌单1',
                    }, {
                        value: 'daohang',
                        label: '歌单2',
                    }]
                }, {
                    value: 'delete',
                    label: '删除'
                }]
            }
        },
        methods:{
            fatherMethod(){
                console.log('这是父级的方法');
            },
            getStar(scope){
                this.tableData[scope.$index].star = !this.tableData[scope.$index].star
            },
            rightClick(e){
                console.log(e.clientX,e.clientY);
                this.contextmenuStyle.visibility ='visible';
                this.contextmenuStyle.left=e.clientX+'px';
                this.contextmenuStyle.top=e.clientY+'px';
            },
            catchange(){
                console.log(this.selectedOptions);
                this.contextmenuStyle.visibility='hidden';

            }
        }
    }
</script>

<style scoped lang="less">
    .musicLibrary{
        height:100%;
        .musicLibrarySearch{
            padding:0;
        }
        .musicLibraryBox{
            padding:0;
            text-align:left;
            overflow:hidden;

            .el-icon-star-off,.el-icon-star-on{
                font-size:18px;
                padding-right:10px;
                cursor:pointer;
            }
            .el-icon-star-on{
                color:#f04b81;
            }
        }
        .musicLibraryPage{
            height:40px !important;
            padding:15px 0;
        }
    }
</style>

<!--let dataSource = List.rows.map(item=>{-->
<!--let obj = {};-->
<!--item.columns.forEach(it=>{-->
<!--obj[`columnName${it.key}`] = it.value;-->
<!--})-->
<!--return obj;-->
<!--})-->

<!--console.log(dataSource);-->
<!--let columns = List.heads.map(item=>{-->
<!--let obj = {};-->
<!--obj.title = item.headDisp;-->
<!--obj.dataIndex = `columnName${item.key}`;-->
<!--obj.key = `columnName${item.key}`;-->
<!--return obj;-->
<!--})-->