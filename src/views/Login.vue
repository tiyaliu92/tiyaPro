<template>
    <el-container class="container">
        <div class="loginBox bged00d4">
            <el-row>
                <el-col :span="12" class="bgfff">
                    <div class="grid-content">
                        <el-main>
                            <h1 class="loginTitle">登录</h1>
                            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0"
                                     class="ruleForm">
                                <el-form-item prop="username">
                                    <el-input placeholder="用户名" type="text" v-model="ruleForm.username"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item prop="pass">
                                    <el-input placeholder="密码" type="password" v-model="ruleForm.pass"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item prop="checkPass">
                                    <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item prop="age">
                                    <el-input placeholder="年龄" v-model.number="ruleForm.age"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')" round>登录</el-button>
                                    <el-button @click="resetForm('ruleForm')" round>重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-main>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <div class="loginInfoBox">
                            <h1 class="loginInfoTitle">说明</h1>
                            <p>你在南方的艳阳里，大雪纷飞，我在北方的寒夜里，四季如春</p>
                            <el-button @click="submitForm('ruleForm')" class="registerBtn" round>注册</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<script>
    import {post} from '../config/httpconfig';
    import { mapMutations } from "vuex";
    export default {
        name: "login",
        data() {
            var validateUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                }
                setTimeout(() => {
                    if (!(/^[a-zA-Z][_a-zA-Z0-9]*$/.test(value))) {
                        callback(new Error('请输入英文开头的名称，只支持英文数字下划线'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formLabelWidth: '200',
                ruleForm: {
                    username: '',
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            ...mapMutations(["setToken"]),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        post('https://www.easy-mock.com/mock/5d36a62ccaeac14198f42d3d/login',{
                            login:'login'
                        },{}).then((data)=>{
                            if(data.code === '200'){
                                this.setToken(data.data.token);
                                this.$router.push('/home')
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            const vm = this;
            window.onresize = () => {
                console.log(vm);
            }
        }
    }
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background: url('../assets/images/2.jpeg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-attachment: fixed;

        .bgfff {
            background: #fff;
        }

        .bged00d4 {
            background: rgba(237,0,212,0.5);
        }

        .grid-content {
            padding:20px 20px 0;
        }
        .loginBox {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 2;
            width: 70%;
            height: 411px;
            .loginTitle {
                font-size: 18px;
                text-align: left;
                padding-bottom: 20px;
            }
            .ruleForm {
                .el-input {
                    border-radius: 50%;
                }
            }
            .loginInfoBox{
                color:#fff;
                text-align:left;
                font-size:16px;
                .loginInfoTitle {
                    font-size: 18px;
                    text-align: left;
                    padding-bottom: 20px;
                    padding-top: 20px;
                }
                .registerBtn{
                    background:none;
                    color:#fff;
                    margin-top:20px;
                }
            }
        }

    }

</style>