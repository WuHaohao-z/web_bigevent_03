// 在发起$.get $.post $.ajax请求时加载，以便更改路径
var baseURL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
    // 给有/my请求头配置
    if(options.url.indexOf("/my/") !== -1){
        options.headers = {
        Authorization:localStorage.getItem('token') || ''
        }
    }
    // 拦截所有相应，判断身份认证信息
    options.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if(obj.status == 1 && obj.message == "身份认证失败！"){
            localStorage.removeItem("token");
            location.href = "/login.html"
        }
    }
    
})