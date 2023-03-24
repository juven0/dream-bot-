const https  = require('https')
const fs = require('fs')

module.exports.downloader = async(url)=>{
    let resultName
    console.log('ao izi')
    await https.get(url,(res)=>{
        resultName = Date.now()+'.jpg'
        localPath = fs.createWriteStream(__dirname+ '../public/images/'+ resultName)
        console.log(localPath)
        console.log(resultName)
        res.pipe(localPath)
        
    })
    return resultName
}
