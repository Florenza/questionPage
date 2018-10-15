"use strict";

var refUrl = "questionPage2_1.html";

var jumpUrl = "questionPage2_3.html";

var APITitle = "http://mes.jubao360.cn/"; //http://123.56.229.241:8003/http://mes.jubao360.cn/"http://localhost:54087/


var APIUrl = APITitle + "api/Questionnaire/Post2";
$(function () {

    var AB_ID = getUrlParam("AB_ID");

    var loanTime = getUrlParam("loanTime");

    var limit = getUrlParam("limit");

    var money = void 0,
        workTime = void 0,
        jobType = void 0,
        revenue = void 0,
        qualifications=void 0,
        ID = void 0;

    subPage.checkHasAB_ID(AB_ID);

    var userTel = getCookie("userTel");

    var backAPIUrl = APITitle + "api/Questionnaire/CheckAnswerByQNID/2?mobileNum=" + userTel;

    var nowCity = "";
    $.ajax({
        type: 'get',
        url: backAPIUrl,
        data: {},
        success: function success(data) {
            console.log(data);
            var result = void 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].QID == 7) {
                    writeCookie("userName", data[i].Value);
                }
                if (data[i].QID == 5) {
                    money = data[i].Value;
                }
                if (data[i].QID == 6) {
                    loanTime = data[i].Value;
                }
                if (data[i].QID == 8) {
                    ID = data[i].Value;
                }
                if (data[i].QID == 10) {
                    workTime = data[i].Value;
                }
                if (data[i].QID == 11) {
                    jobType = data[i].Value;
                }
                if (data[i].QID == 12) {
                    revenue = data[i].Value;
                }
                if (data[i].QID == 22) {
                    qualifications = data[i].Value;
                }
                if (data[i].QID == 9) {
                    nowCity = data[i].Value + '市';
                    writeCookie("nowCity", nowCity);
                }
                subPage.isNumBack(data[i], 13);
            }

            console.log(money, workTime, jobType, revenue, ID);
        }

    });

    console.log($("#hasWLD").children());
    var hWLD = $("#hasWLD").find(".tab span").hasClass("decide_blue");
    $("#back").click(function () {
        window.location.href = "questionPage2_1.html?AB_ID=" + AB_ID + "&money=" + money + "&loanTime=" + loanTime + "&workTime=" + workTime + "&jobType=" + jobType + "&revenue=" + revenue + "&ID=" + ID + "&qualifications=" + qualifications;
    });

    $(".radioBtn .tab span").on('click', function () {
        subPage.btnCss(this);
    });
    $(".submit .y_btn").click(function () {

        var hCard = $("#hasCard").find(".tab span").hasClass("decide_blue");
        var hasHorse = $("#hasHorse").find(".tab span").hasClass("decide_blue");
        var hasCar = $("#hasCar").find(".tab span").hasClass("decide_blue");
        var hasBaodan = $("#hasBaodan").find(".tab span").hasClass("decide_blue");
        var hasShebao = $("#hasShebao").find(".tab span").hasClass("decide_blue");
        var hasGongjijin = $("#hasGongjijin").find(".tab span").hasClass("decide_blue");

        if (!hCard) {
            alert("请填写是否有信用卡");
            return;
        } else if (!hasHorse) {
            alert("请填写是否有房产");
            return;
        } else if (!hasCar) {
            alert("请填写是否有车");
            return;
        } else if (!hasBaodan) {
            alert("请填写是否有保单");
            return;
        } else if (!hasShebao) {
            alert("请填写是否有社保");
            return;
        } else if (!hasGongjijin) {
            alert("请填写是否有公积金");
            return;
        }
        $(".y_btn").hide();
        $(".load-3").show();
        var applyResult = $(".decide_blue").text().split('');
        var applyResultArry = subPage.replaceString(applyResult);
        JXmorie(APITitle, '24');
        $.ajax({
            type: 'post',
            url: APIUrl,
            data: {
                QNID: 2,
                AB_ID: AB_ID,
                MobileNum: userTel,
                QID_13: "" + applyResultArry[0] + "",

                QID_14: "" + applyResultArry[1] + "",

                QID_15: "" + applyResultArry[2] + "",

                QID_16: "" + applyResultArry[3] + "",

                QID_17: "" + applyResultArry[4] + "",

                QID_18: "" + applyResultArry[5] + "",

                QID_19: "" + applyResultArry[6] + ""

            },
            success: function success(data) {
                console.log(data);
                console.log(AB_ID);

            }
        });
        var jUrl = APITitle + "api/Questionnaire/Recommend/" + AB_ID;
        $.ajax({
            type: 'get',
            url: jUrl,
            data: {
                AB_ID: AB_ID
            },
            success: function success(data) {
                console.log(data);
                var str = "a";
                var vData = data;
                for (var i = 0; i < vData.length; i++) {
                    str += vData[i].Value + "a";
                }
                window.location.href = jumpUrl + "?value=" + str + "&AB_ID=" + AB_ID + "&limit=" + limit + "&loanTime=" + loanTime;
                $(".y_btn").show();
                $(".load-3").hide();
                // window.location.href = `${j{umpUrl}?AB_ID=${AB_ID}`;
            }
        });
    });
});

function JXmorie(APITitle, type2) {
    var cul = getCookie("curl");

    var preurl = getCookie("preurl");

    var mid = getCookie("mid");

    var Url = window.location.href;

    var tel = getCookie("userTel");
    var cookiesNum = getCookie("cookiesNum");

    var result2 = "MobileNum=" + tel + "&cul=" + cul + "&MID=" + mid + "&Url=" + Url + "&Type2=" + type2 + "&preurl=" + preurl + "&CookiesNum=" + cookiesNum;

    $.ajax({
        data: result2,
        type: 'post',
        url: APITitle + "api/Regist_Login/Ins_User",
        success: function success(data) {
            console.log("JX", data);
        }
    });
}
var subPage = {
    checkHasAB_ID: function checkHasAB_ID(checkID) {
        if (checkID == "" || checkID == null || checkID == undefined) {
            window.location.href = refUrl;
        }
    },
    btnCss: function btnCss(e) {
        $(e).addClass("decide_blue").siblings().removeClass("decide_blue");
        var decideValue = $(e).attr("data-id");
        $("#radioBtnValue").val(decideValue);
    },
    replaceString: function replaceString(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace("是", "y");
            arr[i] = arr[i].replace("否", "n");
        }
        return arr;
    },
    isNumBack: function isNumBack(data, i) {

        if (data.QID == i) {
            this.backResult(data.QID, data.Value);
        } else if (data.QID == i + 1) {
            this.backResult(data.QID, data.Value);
        } else if (data.QID == i + 2) {
            this.backResult(data.QID, data.Value);
        } else if (data.QID == i + 3) {
            this.backResult(data.QID, data.Value);
        } else if (data.QID == i + 4) {
            this.backResult(data.QID, data.Value);
        } else if (data.QID == i + 5) {
            this.backResult(data.QID, data.Value);
        } else if (data.QID == i + 6) {
            this.backResult(data.QID, data.Value);
        }
    },
    backResult: function backResult(i, dataValue) {

        
        var id = i - 12;
        var isDecided=$(".content .content_tr").eq(id).find(".tab span").hasClass("decide_blue");
        if (!isDecided) {
            if (dataValue == "y") {
                $(".content .content_tr").eq(id).find(".tab span").eq(0).addClass("decide_blue");
            } else {
                $(".content .content_tr").eq(id).find(".tab span").eq(1).addClass("decide_blue");
            }
        }
    }
};