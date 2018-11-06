/**
 * 抓取西安房管局意向登记
 * 每小时抓取一次
 * 抓取结果通过server酱推送到微信
 */
const request = require('request')
const cronJob = require('cron').CronJob
const cheerio = require('cheerio')
const fs = require('fs')
// const mail = require('./mail')
const startUrl = 'http://124.115.228.93/zfrgdjpt/jggs.aspx?qy=00&yxbh=0000000230'
let reqUrls = []
let tastIndex = 0
for (let index = 1; index <= 52; index++) {
    reqUrls.push(`${startUrl}&page=${index}`)
}
// console.log(reqUrls)
const task = new cronJob('*/5 * * * * *', () => {
    //每5s执行一次
    if (tastIndex < 52) {
        console.log('tastIndex ',tastIndex,' start')
        doRequest(reqUrls[tastIndex])
        tastIndex++
    } else {
        console.log('task over')
    }
})
task.start()
function doRequest(url) {
    request(url, function (err, res) {
        if (err) return console.error(err)
        // 根据网页内容创建DOM操作对象
        let $ = cheerio.load(res.body.toString())
        let codeList = []
        $('.yxdjmdTable tr').each(function (index) {
            if (index >= 1) {
                let perObj = {}
                const tds = $(this).find('td')
                perObj = {
                    id: $(tds[0]).text(),
                    name: $(tds[1]).text(),
                    card_num: $(tds[3]).text(),
                    type: $(tds[4]).text() === "刚需家庭" ? 0 : 1,
                    is_checked: $(tds[7]).text() === "核验通过" ? 1 : 0,
                }
                codeList.push(perObj)
            }
        })
        fs.readFile('./data.json', 'utf8', function(err, data){
            let readJSON = JSON.parse(data);
            let writeJSON = JSON.stringify(readJSON.concat(codeList));
            fs.writeFile('./data.json', writeJSON, function(err){
                if(err) console.log('写文件操作失败');
                else console.log('写文件操作成功',tastIndex);
            });
        });
    })
}