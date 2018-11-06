/**
 * 抓取西安房管局意向登记
 * 每小时抓取一次
 * 抓取结果通过server酱推送到微信
 */
const request = require('request')
const cronJob = require('cron').CronJob
const cheerio = require('cheerio')
// const mail = require('./mail')
const push = require('./push')
const dahuaCode = '2018432'
// const dahuaCode = '2018425'
const reqUrl = 'http://124.115.228.93/zfrgdjpt/xmgs.aspx'
doRequest()
const task = new cronJob('0 0 */1 * * *', () => {
    //每小时执行查询一次
    doRequest()
})
task.start()
function doRequest() {
    request(reqUrl, function (err, res) {
        if (err) return console.error(err)
        // 根据网页内容创建DOM操作对象
        let $ = cheerio.load(res.body.toString())
        let codeList = []
        $('.max_w353').each(function (index) {
            if (index % 2 === 1) {
                //基数项为预售证号
                codeList.push($(this).text())
            }
        })
        if (codeList.indexOf(dahuaCode) >= 0) {
            //已开始预售
            let html = `大华已开始预售登记，预售证号为：${dahuaCode}`
            html += `[点击查看](${reqUrl})`
            push.sc_send(html)
        }
    })
}