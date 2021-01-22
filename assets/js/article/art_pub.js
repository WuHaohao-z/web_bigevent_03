$(function () {

    var form = layui.form
    var layer = layui.layer
    // 1.初始化分类
    initCase()
    function initCase() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template("tpl-cate", res);
                $("[name=cate_id]").html(str);
                form.render();
            }
        });
    }

    // 2.初始化富文本编辑器
    initEditor()

    // 3.1.初始化图片裁剪器
    var $image = $('#image')

    // 3.2 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3.3 初始化裁剪区域
    $image.cropper(options)

    // 4.点击按钮，选择图片
    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click()
    })

    // 5.设置图片
    $("#coverFile").on("change", function (e) {
        var file = e.target.files[0];
        if (file.length === 0) {
            return;
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 6.设置状态
    var state = "已发布"
    $("#btnSave2").on("click", function () {
        state = "草稿"
    })

    // 7.添加文章
    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        // 创建FormData对象
        var fd = new FormData(this)
        // 放入状态
        fd.append("state", state)
        // 放入图片
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img",blob)
                // 必须用扩展运算符或者遍历才能打印出FormData对象
                // console.log(...fd);
                publishArticle(fd)
            })
    })

    // 8.封装发布文章的发布
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType:false,
            processData:false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您，发布成功！")
                setTimeout(function () {
                    window.parent.document.getElementById("art_list").click()
                },1500)
            }
        });
    }
})