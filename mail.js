var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
    host: 'smtp.163.com',
    port: 25,
    auth: {
        user: 'wwjnzs@163.com', //刚才注册的邮箱账号
        pass: 'wwj@131410'  //邮箱填邮箱密码，其他邮箱有授权码，请填写授权码
    }
};
module.exports.sendMail = function(html) {
    // 创建一个SMTP客户端对象
    var transporter = nodemailer.createTransport(config);
    try {
        var options = {
            from           : '"moxiaonai" <wwjnzs@163.com>',
            to             : '"moxiaonai" <admin@moxiaonai.cn>, "wangping" <1054864949@qq.com>',//可一个或多个以,区分
            subject        : '有新的预售发布了，快去查看吧~',
            text           : '有新的预售发布了，快去查看吧~',
            html           : html,
        };
        console.log('开始发送')
        transporter.sendMail(options, function(error, info){
            if(error) {
                return console.log(error);
            }
            console.log('mail sent:', info.response);
        });
    } catch (error) {
        console.log('someError', error);
    }
}