$(function(){
    var page = 1;
    render();
    function render(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: 5,
            },
            success: function(info){
                $('tbody').html( template('tpl',info) );
                $('#userpaginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
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
    }


    $('.btn_add').on('click',function(){
        $('#secondAddModal').modal('show');
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100,
            },
            success: function(info){
                $('.dropdown-menu').html( template('tplType',info) );
            }
        })
    })
    $('.dropdown-menu').on('click','a',function(){
        $('#dropdownSpan').html(this.innerText);
        $('#hideType').val($(this).attr('typeId'));
        $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })



    $('#secondFile').fileupload({
        done: function(e,data){
            console.log(data);
            $('.seePic img').attr('src',data.result.picAddr);
            $('#hideImg').val(data.result.picAddr);
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    })


        
    var $form = $('#addForm');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            brandName:{
                validators:{
                    notEmpty: {
                        message: '二级分类不能为空'
                      }
                }
            },
            categoryId:{
                validators:{
                    notEmpty: {
                        message: '请选择一级分类'
                      }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty: {
                        message: '请上传图片'
                      }
                }
            },
        }
    });
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            url:'/category/addSecondCategory',
            type: 'post',
            data:$('form').serialize(),
            success: function(info){
                if(info.success){
                    page = 1;
                    $('#secondAddModal').modal('hide');
                    $form.data('bootstrapValidator').resetForm();
                    render();
                }
            }
        })
    })



})