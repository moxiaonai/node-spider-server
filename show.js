const fs = require('fs')
fs.readFile('./data.json', 'utf8', function(err, data){
    let readJSON = JSON.parse(data);
    // type: $(tds[4]).text() === "刚需家庭" ? 0 : 1,
    // is_checked: $(tds[7]).text() === "核验通过" ? 1 : 0,
    const checked_list =  readJSON.filter((item)=> {
        return item.is_checked
    })
    const gx_list1 = readJSON.filter((item)=> {
        return item.type === 0
    })
    const gx_list2 = checked_list.filter((item)=> {
        return item.type === 0
    })
    console.log('总登记人数：', readJSON.length)
    console.log('房源数', 334)
    console.log('高层数', 262)
    console.log('检验通过：', checked_list.length)
    console.log('未提交资料或者未通过：', readJSON.length - checked_list.length)
    console.log('刚需家庭：', gx_list1.length)
    console.log('刚需审核通过家庭：',gx_list2.length)
    console.log("\033[31m --------->>>>> 绝对公正情况下 <<<<<------ \033[0m")
    console.log("刚需第一次摇中高层概率：", (262/2) / gx_list2.length)
    console.log("刚需第二次摇中概率：", (262/2) / ( checked_list.length  - 131))
    console.log("普通家庭摇中概率", (262/2) / ( checked_list.length  - 131))
});