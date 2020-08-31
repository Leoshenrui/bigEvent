$(function() {

    // 登入
    $('#link_reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    // 注册
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });



})