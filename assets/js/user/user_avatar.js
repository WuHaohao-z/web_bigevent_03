$(function () {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 创建上传按钮的点击事件
    $("#btnChooseImage").on("click", function () {
        $("#file").click()
    })


    // 更换裁剪区域的图片
    // 给文件选择框绑定 change 事件
    $("#file").on("change", function (e) {
        // 用户选择了文件就会触发这个事件，通过 e.target.files 获取用户选择文件列表
        var filelist = e.target.files;
        // 通过索引0拿到用户选择的文件
        if (filelist.length === 0) {
            return layer.msg("请选择照片！！")
        }
        // 将文件转化为路径
        var file = e.target.files[0]
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 将裁剪后的头像上传到服务器
    $("#btnUpload").on("click", function () {
        // 创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // 调用接口，把头像上传到服务器
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data:  {
                avatar: dataURL
              },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                  }
                  layer.msg('更换头像成功！')
        window.parent.getUserInfo()
            }
        });
    })



})