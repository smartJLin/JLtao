$(function(){
    var page = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url:'/user/queryUser',
            type: 'get',
            data:{
                page: page,
                pageSize: pageSize
            },
            success: function(info){
                $('tbody').html( template('tpl',info));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    totalPages: Math.ceil(info.total/info.size),
                    currentPage: page,
                    size: 'small',
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    //禁用启用
    $('tbody').on('click','.btn',function(){
        $('#userModal').modal('show');
        var id = $(this).parent().attr('userid');
        var isDelete = $(this).hasClass('userbtnact')?0:1;
        $('#userModal .btn-primary').off().on('click',function(){
            $.ajax({
                type: 'post',
                url:'/user/updateUser',
                data:{
                    id: id,
                    isDelete: isDelete,
                },
                success:function(info){
                    if(info.success){
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            })
        })

    })
})