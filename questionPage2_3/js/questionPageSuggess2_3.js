"use strict";

/*
AS_ID id
limit 额度
interest 利息
monthlySupply 月供
Fore_Filed1 利率
Fore_Filed2 图片地址
Name 名字
*/
var resultArry = [];
var allListArry = [];

var type1Arry = [];

var type2Arry = [];

$(function () {



    var r1 = 0;
    var r2 = 0;

    $("#successJump").hide();
    var result = getUrlParam("value");

    var AB_ID = getUrlParam("AB_ID");
    var userTel = getCookie("userTel");
    var loanTime = getUrlParam("loanTime");

    var APITitle = "http://mes.jubao360.cn/"; //http://123.56.229.241:8003/http://mes.jubao360.cn/"http://localhost:54087;

    var resultListAPI = "" + APITitle + "" + "api/API_Supplier_Relation/GetListForStatus";

    var submitAPI = APITitle + "api/API_Supplier_Relation/Insert";

    var retultTypeListAPI = APITitle + "api/Questionnaire/Recommend2/" + AB_ID;

    var backAPIUrl = APITitle + "api/Questionnaire/CheckAnswerByQNID/2?mobileNum=" + userTel;
    
    var limit ;

    var limitValue, resultArryK;

    var resultAS_ID;


    var money = void 0,
        ID = void 0,
        workTime = void 0,
        jobType = void 0,
        qualifications = void 0,
        revenue = void 0, restData;




    if (AB_ID == "" || AB_ID == null || AB_ID == undefined || userTel == "" || userTel == undefined || userTel == null) {
        window.location.href = "questionPage2_2.html";
    }


    $.ajax({
        url: retultTypeListAPI,
        type: "get",
        data: AB_ID,
        success: function success(data) {
            $("#ADVlength").text(data.length);
            console.log(data);
            allListArry = data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].Status == 1) {
                            type1Arry.push(data[i].AS_ID);
                } else if (data[i].Status == 2) {
                    type2Arry.push(data[i].AS_ID);
                        }
                //console.log(i)
            }
            r1++;
           // console.log('1212')
             
            setAdvDate();

        }
    });

    $.ajax({
        type: 'get',
        url: backAPIUrl,
        data: {},
        success: function success(data) {
            r1++;
            AB_ID = data[0].AB_ID;
             restData = data;
            for (var i = 0; i < restData.length; i++) {
                if(restData[i].AB_ID==AB_ID){
                    if (restData[i].QID == 7) {
                        writeCookie("userName", restData[i].Value);
                        $("#name").val(restData[i].Value);
                    }
                    if (restData[i].QID == 5) {
                        limit = restData[i].Value;
                    }
                    if (restData[i].QID == 6) {
                        loanTime = restData[i].Value;
                    }
                    if (restData[i].QID == 8) {
                        ID = restData[i].Value;
                    }
                    if (restData[i].QID == 9) {
                        var tCity = restData[i].Value + '市';
                        writeCookie("nowCity", tCity);
                    }
                    if (restData[i].QID == 10) {
                        workTime = restData[i].Value;
                    }
                    if (restData[i].QID == 11) {
                        jobType = restData[i].Value;
                    }
                    if (restData[i].QID == 22) {
                        qualifications = restData[i].Value;
                    }
                    if (restData[i].QID == 12) {
                        revenue = restData[i].Value;
                    }
                }
            }

                switch (loanTime) {
                    case "0":
                        loanTime = 1;
                        break;
                };

                limitValue = limit;
                switch (limit) {
                    case "5000":
                        limit = "5千";
                        break;
                    case "20000":
                        limit = "2万";
                        break;
                    case "50000":
                        limit = "5万";
                        break;
                    case "200000":
                        limit = "20万";
                        break;
                    case "200001":
                        limit = "20万";
                        break;
                }
                setAdvDate();
                return restData = data;
            }
        
    })
    console.log(restData);
    console.log(allListArry);

    //循环查找两个数组对应的值

    $(".main #submit").click(function () {
        var advArry = [];

        var reslutType2Arry = [];

        r2 = 0;

        console.log($(".y_checkbox[type=\"checkbox\"]:checked"));
        for (var i = 0; i < $(".y_checkbox[type=\"checkbox\"]:checked").length; i++) {

            advArry.push($(".y_checkbox[type=\"checkbox\"]:checked").eq(i).attr("data-value"));
        }
        console.log(advArry);
        console.log(type2Arry);
        for (var i = 0; i < advArry.length; i++) {
           console.log(type2Arry.indexOf(advArry[i]));
           if (type2Arry.indexOf(parseInt(advArry[i])) != -1) {
                reslutType2Arry.push(advArry[i]);
            }
        };
        console.log(reslutType2Arry);
        if (reslutType2Arry.length > 0) {

            $(".main #submit").hide();

            $(".load-3").show();            
            console.log(type2Arry);
            console.log(resultArry);
            var needAs_ID = resultArry[0];
            for (var i = 0; i < allListArry.length;i++){
                if (allListArry[i].AS_ID == needAs_ID) {
                    resultArryK = allListArry[i].Fore_Filed3;
                    resultAS_ID == allListArry[i].AS_ID

                }
            }

                    advArry = advArry.join(',');

                    var cul = getCookie("curl");

                    var preurl = getCookie("preurl");

                    var mid = getCookie("mid");

                    var Url = window.location.href;

                    var tel = getCookie("userTel");
                    var cookiesNum = getCookie("cookiesNum");

                    var result2 = "MobileNum=" + tel + "&cul=" + cul + "&MID=" + mid + "&Url=" + Url + "&Type2=25"  + "&preurl=" + preurl + "&CookiesNum=" + cookiesNum;
                    //alert(allListArry);
                    $.ajax({
                        data: result2,
                        type: 'post',
                        url: APITitle + "api/Regist_Login/Ins_User",
                        success: function success(data) {
                            console.log("JX", data);
                            jumpTo(resultArryK);
                        }
                    });
                    $.ajax({  //提交所有点击列表
                        url: submitAPI,
                        type: "post",
                        data: {
                            AS_ID: advArry,
                            AB_ID: AB_ID
                        },
                        success: function success(data) {
                            jumpTo(resultArryK);

                        }
                    });
                    $.ajax({
                        type: "post",
                        url: APITitle + 'api/API_Supplier_Relation/Insert_AS_ID',
                        data: {
                            AB_ID: AB_ID,
                            AS_ID: needAs_ID
                        },
                        success: function success(data) {
                            jumpTo(resultArryK);
                        }
                    })

        } else {
            $("#error").show();
        }
    });


    function jumpTo(resultArryK) {
        r2++;
        if (r2==3) {
            
            window.location.href = resultArryK;
            $(".main #submit").show();
            $(".load-3").hide();
        }
    }

    $("#back").click(function () {
        window.location.href = "questionPage2_2.html?AB_ID=" + AB_ID;
    });
    $(".rest").click(function () {
        console.log(restData)
        var money = void 0,
            ID = void 0,
            workTime = void 0,
            jobType = void 0,
            qualifications = void 0,
            revenue = void 0,
            result = void 0;

                for (var i = 0; i < restData.length; i++) {
                    if (restData[i].QID == 7) {
                        writeCookie("userName", restData[i].Value);
                    }
                    if (restData[i].QID == 5) {
                        money = restData[i].Value;
                    }
                    if (restData[i].QID == 6) {
                        loanTime = restData[i].Value;
                    }
                    if (restData[i].QID == 10) {
                        workTime = restData[i].Value;
                    }
                    if (restData[i].QID == 11) {
                        jobType = restData[i].Value;
                    }

                }
                console.log(money, workTime, jobType, revenue, ID);
                window.location.href = "questionPage2_1.html?AB_ID=" + AB_ID;
    });
    $("#error .y_btn").click(function () {
        $("#error").hide();
    });
    $(".cTrleft").on('click', function () {

    })
    function setAdvDate() {
        //type2Arry, type1Arry, allListArry, limit, limitValue, loanTime
        //console.log(type1Arry);
        //console.log(r1.length, r1, r2, r2.length);
        if (r1 >=2) {
            // console.log('有一个没执行完');
            //console.log('两个都执行完');
            if (type2Arry.length == 0) {
                $("#pChose").hide();
            } else if (type1Arry.length == 0) {
                $("#tChose").hide();
            }
            appendHtmlType(type2Arry, allListArry, "#pChose", limit, limitValue, loanTime);
            appendHtmlType(type1Arry, allListArry, "#tChose", limit, limitValue, loanTime, "checked");
        }

    }
});
function addordelArry(e) {
    
  
        var cResult = e.attr("data-value");
        if (type2Arry.indexOf(parseInt(cResult)) != -1) {
            if (resultArry.indexOf(cResult) == -1) {
                resultArry.push(cResult);
            }
            else {
                resultArry.splice(resultArry.indexOf(cResult), 1);
            }
        
        }



}


