<template>
<!--        歌名 歌手 专辑 发行时间 是否收藏 所属歌单 所属国家 歌词-->
        <el-form :model="musicForm" :rules="rules" ref="musicForm" label-width="100px" class="musicForm">
            <el-form-item label="歌曲名称" required>
                <el-col :span="11">
                    <el-form-item  prop="musicName">
                        <el-input v-model="musicForm.musicName"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="歌手名称" required>
                <el-col :span="11">
                    <el-form-item  prop="singerName">
                        <el-input v-model="musicForm.singerName"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="专辑名称" required>
                <el-col :span="11">
                    <el-form-item  prop="albumName">
                        <el-input v-model="musicForm.albumName"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="发行时间" required>
                <el-col :span="11">
                    <el-form-item  prop="publishTime">
                        <el-date-picker type="date" placeholder="请选择发行日期" v-model="musicForm.publishTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="是否收藏">
                <el-col :span="11">
                    <el-form-item  prop="isCollected">
                        <el-switch v-model="musicForm.isCollected"></el-switch>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="所属歌单">
                <el-col :span="11">
                    <el-form-item prop="songList">
                        <el-select v-model="musicForm.songList" placeholder="请选择所属歌单">
                            <el-option label="歌单一" value="shanghai"></el-option>
                            <el-option label="歌单二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-form-item>
            <el-form-item label="所属音乐库" required>
                <el-col :span="11">
                    <el-form-item  prop="musicLibrary" >
                        <el-select v-model="musicForm.musicLibrary" placeholder="请选择所属音乐库">
                            <el-option label="中国" value="shanghai"></el-option>
                            <el-option label="欧美" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="歌曲歌词">
                <el-col :span="11">
                    <el-form-item prop="lyric">
                        <el-input type="textarea" v-model="musicForm.lyric" placeholder="两句之间请一定用分号（；）隔开"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('musicForm')">立即创建</el-button>
                <el-button @click="resetForm('musicForm')">重置</el-button>
            </el-form-item>




        </el-form>
</template>

<script>
    //<!--        歌名 歌手 专辑 发行时间 是否收藏 所属歌单 所属国家 歌词-->
    export default {
        name: "addMusicMesg",
        data() {
            return {
                musicForm: {
                    musicName: '',
                    singerName: '',
                    albumName: '',
                    publishTime: '',
                    isCollected: false,
                    songList: '',
                    musicLibrary: '',
                    lyric: ''
                },
                rules: {
                    musicName: [
                        { required: true, message: '请输入歌曲名称', trigger: 'blur' },
                    ],
                    singerName: [
                        { required: true, message: '请输入歌手名称', trigger: 'blur' },
                    ],
                    albumName: [
                        { required: true, message: '请输入专辑名称', trigger: 'blur' },
                    ],
                    publishTime: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    musicLibrary: [
                        { required: true, message: '请选择音乐库', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {

                let vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = `http://localhost:3001/musicLibrary?`;
                        this.post(url,vm.musicForm).then(res=>{
                            console.log(res);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            rightClick(item) {
                const name = `work_flow_${item.name}`;
                this.$refs[name][0].show();     // 这步最关键，让下拉菜单显示
            },
            add(){

            },
            edit(){

            }
        }
    }
</script>

<style scoped>

</style>