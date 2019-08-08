<template>
    <el-container class="container">
        <div class="loginBox bged00d4">
            <el-row class="flex">
                <el-col :span="12" class="bgfff flexItem">
                    <div class="grid-content">
                        <el-main>
                            <div v-show="isLogin">
                            <h1 class="loginTitle">登录</h1>
                            <el-form :model="loginRulesForm" status-icon :rules="loginRules" ref="loginRulesForm" label-width="0"
                                     class="loginRulesForm">
                                <el-form-item prop="username">
                                    <el-input placeholder="用户名" type="text" v-model="loginRulesForm.username"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item prop="pass">
                                    <el-input placeholder="密码" type="password" v-model="loginRulesForm.pass"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('loginRulesForm')" round>登录</el-button>
                                    <el-button @click="resetForm('loginRulesForm')" round>重置</el-button>
                                </el-form-item>
                            </el-form>
                            </div>
                            <div v-show="!isLogin">
                                <h1 class="loginTitle">注册</h1>
                                <el-form :model="regRuleForm" status-icon :rules="regRules" ref="regRuleForm" label-width="0"
                                         class="regRuleForm">
                                    <el-form-item prop="username">
                                        <el-input placeholder="用户名" type="text" v-model="regRuleForm.username"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="pass">
                                        <el-input placeholder="密码" type="password" v-model="regRuleForm.pass"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="checkPass">
                                        <el-input placeholder="确认密码" type="password" v-model="regRuleForm.checkPass"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('regRuleForm')" round>注册</el-button>
                                        <el-button @click="resetForm('regRuleForm')" round>重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-main>
                    </div>
                </el-col>
                <el-col :span="12" class="flexItem">
                    <div class="grid-content">
                        <div class="loginInfoBox">
                            <h1 class="loginInfoTitle">含笑有白鹭</h1>
                            <p>晏然爱你 不言不语，白鹭先生 含笑归来</p>
                            <p>石岸移接 栖树峰边，夕阳如灯 潮落无声</p>
                            <p>转至桥头 无可诗意，生存如鬼 吞没纸笔</p>
                            <p>古老歌谣 温柔依样，孟婆的汤 洗涤惆怅</p>
                            <p> 让我脱下捆绑 孤绝飞一趟，让我望水面映 我赤裸模样</p>
                            <p> 让我了却遗忘 五谷与稻仓，让我夕拾朝花 破轮回复往</p>
                            <p> 让我随你走入 光影中一斛，淡淡铺落心途 把路看清楚</p>
                            <p> 让我偏执坠入 不管也不顾，淡淡思量有你 含笑有白鹭</p>
                            <el-button v-show="isLogin" @click="isLogin = !isLogin" class="registerBtn" round>注册</el-button>
                            <el-button v-show="!isLogin" @click="isLogin = !isLogin" class="loginBtn" round>已有账号，登录</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<script>
    import { mapMutations } from "vuex";
    import { Message } from 'element-ui';
    export default {
        name: "login",
        data() {
            let validateUsername = (rule, value, callback) => {
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
            // var checkAge = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('年龄不能为空'));
            //     }
            //     setTimeout(() => {
            //         if (!Number.isInteger(value)) {
            //             callback(new Error('请输入数字值'));
            //         } else {
            //             if (value < 18) {
            //                 callback(new Error('必须年满18岁'));
            //             } else {
            //                 callback();
            //             }
            //         }
            //     }, 1000);
            // };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(!this.isLogin){
                        if (this.regRuleForm.checkPass !== '') {
                            this.$refs.regRuleForm.validateField('checkPass');
                        }
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if(this.isLogin){
                    return;
                }else{
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.regRuleForm.pass) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                formLabelWidth: '200',
                isLogin:true,
                loginRulesForm:{
                    username: '',
                    pass: '',
                },
                regRuleForm: {
                    username: '',
                    pass: '',
                    checkPass: '',
                },
                loginRules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                },
                regRules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            ...mapMutations(["setToken"]),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'http://localhost:3001/api/';
                        console.log(this.loginRulesForm.username);
                        if(this.isLogin){//登录
                            this.post(url+'login',this.loginRulesForm).then((data)=>{
                                console.log(data);
                                if(data.code == '200'){
                                    //this.setToken(data.data.token);
                                    this.$router.push('/home')
                                }
                            })
                        }else{//注册
                            delete this.regRuleForm.checkPass;
                            this.post(url+'register',this.regRuleForm).then((data)=>{
                                console.log(data);
                                if(data.code === '200'){
                                    //this.setToken(data.data.token);
                                   this.isLogin = true;

                                }else if(data.code == '201'){
                                    console.log('用户已存在')
                                }
                            })
                        }
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
        .flex{
            display:flex;
            .flexItem{
                flex:1
            }
        }
        .grid-content {
            padding:20px 20px 0;
        }
        .loginBox {
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            z-index: 2;
            width: 70%;
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
                padding:20px;
                .loginInfoTitle {
                    font-size: 18px;
                    text-align: left;
                    padding-bottom: 20px;
                }
                .registerBtn,.loginBtn{
                    background:none;
                    color:#fff;
                    margin-top:20px;
                }
            }
        }

    }

</style>