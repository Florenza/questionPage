"use strict";

$(function () {
    var APITitle = "http://mes.jubao360.cn/"; //"http://mes.jubao360.cn/"//"http://localhost:54087/"http://123.56.229.241:8003/
    var APIUrl = APITitle + "api/Questionnaire/Post2";
    var userTel = readCookie("userTel");
    var userName = readCookie("userName");
    var nowCity = void 0,
        cookieAB_ID = void 0;
    var AB_ID = getUrlParam("AB_ID");
    setCookieAB_ID(AB_ID);

    //if (AB_ID != "" && AB_ID != null && AB_ID != undefined&&AB_ID!=0) {
    //    setCookie("cookieAB_ID", AB_ID);
    //}
    $("#scroller_view").hide();

    if (userTel == "" || userTel == undefined || userTel == null) {
        window.location.href = "index.html";
    }

    if (userName == "" || userName == undefined || userName == null || userName == "undefined") {
        userName = "";
    } else {
        $("#name").val(userName);
    }

    if (readCookie("nowCity") == null | readCookie("nowCity") == "") {
        nowCity = readCookie("postArea");
    } else {
        nowCity = readCookie("nowCity");
    };
    if (window.location.search != "" && window.location.search != null && window.location.search != undefined) {
        var pMoney = getUrlParam("money");
        switch (pMoney) {
            case "5000":
                pMoney = "5千以下";
                break;
            case "20000":
                pMoney = "1万~2万";
                break;
            case "10000":
                pMoney = "5千~1万";
                break;
            case "50000":
                pMoney = "2万~5万";
                break;
            case "200000":
                pMoney = "5万~20万";
                break;
            case "200001":
                pMoney = "20万以上";
                break;
        }

        var pLoanTime = getUrlParam("loanTime");
        switch (pLoanTime) {
            case "0":
                pLoanTime = "1个月以内";
                break;
            case "1":
                pLoanTime = "1个月";
                break;
            case "3":
                pLoanTime = "3个月";
                break;
            case "6":
                pLoanTime = "6个月";
                break;
            case "12":
                pLoanTime = "12个月";
                break;
            case "24":
                pLoanTime = "24个月";
                break;
        }

        var pWorkTime = getUrlParam("workTime");
        switch (pWorkTime) {
            case "0.5":
                pWorkTime = "5个月以内";
                break;
            case "1":
                pWorkTime = "6个月~12个月";
                break;
            case "3":
                pWorkTime = "1年~3年";
                break;
            case "7":
                pWorkTime = "3年~7年";
                break;
            case "8":
                pWorkTime = "7年以上";
                break;
        }

        var pJobType = getUrlParam("jobType");
        switch (pJobType) {
            case "1":
                pJobType = "上班族";
                break;
            case "2":
                pJobType = "个体户";
                break;
            case "3":
                pJobType = "无固定职业";
                break;
            case "4":
                pJobType = "企业主";
                break;
            case "5":
                pJobType = "学生";
                break;
        }

        var pRevenue = getUrlParam("revenue");
        switch (pRevenue) {
            case "3000":
                pRevenue = "3千以下";
                break;
            case "7000":
                pRevenue = "3千~7千";
                break;
            case "20000":
                pRevenue = "7千~2万";
                break;
            case "50000":
                pRevenue = "2万~5万";
                break;
            case "50001":
                pRevenue = "5万以上";
                break;
        }
        var pQualifications = getUrlParam("qualifications");
        switch (pQualifications) {
            case "4":
                pQualifications = "硕士及研究生以上";
                break;
            case "3":
                pQualifications = "本科";
                break;
            case "2":
                pQualifications = "大专";
                break;
            case "1":
                pQualifications = "中专/高中及以下";
                break;
        }
        var pIDNum = getUrlParam("ID");
        if (pIDNum != "" && pIDNum != null && pIDNum != undefined) {
            $("#ID").val(pIDNum);
        }
        $("#money").find("option[value='" + pMoney + "']").attr("selected", true);
        $("#loanTime").find("option[value='" + pLoanTime + "']").attr("selected", true);
        $("#workTime").find("option[value='" + pWorkTime + "']").attr("selected", true);
        $("#jobType").find("option[value='" + pJobType + "']").attr("selected", true);
        $("#revenue").find("option[value='" + pRevenue + "']").attr("selected", true);
        $("#qualifications").find("option[value='" + pQualifications + "']").attr("selected", true);
    }

    var liveCity = $("#liveCity").text(nowCity);
    $("#name").focus(function () {
        $("#userName").removeClass("y_error y_errorShake");
        $("#nameError").hide();
    });
    $("#ID").focus(function () {
        $("#IDcard").removeClass("y_error y_errorShake");
        $("#IDcardError").hide();
    });

    $("#liveCity").click(function () {

        var IDNum = $("#ID").val();
        if (AB_ID == "" || AB_ID == undefined || AB_ID == null) {
            AB_ID = 0;
        }
        var money = $("#money option:selected").val();

        userName = $("#name").val();

        writeCookie("userName", "" + userName);

        switch (money) {
            case "5千以下":
                money = 5000;
                break;
            case "5千~1万":
                money = 10000;
                break;
            case "1万~2万":
                money = 20000;
                break;
            case "2万~5万":
                money = 50000;
                break;
            case "5万~20万":
                money = 200000;
                break;
            case "20万以上":
                money = 200001;
                break;
        }

        var loanTime = $("#loanTime option:selected").val();

        switch (loanTime) {
            case "1个月以内":
                loanTime = 0;
                break;
            case "1个月":
                loanTime = 1;
                break;
            case "3个月":
                loanTime = 3;
                break;
            case "6个月":
                loanTime = 6;
                break;
            case "12个月":
                loanTime = 12;
                break;
            case "24个月":
                loanTime = 24;
                break;
        }

        var workTime = $("#workTime option:selected").val();

        switch (workTime) {
            case "5个月以内":
                workTime = 0.5;
                break;
            case "6个月~12个月":
                workTime = 1;
                break;
            case "1年~3年":
                workTime = 3;
                break;
            case "3年~7年":
                workTime = 7;
                break;
            case "7年以上":
                workTime = 8;
                break;
        }

        var jobType = $("#jobType option:selected").val();

        switch (jobType) {
            case "上班族":
                jobType = 1;
                break;
            case "个体户":
                jobType = 2;
                break;
            case "无固定职业":
                jobType = 3;
                break;
            case "企业主":
                jobType = 4;
                break;
            case "学生":
                jobType = 5;
                break;
        }

        var revenue = $("#revenue option:selected").val();
        switch (revenue) {
            case "3千以下":
                revenue = 3000;
                break;
            case "3千~7千":
                revenue = 7000;
                break;
            case "7千~2万":
                revenue = 20000;
                break;
            case "2万~5万":
                revenue = 50000;
                break;
            case "5万以上":
                revenue = 50001;
                break;
        }

        window.location.href = "questionCity.html?AB_ID=" + AB_ID + "&&money=" + money + "&loanTime=" + loanTime + "&workTime=" + workTime + "&jobType=" + jobType + "&revenue=" + revenue + "&ID=" + IDNum;
    });

    $(".next").click(function () {
        var vMoney = $("#money option:selected").attr("data-value");

        var vLoanTime = $("#loanTime option:selected").attr("data-value");

        var vWorkTime = $("#workTime option:selected").attr("data-value");

        var vJobType = $("#jobType option:selected").attr("data-value");

        var vRevenue = $("#revenue option:selected").attr("data-value");

        var vQualifications = $("#qualifications option:selected").attr("data-value");

        var name = $("#name").val();

        var ID = $("#ID").val();

        var checkLiveCity = $("#liveCity").text();

        if (name == "" && ID == "") {
            $("#userName").addClass("y_error y_errorShake");
            $("#nameError").show();
            $("#IDcard").addClass("y_error y_errorShake");
            $("#IDcardError").show();
            setTimeout(function () {
                $("#userName").removeClass("y_errorShake");
                $("#nameError").removeClass("y_errorShake");
            }, 1000);
            return;
        } else if (name == "" || name == null || name == undefined) {
            $("#userName").addClass("y_error y_errorShake");
            $("#nameError").show();
            setTimeout(function () {
                $("#userName").removeClass("y_errorShake");
            }, 1000);
            return;
        } else if (ID == "" || ID == null || ID == undefined) {
            $("#IDcard").addClass("y_error y_errorShake");
            $("#IDcardError").show();
            setTimeout(function () {
                $("#IDcard").removeClass("y_errorShake");
            }, 1000);
            return;
        } else if (vMoney == 0) {
            alert("请选择贷款金额");
            return;
        } else if (vQualifications == 0) {
            alert("请选择教育程度");
            return;
        } else if (vLoanTime == 0) {
            alert("请选择贷款期限");
            return;
        } else if (vWorkTime == 0) {
            alert("请选择工作年限");
            return;
        } else if (vJobType == 0) {
            alert("请选择您的职业");
            return;
        } else if (vRevenue == 0) {
            alert("请选择您的收入");
            return;
        } else {
            $(".submit .next").hide();
            $("#loading").show();
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (checkIdcard(ID) === false) {
                $(".submit .next").show();
                $("#loading").hide();
                $("#IDcardError").text("您输入的不是有效身份证号");
                $("#IDcard").addClass("y_error y_errorShake");
                $("#IDcardError").show();
                setTimeout(function () {
                    $("#IDcard").removeClass("y_errorShake");
                }, 1000);
                return;
            }
            var money = $("#money option:selected").val();

            switch (money) {
                case "5千以下":
                    money = 5000;
                    break;
                case "1万~2万":
                    money = 20000;
                    break;
                case "5千~1万":
                    money = 10000;
                    break;
                case "2万~5万":
                    money = 50000;
                    break;
                case "5万~20万":
                    money = 200000;
                    break;
                case "20万以上":
                    money = 200001;
                    break;
            }

            var qualifications = $("#qualifications option:selected").val();

            switch (qualifications) {
                case "中专/高中及以下":
                    qualifications = 1;
                    break;
                case "大专":
                    qualifications = 2;
                    break;
                case "本科":
                    qualifications = 3;
                    break;
                case "硕士及研究生以上":
                    qualifications = 4;
                    break;
            }
            var loanTime = $("#loanTime option:selected").val();

            switch (loanTime) {
                case "1个月以内":
                    loanTime = 0;
                    break;
                case "1个月":
                    loanTime = 1;
                    break;
                case "3个月":
                    loanTime = 3;
                    break;
                case "6个月":
                    loanTime = 6;
                    break;
                case "12个月":
                    loanTime = 12;
                    break;
                case "24个月":
                    loanTime = 24;
                    break;
            }

            var _userTel = getCookie("userTel");

            liveCity = $("#liveCity").text();
            writeCookie("userName");
            liveCity = liveCity.replace("市", '');
            // alert(liveCity);
            var workTime = $("#workTime option:selected").val();

            switch (workTime) {
                case "5个月以内":
                    workTime = 0.5;
                    break;
                case "6个月~12个月":
                    workTime = 1;
                    break;
                case "1年~3年":
                    workTime = 3;
                    break;
                case "3年~7年":
                    workTime = 7;
                    break;
                case "7年以上":
                    workTime = 8;
                    break;
            }

            var jobType = $("#jobType option:selected").val();

            switch (jobType) {
                case "上班族":
                    jobType = 1;
                    break;
                case "个体户":
                    jobType = 2;
                    break;
                case "无固定职业":
                    jobType = 3;
                    break;
                case "企业主":
                    jobType = 4;
                    break;
                case "学生":
                    jobType = 5;
                    break;
            }

            var revenue = $("#revenue option:selected").val();
            switch (revenue) {
                case "3千以下":
                    revenue = 3000;
                    break;
                case "3千~7千":
                    revenue = 7000;
                    break;
                case "7千~2万":
                    revenue = 20000;
                    break;
                case "2万~5万":
                    revenue = 50000;
                    break;
                case "5万以上":
                    revenue = 500001;
                    break;
            }

            //let formData = `"QNID":5,"QID_5":${money},"QID_6":${loanTime},"QID_7":${name},"QID_8":${ID},"QID_9":${liveCity},"QID_10":${workTime},"QID_11":${jobType},"QID_12":${revenue}`;

            //console.log(formData);
            cookieAB_ID = getCookie("cookieAB_ID");

            if (cookieAB_ID != "" && cookieAB_ID != null && cookieAB_ID != undefined) {
                AB_ID = cookieAB_ID;
            }
            JXmorie(APITitle, '23');
            $.ajax({
                type: 'post',
                url: APIUrl,
                data: {
                    QNID: 2,
                    AB_ID: AB_ID,
                    QID_5: "" + money + "",
                    QID_6: "" + loanTime + "",
                    QID_7: "" + name + "",
                    QID_8: "" + ID + "",
                    QID_9: "" + liveCity + "",
                    QID_10: "" + workTime + "",
                    QID_11: "" + jobType + "",
                    QID_12: "" + revenue + "",
                    postArea: "" + liveCity + "",
                    MobileNum: "" + _userTel + "",
                    QID_22: "" + qualifications + ""
                },
                success: function success(data) {

                    AB_ID = JSON.parse(data.Msg).AB_ID;

                    setCookieAB_ID(AB_ID);

                    window.location.href = "questionPage2_2.html?AB_ID=" + AB_ID + "&limit=" + money + "&loanTime=" + loanTime;
                    $(".submit .next").show();
                    $("#loading").hide();
                }

            });
        }
    });
    $("#back").click(function () {
        setCookie("userTel", "");
        window.location.href = "index.html";
    })
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

function setCookieAB_ID(AB_ID) {
    if (AB_ID != null || AB_ID != "" || AB_ID != null || AB_ID != 0) {
        setCookie("cookieAB_ID", AB_ID);
    }
}

function checkIdcard(num) {
    // num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!/(^\d{17}([0-9]|X)$)/.test(num)) {
        // alert('输入的身份证号长度不对，或者号码不符合规定！18位号码末位可以为数字或X。');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = dtmBirth.getYear() == Number(arrSplit[2]) && dtmBirth.getMonth() + 1 == Number(arrSplit[3]) && dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bGoodDay) {
            // alert('输入的身份证号里出生日期不对！');
            return false;
        } else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = dtmBirth.getFullYear() == Number(arrSplit[2]) && dtmBirth.getMonth() + 1 == Number(arrSplit[3]) && dtmBirth.getDate() == Number(arrSplit[4]);
        if (!bGoodDay) {
            // alert('输入的身份证号里出生日期不对！');
            return false;
        } else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                // alert('18位身份证的校验码不正确！应该为：' + valnum);
                return false;
            }
            return true;
        }
    }
    return false;
}