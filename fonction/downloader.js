const https  = require('https')
const fs = require('fs')

module.exports.downloader = async(url)=>{
    let localPath
    await https.get(url,(res)=>{
        console.log(res.pathname)
        localPath = fs.createWriteStream(__dirname+ '../public/images/'+ Date.now()+'.jpg')
        res.pipe(localPath)
        
    })
    return localPath
}
