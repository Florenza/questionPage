/*
*获取URL参数
*/
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r !== null) return unescape(r[2]); return null; //返回参数值
}
/*
*写入cookies
*name cookies名字
*value cookies值
*exp cookies过期时间
*/
function setCookie(name, value, exp) {

    if (typeof (exp) === "undefined") {
        exp = getcookieexpTime();
    }
    else {
        exp = new Date(exp);
    }
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
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

/*
*生成过期时间
*/
function getcookieexpTime() {
    var date1 = new Date("2030-12-31 23:59:59");
    return date1;
}

/*
*写入LocalStorage
*/
function setLocalStorage(name, value) {
    localStorage["" + name + ""] = value;
}

/*
*读取LocalStorage
*/
function getLocalStorage(name) {
    var values = localStorage["" + name + ""];
    return values;
}
/*
*读取汉字cookie
*/
function readCookie(name) {
    var cookieValue = "";
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end))
        }
    }
    return cookieValue;
}

/*
*写入汉字cookie
*/
function writeCookie(name, value, hours) {
    var expire = "";
    if (hours != null) {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire;
}





