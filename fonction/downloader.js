const https  = require('https')
const fs = require('fs')

module.exports.downloader = async(url)=>{
    let resultName
    
    await https.get(url,(res)=>{
        resultName = Date.now()+'.jpg'
        localPath = fs.createWriteStream(__dirname+ '../public/images/'+ resultName)
        res.pipe(localPath)
        
    })
    return resultName
}
