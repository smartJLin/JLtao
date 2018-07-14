$(function(){
    var page = 1;
    function render(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page: page,
                pageSize: 5,
            },
            success:function(info){
                $('tbody').html( template('tpl',info) );
                $('#userpaginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total/info.size),
                    size: 'small',
                    onPageClicked: function(a,b,c,p){
                        page = p;
                        render();
                    }
                })
            }
        })
    };
    render();

    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
    })

    $('#addForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            categoryName:{
                validators:{
                    notEmpty: {
                        message: '栏位不能为空'
                    }
                }
            }
        }
    })

    $("#addForm").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#addForm').serialize(),
            success: function(info){
                $('#addModal').modal('hide');
                render();
                $("#addForm").data('bootstrapValidator').resetForm();
                $('[name=categoryName]').val('');
            }
        })
    });




})