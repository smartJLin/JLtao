$(function(){
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            username:{
                validators:{
                    notEmpty: {
                        message: '栏位不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                      },
                    callback:{
                        message: '用户名不存在',
                    }
                }
            },
            password:{
                validators:{
                    notEmpty: {
                        message: '栏位不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在6到30之间'
                      },
                    callback: {
                        message:'密码不正确',
                    }
                }
            }
        }
    })
    var validator = $("form").data('bootstrapValidator');
    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('form').serialize(),
            success: function(info){
                console.log(info);
                if(info.error === 1000){
                    validator.updateStatus('username', 'INVALID' , 'callback');
                }
                if(info.error === 1001){
                    validator.updateStatus('password', 'INVALID' , 'callback');
                }
                if(info.success){
                    location.href = 'index.html';
                }
            }
        })
    });
    $('[type=reset]').on('click',function(){
            validator.resetForm();
        });

})