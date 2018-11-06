const request = require('request')
function sc_send(html) {
    let params = {
        'text': "有新的预售发布了，快去查看吧~",
        'desp': html,
    }
    request.post({
        url: 'https://sc.ftqq.com/.send',
        form: params,
        },
        function(err,response,body){
            console.log(body)
        }
    )
}
module.exports.sc_send = sc_send;
