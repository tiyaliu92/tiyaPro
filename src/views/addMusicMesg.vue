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
                    <el-form-item  prop="region">
                        <el-input v-model="musicForm.musicName"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="专辑名称">
                <el-col :span="11">
                    <el-form-item  prop="musicName">
                        <el-input v-model="musicForm.musicName"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="发行时间">
                <el-col :span="11">
                    <el-form-item  prop="musicName">
                        <el-date-picker type="date" placeholder="选择日期" v-model="musicForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="是否收藏">
                <el-col :span="11">
                    <el-form-item  prop="delivery">
                        <el-switch v-model="musicForm.delivery"></el-switch>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="所属歌单">
                <el-col :span="11">
                    <el-form-item prop="type">
                        <el-select v-model="musicForm.region" placeholder="请选择所属歌单">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-form-item>
            <el-form-item label="所属音乐库">
                <el-col :span="11">
                    <el-form-item  prop="resource">
                        <el-select v-model="musicForm.region" placeholder="请选择所属歌单">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="歌曲歌词" required>
                <el-col :span="11">
                    <el-form-item prop="type">
                        <el-input type="textarea" v-model="musicForm.desc" placeholder="两句之间请用分号（；）隔开"></el-input>
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
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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