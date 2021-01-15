// 入口函数
$(function(){
    // 点击登录去注册的框子
    $("#link_reg").on('click',function () {
        $(".login_box").hide();
        $(".reg_box").show();
    })
    // 点击注册去登录的框子
    $("#link_login").on('click',function () {
        $(".reg_box").hide();
        $(".login_box").show();
    })

    // 正则验证
    var form = layui.form;
    form.verify({
        unm:[/^[\S]{2,}$/,'用户名要输入两位以上'],
        pwd:[/^[\S]{6,12}$/,'密码由6到12位组成'],
        repwd:function (value) {
            var pwd = $("#form_reg [name=password]").val().trim();
            if(pwd !== value){
                return '两次输入的密码不一致'
            }
        }
    })
    
    // 监听注册提交事件，并发起ajax请求
    $("#form_reg").on("submit",function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 获取layui弹出框的样子
        var layer = layui.layer;
        var data = {
            username:$("#form_reg [name=username]").val().trim(),
            password:$("#form_reg [name=password]").val().trim()
        }
        // 发起ajax请求
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: data,
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功!')
                // 清空表单内容
                $("#form_reg")[0].reset();
                // 跳转到登陆页面
                $("#link_login").click();
            }
        });
    })

    // 监听登录提交时间，并发起ajax请求
    $("#form_login").on("submit",function(e) {
        // 为什么要组织默认行为
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $("#form_login").serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                // 获得有权限接口的身份认证
                localStorage.setItem('token',res.token);
                location.href = '/index.html'
            }
        });
    })
})
