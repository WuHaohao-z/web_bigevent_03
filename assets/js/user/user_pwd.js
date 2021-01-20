$(function () {
     
    var layer = layui.layer;
    var form = layui.form;
    // 为密码框定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格"],
        samePwd:function (value) {
            if(value == $("[name=oldPwd]").val()){
                return "新旧密码不能相同"
            }
        },
        rePwd:function (value) {
            if(value !== $("[name=newPwd]").val()){
                return "两次输入的密码不一致"
            }
        }
    })


    // 发起请求实现重置密码的功能
    // 给form表单绑定 submit 事件，在事件处理函数里面取消默认行为
    $(".layui-form").on("submit",function (e) {
        e.preventDefault();
        $.ajax({
            // 查阅接口文档，利用 $.ajax() 来发送 post 请求
            method: "POST",
            url: "/my/updatepwd",
            // 利用 $(this).serialize() 来设置提交的数据
            data:$(this).serialize(),
            success: function (res) {
                // 如果 服务器返回的 status 不等于0，说明失败，利用 layui.layer.msg 来进行提示
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layui.layer.msg("恭喜，更新成功!")
                // 如果更新成功，重置一下表单内容
                $(".layui-form")[0].reset()
            }
        });
    })

})