function appendHtmlType(typeArry, allListArry, e, limit, limitValue, loanTime, checked) {
    for (var i = 0; i < typeArry.length; i++) {
        for (let j = 0; j < allListArry.length; j++) {
            if (typeArry[i] == allListArry[j].AS_ID) {
                var interest = parseInt(limitValue * allListArry[j].Fore_Filed1) * loanTime;
                var monthlySupply = parseInt((interest + parseInt(limitValue)) / loanTime);

                var tabArry = [];
                var spanHtml = "";

                if (allListArry[j].Fore_Filed4 != "") {
                    console.log(allListArry[j].Fore_Filed4);
                    if (allListArry[j].Fore_Filed4 == null || allListArry[j].Fore_Filed4 == "" || allListArry[j].Fore_Filed4 == undefined) {
                        allListArry[j].Fore_Filed4 = "";
                    } else {
                        tabArry = allListArry[j].Fore_Filed4.split('，');

                        for (var k = 0; k < tabArry.length; k++) {
                            var b = "<span>" + tabArry[k] + "</span>";
                            spanHtml = spanHtml + b;
                            //console.log(tabArry[k]);
                        }
                    }
                }
                $(e).append("\n           <div class =\"contentTr\">\n            <input class =\"tUrl\" type=\"hidden\" value=\"" + allListArry[j].Fore_Filed3 + "\" />\n                <div class=\"trInfo\">\n                    <div class=\"cTrleft\">\n                        <input type=\"checkbox\" class=\"y_checkbox \" data-value=\"" + allListArry[j].AS_ID + "\" " + checked + " onclick=\"addordelArry($(this))\">\n                    </div>\n                    <div class=\"cTrright\">\n                        <div class=\"rInfo\">\n                            <div class=\"rImg\">\n                                <img src=\"" + allListArry[j].Fore_Filed2 + "\" />\n                            </div>\n                            <div class=\"Recommendation \">\n                                <span>" + allListArry[j].Name + "</span>\n                                <div>\n                                    <span class=\"fontColor_Yellow\">\u2605\u2605\u2605\u2605\u2605</span>\n                                </div>\n                            </div>\n                            <div class =\"tab\">\n                           " + spanHtml + "\n                            </div>\n\n                                <div class=\"interest trHeight\">\n                                    <div class=\"t1\">\n                                    <span class=\"font_blue\">\u9884\u4F30\u53EF\u501F:</span>\n                                    <span class =\"fontColor_Yellow instertValue\">" + limit + "\u5143</span>\n                                    </div>\n                                    <div class=\"t1\">\n                                        <span class =\"font_blue\">\u671F\u9650:</span>\n                                        <span class=\"fontColor_Yellow mouthSupply\" id=\"loanTime\">" + loanTime + "\u4E2A\u6708</span>\n                                    </div>\n\n                                </div>\n                            <div class=\"interest trHeight\">\n                                <div class=\"t1\">\n                                    <span class=\"font_blue\">\u6700\u4F4E\u5229\u606F:</span>\n                                    <span class =\"fontColor_Yellow mouthSupply\" id=\"limit\">" + interest + "\u5143</span>\n                                </div>\n                                <div class=\"t1\">\n                                    <span class =\"font_blue\">\u6708\u4F9B:</span>\n                                    <span class =\"fontColor_Yellow mouthSupply\" id=\"mouthSupply\">" + monthlySupply + "\u5143</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n");
            }
        }
    }
}

function finallyJump(loadJumpUlr) {
    $("#successJump").show();

    var time = 3
    var countDown = setInterval(function () {
        time--;
        console.log(time);
        if (time > 0) {
            $(".loading_text span").text(time);
            $(".blue_text span").text(time)
        }
        else {
            window.location.href = loadJumpUlr;
        }
    }, 1000)

    $(".main #submit").show();
    $(".load-3").hide();
}