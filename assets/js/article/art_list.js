$(function () {

    var layer = layui.layer;
    var form = layui.form;

    // 补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (data) {
        var dt = new Date(data);
         
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth());
        var d = padZero(dt.getUTCDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ":" + ss;
    }

    // 1.定义提交参数
    var q = {
        pagenum:1,
        pagesize:3,	
        cate_id:'',	
        state:'',
    }

    // 2.初始化文章列表
    initTable()
    // 封装函数
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                var str = template("tpl-table",res);
                $("tbody").html(str);
                // 调用分页
                renderPage(res.total)
            }
        });
    }

    // 3.初始化分类
    initCate() 
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                var str = template("tpl-cate",res);
                $("[name=cate_id]").html(str);
                form.render()
            }
        });
    }

    // 4.筛选功能
    $("#form-search").on("submit",function (e) {
        e.preventDefault();
        // 获取
        var cate_id = $("[name=cate_id]").val();
        var state = $("[name=state]").val()
        // 赋值
        q.state = state;
        q.cate_id = cate_id
        // 初始化文章列表
        initTable()
    })

    // 5.分页功能
    var laypage = layui.laypage
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'pageBox',
            count: total,
            curr: q.pagenum, //获取起始页
            limit:q.pagesize, 
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],

            jump:function (obj,first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if(!first){
                    initTable()
                }
            }
          });
    }

    // 6.删除
    $("tbody").on("click",".btn-delete",function () {
        var id = $(this).attr("data-id");
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if(res.status !== 0){
                        return layer.msg(res.message)
                    }
                    if($(".btn-delete").length === 1 && q.pagenum > 1) q.pagenum--
                    initTable();
                    layer.msg("恭喜您，删除成功！！！")
                }
            });
            
            layer.close(index);
          });
    })

})