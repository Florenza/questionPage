"use strict";

(function () {
    var Url = window.location.href;

    var gTxt = void 0;

    var APITitle = "http://mes.jubao360.cn/"; //http://123.56.229.241:8003/"http://mes.jubao360.cn/"

    var APIUrl = APITitle + "api/Regist_Login/Ins_User"; // http://mes.jubao360.cn/api/Regist_Login/Ins_User  监控用户行为API

    var haveGetTxtTime = 60;

    var limitId = 5;

    var lonTimeId = 6;

    var verificationResult;

    var isFinshed = 0;

    var expireDate = new Date();

    var userName, namePartten, tel, partten, telCheck, nameCheck, answerData, AB_ID;

    var monitor;//监控参数

    var jumpUrl = "questionPage2_3.html";

    var curl = getCookie("curl");

    var cookiesNum = getCookie("cookiesNum");

    var preurl = getCookie("preurl");

    var mid = getUrlParam("mid");

    var app = angular.module("myapp", ['ngCookies']);

    app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
    });
    app.controller("abc", ["$scope", "$http", "$interval", "$cookies", function ($scope, $http, $interval, $cookies) {
        onload();

        $scope.chk = true;
        $scope.disable = false;

        $scope.getTxt = function () {

            var tel = $scope.tels;

            var post = "post";

            var partten = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;

            var namePartten = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/;

            var telCheck = partten.test(tel);
            if (tel == "" || typeof tel == "undefined") {
                alert("手机号码为空");
                return;
            } else {
                if (!telCheck) {
                    alert("您输入的手机号码有误");
                    return;
                } else {
                    $http({
                        data: tel,
                        method: 'get',
                        url: APITitle + 'api/Regist_Login/GetInformation?Phone=' + tel,
                    }).then(function success(data) {
                        var pData = eval('(' + data.data + ')');
                        var lCity = pData.response;
                        writeCookie("postArea", lCity[tel].detail.area[0].city);
                    })

                    $scope.disable = true;
                    $scope.haveTime = "60\u79D2";
                    var sTime = haveGetTxtTime;
                    var s = APITitle + "api/Regist_Login/Regist";
                    console.log(tel);
                    var result = "Phone=" + tel;
                    $http({
                        data: result,
                        method: "post",
                        url: s
                        //这里的callback是angular自动生成的，JSON_CALLBACK代表着自动生成的回调函数名
                    }).then(function success(data) { }, function error(e) {
                        console.log("\u5931\u8D25\u539F\u56E0\uFF1A" + e);
                    });
                    var beginTime = $interval(function () {
                        sTime--;
                        console.log(sTime);
                        if (sTime <= 0) {
                            $scope.disable = false;
                            sTime = haveGetTxtTime;
                            $interval.cancel(beginTime);
                            return;
                        } else {
                            $scope.haveTime = sTime + "\u79D2";
                            return sTime;
                        }
                    }, 1000);
                }
            }
        };

        $scope.signIn = function () {

            // Setting a cookie
            expireDate.setDate(expireDate.getDate() + 180);//设置过期时间

            userName = $scope.name;

            namePartten = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/;

            nameCheck = namePartten.test(userName);

            tel = $scope.tels;

            partten = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;

            telCheck = partten.test(tel);

            if (tel == "" || typeof tel == "undefined") {
                alert("手机号码为空");
                return;
            } else if (!telCheck) {
                alert("您输入的手机号码有误");
                return;
            } else if ($scope.checkTxt == "" || typeof $scope.checkTxt == "undefined") {
                alert("请输入验证码");
                return;
            } else if (!$scope.chk) {
                alert("请勾选用户注册协议");
            } else {
                $scope.submit = false;

                monitor = "MobileNum=" + tel + "&UserAction='\u767B\u5F55'&MID=" + mid + "&Url=" + Url + "&Type2=22&CookiesNum=" + cookiesNum + " ";//监控得到参数

                userMonitor(monitor);//提交监控事件

                var verificationData = "Phone=" + tel + "&SMSNum=" + $scope.checkTxt;//验证码的参数
                isFinshed = 0;
                $http({
                    data: verificationData,
                    method: 'post',
                    url: APITitle + "api/Regist_Login/Login" //验证登录 验证码是否正确
                }).then(function success(data) {
                    verificationResult = data.data;
                    // console.log(answerData);

                    isFinshed++;
                    middleMachine();
                });
                $http({
                    data: "",
                    method: 'get',
                    url: APITitle + "api/Questionnaire/CheckAnswerByQNID/2?mobileNum=" + tel  //查看此电话号是否已经填写过问卷
                }).then(function success(data) {
                    answerData = data.data;
                    //console.log(verificationResult);
                    isFinshed++;
                    middleMachine();
                });
            }
        };
        $scope.imgIsshow = false;

        $scope.erWeimaIsShow = function (e) {
            if (e == 0) {
                $scope.imgIsshow = true;

            }
            if (e == 1) {
                $scope.imgIsshow = false;

            }
        }

        function middleMachine() {
            if (isFinshed == 2) {
                if (verificationResult == 'true') {//如果验证码正确
                    $cookies.put("userTel", "" + tel, { 'expires': expireDate });//写入cookie操作；
                    $cookies.put("login", "1", { 'expires': expireDate });//写入cookie操作；


                    if (answerData.length > 0) {//如果有之前的数据（登录）

                        AB_ID = answerData[0].AB_ID;

                        window.location.href = jumpUrl + "?" + "&AB_ID=" + AB_ID;

                        $scope.submit = true;

                    } else {
                        window.location.href = "questionPage2_1.html";
                    }

                }
                else {
                    alert('验证码输入错误');
                    $scope.submit = true;
                }
            }

        }
        function userMonitor(result2) {
            $http({
                data: result2,
                method: 'post',
                url: APIUrl //监控用户行为
            }).then(function success(data) { })
        }

        function onload() {
            var login = $cookies.get("login");
            tel = $cookies.get("userTel");
            if (mid != "" && mid != null && mid != undefined) {
                setCookie("mid", mid)
            }
            $scope.submit = true;
            if (login == '1' && tel != "" && tel != null && tel != undefined) {
                $http({
                    data: "",
                    method: 'get',
                    url: APITitle + "api/Questionnaire/CheckAnswerByQNID/2?mobileNum=" + tel
                }).then(function success(data) {
                    if (data.data.length > 0) {
                        AB_ID = data.data[0].AB_ID;
                        window.location.href = jumpUrl + "?" + "&AB_ID=" + AB_ID;
                    }
                });
            }
        }
    }]);
})(angular);