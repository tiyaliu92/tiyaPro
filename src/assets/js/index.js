import { http, uploadhttp } from "../../config/httpconfig"
// import md5 from "js-md5"
// import encryption from "./Encryption"
import states from "../../store/states"
import mutations from "../../store/mutations"
import router from "../../router/index"

import { baseURL } from "../config/index";
import 'url-search-params-polyfill';



/**
 * @method axios封装
 * @param {String} url 请求地址
 * @param {JSON} params 请求参数
 * @return {Promise} 返回结果
 */
export function $http(url, params) {
    if (!params) params = new Object();
    if (states.token) params.token = states.token;
    params.sign = md5(encryption.ecpd(params));

    let postparams = new URLSearchParams();
    for (const k in params) {

        if (typeof params[k] == 'number' || typeof params[k] == 'boolean') {
            postparams.append(k, params[k]);
        }
        else if (params[k] != "" && params[k] != undefined && params[k] != null && params[k] != "undefined") {
            postparams.append(k, params[k]);
        }
    }


    return new Promise((resolve, reject) => {
        if (navigator.userAgent.indexOf("Html5Plus") != -1) {
            var xhr = new plus.net.XMLHttpRequest();
            xhr.onreadystatechange = function () {
                switch (xhr.readyState) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        if (xhr.status == 200) {
                            var resObj = JSON.parse(xhr.responseText);
                            if (resObj && resObj.code == 0) {
                                resolve(resObj);
                            }
                            else {
                                if (resObj.msg.indexOf("过期") != -1) {
                                    mutations.removeToken();
                                    Message.info(resObj.msg, 1500, function () {
                                        router.push("/loginpage");
                                    });
                                }else{
                                    Message.info(resObj.msg, 1500);
                                }
                            }
                        }
                        else {
                            Message.info("请检查网络设置!", 1500);
                        }
                        break;
                    default:
                        break;
                }
            }
            xhr.open("POST", baseURL + url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(postparams.toString());
        } else {
            http.post(url, postparams)
                .then(res => {
                    let data = res.data;
                    if (url == '/coursePack/deleteCoursePack') {
                        resolve(data)
                        return
                    }

                    if (data.code == 0) resolve(data);
                    else if (data.msg.indexOf("信息") != -1 && (data.msg.indexOf("过期") != -1 || data.msg.indexOf("失效") != -1)) {
                        mutations.removeToken();
                        Message.info(data.msg, 1500, function () {
                            router.push("/loginpage");
                        });
                    }
                    else if (data.msg.indexOf("素材已下架") != -1) {
                        Message.info(data.msg, 1500, function () {
                            router.back();
                        });
                    }
                    else Message.info(data.msg);
                    reject("失败");
                })
        }



    })
}

/**
 * @method axios封装图片上传
 * @param {String} base64data
 * @param {JSON} params 请求参数
 * @return {Promise} 返回结果
 */
