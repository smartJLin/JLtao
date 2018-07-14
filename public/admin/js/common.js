$(function(){
    // NProgress.configure({ showSpinner: false });
    $(document).ajaxStart(function(){
        NProgress.start();
    })
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    });




    $('.banner .pull-left').on('click',function(){
        $('.lt_aside').toggleClass('asideact');
        $('body').toggleClass('banneract');
        $('.banner').toggleClass('banneract');
    })

    $('.manger').on('click',function(){
        $('.man_son').slideToggle();
    })

    $('.glyphicon-log-out').on('click',function(){
        $('#logoutModal').modal('show');
        $('#logoutModal .btn-primary').off().on('click',function(){
            $.ajax({
                type: 'get',
                url: '/employee/employeeLogout',
                success: function(info){
                    if(info.success){
                        location.href = 'login.html';
                    }
                }
            })
        })
    })




})