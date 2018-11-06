const request = require('request')
function sc_send(html) {
    let params = {
        'text': "有新的预售发布了，快去查看吧~",
        'desp': html,
    }
    request.post({
        url: 'https://sc.ftqq.com/SCU23154Td7895533f583c9dc4e852f203aecdd835aa93a9feb6ab.send',
        form: params,
        },
        function(err,response,body){
            console.log(body)
        }
    )
}
module.exports.sc_send = sc_send;