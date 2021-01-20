$(function () {
    
    var layer = layui.layer
    var form = layui.form
    // 校验表单数据
    form.verify({
        ninkname:function (value) {
            if(value.length > 6) {
                return layer.msg("昵称长度必须在1~6位个字符之间")
            }
        }
    })

    // 初始化用户的基本信息
    initUserInfo()
    function initUserInfo() {
        // 调用 $.ajax() 获取用户基本信息
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // 如果返回的 status 为0，那么代表成功，如果不等于，代表失败，利用 layer进行提示
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val("formUserInfo",res.data)
            }
        });
    }

    // 重置表单的数据
    $("#btnReset").on("click",function (e) {
        e.preventDefault();
        initUserInfo()
    })


    // 发起请求更新用户的信息
    $(".layui-form").on("submit",function (e) {
        // 监听表单提交事件，在事件处理函数里面取消默认行为
        e.preventDefault();
        // 查阅接口文档，利用 $.ajax()发起 post 请求
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            // 利用 $(this).serialize() 获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                // 如果返回的 status 不为0，说明更新失败，及逆行提示
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg("恭喜，用户信息修改成功！")
                // 更新成功之后，调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo()
            }
        });

    })


})