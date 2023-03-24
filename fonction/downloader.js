const https  = require('https')
const fs = require('fs')
const path = require('path')

module.exports.downloader = async(url,fileName)=>{
    console.log('ao izi')
    await https.get(url,(res)=>{
        const elementPath= path.join(__dirname, '..')
        localPath = fs.createWriteStream(elementPath+'/public/images/'+ fileName)
        res.pipe(localPath) 
    })
}
