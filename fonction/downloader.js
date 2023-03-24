const https  = require('https')
const fs = require('fs')
const path = require('path')

module.exports.downloader = async(url)=>{
    let resultName
    console.log('ao izi')
    await https.get(url,(res)=>{
        resultName = Date.now()+'.jpg'
        const elementPath= path.join(__dirname, '..')
        localPath = fs.createWriteStream(elementPath+'/public/images/'+ resultName)
        console.log(localPath)
        console.log(resultName)
        res.pipe(localPath)
        
    })
    return resultName
}
