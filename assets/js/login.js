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

    // 自定义表单验证
    // 从layui中获取form对象
    var form = layui.form;
    // 导入弹出层模块
    var layer = layui.layer;
    // 通过form.verify（）函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 验证两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }

    });

    // 注册功能
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                console.log(res);
                layer.msg('注册成功，请登录');
                // 模拟人的点击行为
                $('#link_login').click();
            }
        })
    });

    // 登录功能
    $('#form_login').on("submit", function(e) {
        e.preventDefault();
        console.log($(this));
        var data = $('#form_login').serialize();
        $.post('/api/login', data, function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    // 将服务器返回的用户唯一标识 保存到本地存储
                    localStorage.setItem('token', res.token);
                    // 跳转到后台主页
                    // location.href = '/bigEvent/index.html';
                }

            )
            // $.ajax({
            //     url: '/api/login',
            //     type: 'POST',
            //     data: $(this).serialize(),
            //     success(res) {
            //         if (res.status !== 0) {
            //             return layer.msg(res.message);
            //         };
            //         console.log(res);
            //         layer.msg(res.message);
            //         // 将服务器返回的用户唯一标识 保存到本地存储
            //         localStorage.setItem('token', res.token);
            //         // 跳转到后台主页
            //         location.href = '/bigEvent/index.html';
            //     }
            // });
    })


})