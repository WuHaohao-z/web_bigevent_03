$(function () {

    var layer = layui.layer
    var form = layui.form
    // 获取分类列表的数据
    initArtCateList() 
    // 封装函数
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                // 引入模板引擎
                var str = template("tpl-table",res);
                $("tbody").html(str)
            }
        });
    }


    // 添加类别
    $("#btnAddCate").on("click",function () {
        // 在按钮的点击事件中，通过 layer.open() 展示弹出层
        indexAdd = layer.open({
            type:1,
            area:["500px","250px"],
            title:'添加文章分类',
            content: $("#dialog-add").html()
        });
    })
    
    // 实现添加文章分类的功能
    var indexAdd = null;
    $("body").on("submit","#form-add",function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                // 刷新页面
                initArtCateList() 
                layer.msg("恭喜，添加成功！！")
                layer.close(indexAdd)
            }
        });
    })

    // 点击编辑按钮展示修改文章分类的弹出层
    var indexEdit = null;
    $("tbody").on("click",".btn-edit",function () {
        indexEdit = layer.open({
            type:1,
            area:["500px","250px"],
            title:'修改文章分类',
            content: $("#dialog-edit").html()
        });
        // 在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中
        var id = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                form.val("form-edit",res.data)
            }
        });
    })

    // 实现编辑功能
    $("body").on("submit","#form-edit",function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                // 刷新页面
                initArtCateList() 
                layer.msg("恭喜，修改成功！！")
                layer.close(indexEdit)
            }
        });
    }) 

    // 删除功能
    $("tbody").on("click",".btn-delete",function () {
        var id = $(this).attr("data-id");
        // 提示用户是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                data: "data",
                success: function (res) {
                    if(res.status !== 0){
                        return layer.msg(res.message)
                    }
                    layer.msg("删除分类成功！！")
                    layer.close(index);
                    initArtCateList() 
                }
            });
          });
    })

})