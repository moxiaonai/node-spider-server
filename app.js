const request = require('request')
const cronJob = require('cron').CronJob
const cheerio = require('cheerio')
// const mail = require('./mail')
const push = require('./push')
doRequest()
const task = new cronJob('0 0 */1 * * *', () => {
    //每小时执行查询一次
    doRequest()
})
task.start()
function doRequest() {
    request('http://fgj.xa.gov.cn/ygsf/index.aspx', function (err, res) {
        if (err) return console.error(err)
        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString());
        let html = ''
        let flag = false;//是否有新的发布，是否需要发邮件
        $('.ygsf_table1 tr').each(function (index) {
            if (index) {
                const pubTime =  new Date($(this).children().last().text());
                const now = new Date().getTime();
                const diff = now - pubTime;
                if( diff < 3600*1000*24*2) {
                    //两天内新发布的，发邮件
                    flag = true;
                    html += `${index}. ${$(this).children().eq(1).text()} ${$(this).children().first().text()} ${$(this).children().last().text()}   `
                }
            }
        })
        html += '[点击查看](http://fgj.xa.gov.cn/ygsf/index.aspx)'
        // 发送结果
        if (flag) {
            // mail.sendMail(html)
            push.sc_send(html)
        }
    })
}