export function $uploadUserIcons(base64data, fileName) {


    bitmap1.loadBase64Data(base64data, function () {
            bitmap1.save("_downloads/icons/myheadicon.png", {
                    overwrite: true,
                    quality: 100
                },
                function (i) {
                    let path = i.target;
                    uploadToOss(path);
                },
                function (e) {
                    Message.info("保存失败" + JSON.stringify(e), 1500);
                });
        },
        function () {
            Message.info("转换失败",1500);
        })

    function uploadToOss(path) {

        let uploadaddress = "";
        let ext = fileName.substring(fileName.lastIndexOf("."));
        let imagearr = ["png", "jpg", "jpeg", "gif"];
        if (imagearr.indexOf(ext) != -1) {
            // 上传图片
            uploadaddress = `iclass/images/`;
        } else {
            // 其他文件格式
            uploadaddress = `iclass/others/`;
        }

        vm.$http("/ossAuth/sts", {}).then(res => {
            let signature = res.data;
            var key = vm.uuid() + path.substring(path.lastIndexOf("."));
            var ossFilePath = signature.dir + uploadaddress + key;
            var ossFilePathFull = signature.host + "/" + ossFilePath;

            if (path.indexOf("file://") == 0) {
                path = path.substring(7);
            }

            var localpath = plus.io.convertAbsoluteFileSystem(path);
            //上传阿里云OSS
            var task = plus.uploader.createUpload(signature.host, {
                    method: "POST",
                    blocksize: 204800,
                    priority: 100
                },
                function (t, status) {
                    // 上传完成
                    if (status == 200) {
                        Message.info("上传成功", 1500);
                    }
                    else {
                        Message.info("上传失败", 1500);
                    }
                }
            );
            task.addData("OSSAccessKeyId", signature.accessid); //Bucket 拥有者的Access Key Id。
            task.addData("policy", signature.policy); //policy规定了请求的表单域的合法性
            task.addData("Signature", signature.signature); //根据Access Key Secret和policy计算的签名信息
            //---以上都是阿里的认证策略
            task.addData("key", ossFilePath); //文件名字，可设置路径
            task.addData("success_action_status", "200"); // 让服务端返回200,不然，默认会返回204
            task.addFile(localpath, {
                name: "file",
                key: "file"
            }); //需要上传的文件 file
            task.addEventListener("statechanged", function (upload, status) {

                if (status == 0 && upload.state == 3) { // 上传中
                    var percent = Math.floor((upload.uploadedSize / upload.totalSize) * 100);
                    for (const item of vm.arr) {
                        if (item.indexno == preuploadnumber) {
                            item.percent = percent;
                            //console.log(vm.arr);
                            break;
                        }
                    }
                    console.log("已上传：" + percent);

                } else if (status == 200 && upload.state == 4) { //上传完成
                }
            }, false);
            task.start();
        });

    }




}


/**
 * @method 直连上传OSS
 * @param file file格式或blob格式
 */
export function $uploadOSS(file, fileName) {
    let uploadaddress = "";
    let ext = fileName.substring(fileName.lastIndexOf("."));
    let imagearr = ["png", "jpg", "jpeg", "gif"];
    if (imagearr.indexOf(ext) != -1) {
        // 上传图片
        uploadaddress = `iclass/images/`;
    } else {
        // 其他文件格式
        uploadaddress = `iclass/others/`;
    }

    return new Promise((resolve, reject) => {


        $http("/ossAuth/sts").then(res => {
            let signature = res.data;
            var key = uuid() + ext;
            var ossFilePath = signature.dir + uploadaddress + key;
            var ossFilePathFull = signature.host + "/" + ossFilePath;
            var data = new FormData();

            data.append("OSSAccessKeyId", signature.accessid); //Bucket 拥有者的Access Key Id。
            data.append("policy", signature.policy); //policy规定了请求的表单域的合法性
            data.append("Signature", signature.signature); //根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
            //---以上都是阿里的认证策略
            data.append("key", ossFilePath); //文件名字，可设置路径
            data.append("success_action_status", "200"); // 让服务端返回200,不然，默认会返回204
            data.append("file", file); //需要上传的文件 file

            $.ajax({
                url: signature.host, //上传oss地址
                data: data,
                processData: false, //默认true，设置为 false，不需要进行序列化处理
                cache: false, //设置为false将不会从浏览器缓存中加载请求信息
                async: true, //发送同步请求
                contentType: false, //避免服务器不能正常解析文件---------具体的可以查下这些参数的含义
                dataType: "TEXT", //不涉及跨域  写json即可
                type: "POST",
                xhr: function () {
                    let myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        //监听上传进度
                        myXhr.upload.addEventListener("progress",
                            function (e) {
                                if (e.lengthComputable) {
                                    // var percent = Math.floor((e.loaded / e.total) * 100);
                                    // console.log("====已上传进度：" + percent + "%");
                                }
                            },
                            true
                        );
                    }
                    return myXhr;
                },
                success: function (callbackHost, response) {
                    //调用后台接口，更新头像地址   /school/uploadIcon    参数：ossUrl= ossFilePathFull

                    $http("/school/uploadIcon", {
                        ossUrl: ossFilePathFull
                    }).then(res => {
                        console.log(ossFilePathFull);
                        if (res.code == "0") {
                            resolve(ossFilePathFull);
                        }
                    })

                },
                error: function (returndata) {
                    Message.info("上传失败", 1500);
                }
            });
        })

    })
}


