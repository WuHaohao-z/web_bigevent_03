$(function () {
    // 获取用户信息
    getUserInfo()

    // 退出
    $("#btnLogout").on("click",function () {
        console.log(123);
        // 提示用户是否退出
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            // 清空本地的token
            localStorage.removeItem("token")
            // 页面跳转
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index);
          });
    })
})

// 1.获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status !== 0 ){
                return layui.layer.msg(res.message)
            }
            layui.layer.msg("获取用户信息成功！")
            renderAvatar(res.data)
        }
    });
}
// 2.渲染用户头像和名称
// 定义 renderAvatar 函数，接收服务器返回的用户数据
function  renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本，找到关键元素进行设置
    $(".welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 按需渲染用户的头像
    if(user.user_pic !== null){
        // 如果用户有头像，那么就直接设置图片头像
        $(".layui-nav-img").attr("src",user.user_pic).show();
        $(".text-avatar").hide();
    }else{
        // 如果没有设置文本头像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show()
    }

}