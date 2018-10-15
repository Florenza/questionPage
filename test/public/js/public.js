//监控 代码

var monitor = {
    ajaxJump:function (url, type, ApITitle) {
       let mid = getCookie('mid');
       var MobileNum = getCookie('userTel');
       let curl = url;
       let result2 = `MobileNum=${MobileNum}&MID=${mid}&Url=${curl}&Type2=${type}`;
       $.ajax({
           type: 'post',
           url: ApITitle + "api/Regist_Login/Ins_User",
           data: result2,
           success: function () {
               window.location.href = `${url}`;
           }
       })
    }
}