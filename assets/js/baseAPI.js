// 在发起$.get $.post $.ajax请求时加载，以便更改路径
var baseURL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url
})