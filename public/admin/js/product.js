$(function(){
    var page = 1;
    var imgs = [];
    render();

    $('.btn_add').on('click',function(){
        $('#proAddModal').modal('show');
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page:1,
                pageSize: 100,
            },
            success: function(info){
                $('.dropdown-menu').html( template('tplType',info) )
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
        $('#dropdownSpan').text(this.innerText);
        $('#hideType').val($(this).attr('typeId'));
        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
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
            brandId:{
                validators:{
                    notEmpty:{
                        message: '请选择一个二级分类',
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message: '请输入商品名称',
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message: '请输入商品描述',
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message: '请输入库存',
                    },
                    regexp:{
                        regexp: /^[1-9]*\d$/,
                        message: '请正确输入库存'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message: '请输入尺寸xx-xx',
                    },
                    regexp:{
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺寸格式不正确',
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message: '请输入商品原价',
                    },
                    regexp:{
                        regexp: /^[1-9]*\d$/,
                        message: '请正确输入'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message: '请输入价格',
                    },
                    regexp:{
                        regexp: /^[1-9]*\d$/,
                        message: '请正确输入',
                    }
                }
            },
            brandLogos:{
                validators:{
                    notEmpty:{
                        message: '请上传图片',
                    }
                }
            },
          }
    })

    // $form.data('bootstrapValidator').resetForm();

    $('#secondFile').fileupload({
        done: function(e,data){
            imgs.unshift(data.result);
            console.log(imgs);
            if(imgs.length == 1){
                $('.seePic img:nth-child(1)').attr('src',imgs[0].picAddr);
                $form.data('bootstrapValidator').updateStatus('brandLogos','INVALID');
            }else if(imgs.length == 2){
                $('.seePic img:nth-child(1)').attr('src',imgs[0].picAddr);
                $('.seePic img:nth-child(2)').attr('src',imgs[1].picAddr);
                $form.data('bootstrapValidator').updateStatus('brandLogos','INVALID');
            }else if(imgs.length >= 3){
                $('.seePic img:nth-child(1)').attr('src',imgs[0].picAddr);
                $('.seePic img:nth-child(2)').attr('src',imgs[1].picAddr);    
                $('.seePic img:nth-child(3)').attr('src',imgs[2].picAddr);
                $form.data('bootstrapValidator').updateStatus('brandLogos','VALID');

            }
        },  
    })


    $form.on('success.form.bv',function(e){
        e.preventDefault();
        var picName1 = imgs[0].picName + '&' + imgs[0].picAddr;
        var str = $('#addForm').serialize() + 
        '&brandLogo=&picName1=' + imgs[0].picName + '&picAddr1=' + imgs[0].picAddr + 
        '&picName2=' + imgs[1].picName + '&picAddr2=' + imgs[1].picAddr +
        '&picName3=' + imgs[2].picName + '&picAddr3=' + imgs[2].picAddr;
        // console.log(str);
        $.ajax({
            url:'/product/addProduct',
            type: 'post',
            data: str,
            success: function(info){
                if(info.success){
                    $('#proAddModal').modal('hide');
                    page = 1;
                    render();
                    $form.data('bootstrapValidator').resetForm();
                    imgs = [];
                    $('#dropdownSpan').text('请选择二级分类');
                }
            }
        })
    })












    function render(){
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data:{
                page:page,
                pageSize: 5,
            },
            success: function(info){
                $('#proTab tbody').html( template('tpl',info) );
                $('#userpaginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total/info.size),
                    size: 'small    ',
                    itemTexts:function(type,page,current){
                        switch(type){
                            case('first'): return '首页';
                            case('prev'): return '上一页';
                            case('page'): return page;
                            case('next'): return '下一页';
                            case('last'): return '尾页';
                        }
                    },
                    tooltipTitles:function(type,page,current){
                        switch(type){
                            case('first'): return '首页';
                            case('prev'): return '上一页';
                            case('page'): return page;
                            case('next'): return '下一页';
                            case('last'): return '尾页';
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                })
            }
        })
    }

})