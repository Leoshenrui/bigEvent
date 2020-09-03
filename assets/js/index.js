$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            // // headers就是请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                };
                // 渲染头像
                renderAvatar(res.data)
            },
            // success(res) {
            //     console.log(res);
            // }
        })
    };

    function renderAvatar(user) {
        // 1.获取 昵称 或 用户名
        var name = user.nickname || user.username;
        // 2.欢迎文本
        $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`);
        // 3.按需渲染用户头像
        if (user.user_pic !== null) {
            // 3.1渲染图片头像，并显示头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide() //隐藏文字头像
        } else {
            // 3.2渲染文字头像
            $('.layui-nav-img').hide(); //隐藏图片头像
            var first = name[0].toUpperCase(); //获取用户名第一个首字母并设置大写
            // 显示文字头像的显示内容，并显示 
            $('.text-avatar').html(first).show()
        }
    };

    var layer = layui.layer;
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登入', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空本地存储的token
            localStorage.removeItem('token');
            // 重新跳转到登录界面
            location.href = '/bigEvent/login.html';
            // 关闭confirm询问框
            layer.close(index);
        })
    })
})