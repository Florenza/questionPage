$(function () {
    let jumpUrl = "http://www.baidu.com";
    let curl = "questionPage2_3.html"
    let url = getUrlParam("url");
    url = unescape(url);

    if (url != "" && url != null && url != undefined) {
        jumpUrl = url;
       // alert(url);
    }
    else {
       window.location.href = curl;
    }
    var time = 3
    var countDown = setInterval(function () {
        time--;
        console.log(time);
        if (time > 0) {
            $(".loading_text span").text(time);
            $(".main .option .blue_text span").text(time)
        }
        else {
            window.location.href = jumpUrl;
        }
    }, 1000)
})