/**
 * @method 直连上传图片至OSS
 * @param file file格式或blob格式
 * @param fileName 原文件名
 * @param sucessCB 成功回调
 * @param errorCB 失败回调
 * @param processCB 进度更新回调
 *
 */
export function $uploadImage2OSS(file, fileName, sucessCB, errorCB, processCB) {
    let uploadaddress = `iclass/images/`;
    let ext = fileName.substring(fileName.lastIndexOf("."));
    $http("/ossAuth/sts").then(res => {
        let signature = res.data;
        var key = uuid() + ext;
        var ossFilePath = signature.dir + uploadaddress + key;
        var ossFilePathFull = signature.host + "/" + ossFilePath;
        var data = new FormData();

        data.append("OSSAccessKeyId", signature.accessid); //Bucket 拥有者的Access Key Id。
        data.append("policy", signature.policy); //policy规定了请求的表单域的合法性
        data.append("Signature", signature.signature); //根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
        //---以上都是阿里的认证策略
        data.append("key", ossFilePath); //文件名字，可设置路径
        data.append("success_action_status", "200"); // 让服务端返回200,不然，默认会返回204
        data.append("file", file); //需要上传的文件 file

        $.ajax({
            url: signature.host, //上传oss地址
            data: data,
            processData: false, //默认true，设置为 false，不需要进行序列化处理
            cache: false, //设置为false将不会从浏览器缓存中加载请求信息
            async: true, //发送同步请求
            contentType: false, //避免服务器不能正常解析文件---------具体的可以查下这些参数的含义
            dataType: "TEXT", //不涉及跨域  写json即可
            type: "POST",
            xhr: function () {
                let myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    //监听上传进度
                    myXhr.upload.addEventListener("progress",
                        function (e) {
                            if (e.lengthComputable) {
                                var percent = Math.floor((e.loaded / e.total) * 100);
                                if (typeof processCB === 'function') {
                                    processCB(percent);
                                }
                            }
                        },
                        true
                    );
                }
                return myXhr;
            },
            success: function (callbackHost, response) {
                //回调参数，完整OSS地址： ossFilePathFull
                if (typeof sucessCB === 'function') {
                    sucessCB(ossFilePathFull);
                }
            },
            error: function (returndata) {
                if (typeof errorCB === 'function') {
                    errorCB(returndata);
                }
            }
        });
    })
}

/**
 * @method 设置全屏，沉浸式，隐藏虚拟导航栏和状态栏
 */
export function $setWindowFullScreen() {
    if (navigator.userAgent.indexOf("Html5Plus") != -1) {
        var osName = plus.os.name;
        if (osName.toLowerCase() == "android") {
            var mainActivity = plus.android.runtimeMainActivity();
            plus.android.setAttribute(mainActivity, "android.notch_support", true);
            var windowMe = mainActivity.getWindow();
            plus.android.importClass(windowMe);
            var decorView = windowMe.getDecorView();
            plus.android.importClass(decorView);

            //沉浸式-隐藏状态栏和虚拟导航键
            var View = plus.android.importClass("android.view.View");
            decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_FULLSCREEN |
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }
}

function uuid() {
    return (
        randomNumber() +
        randomNumber() +
        randomNumber() +
        randomNumber() +
        randomNumber() +
        randomNumber() +
        randomNumber() +
        randomNumber()
    );
}

function randomNumber() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
