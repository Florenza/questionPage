
var _hmt = _hmt || [];
PvImg();//调用PVUV函数；


(function () {
   // console.log(2);
    var hm = document.createElement("script");

    hm.src = "https://hm.baidu.com/hm.js?49a13640af24bd7055d9c12f90771907";

    var s = document.getElementsByTagName("script")[0];

    s.parentNode.insertBefore(hm, s);

})();
/*
*写入PV UV
*/
function PvImg() {
    //console.log(1);
    var a = location.pathname;

    var b = a.split("/");

    var c = b.slice(b.length - 1, b.length).toString(String).split(".");

    var pageName = c.slice(0, 1);

    var cul = getCookie("curl");

    var preurl = getCookie("preurl");

    var mid = getCookie("mid");

    var Url = window.location.href;

    var tel = getCookie("userTel");

    var cookiesNum = getCookie("cookiesNum");

    var result2 = "http://mes.jubao360.cn/api/PageMonitor?mid=" + mid + "&pagename=" + pageName + "&mobilenum=" + tel + "&cookiesnum=" + cookiesNum + "&url=" + Url;
    var img = new Image();
    img.onload = function () {
        document.body.appendChild(Img);
    }

    img.src = result2;
}
/*
*读取cookies
*name cookies名字
*/
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}