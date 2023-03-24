const https  = require('https')
const fs = require('fs')

const downloader = async(url)=>{
    await https.get(url,(res)=>{
        console.log(res.pathname)
        let localPath = fs.createWriteStream('./'+ Date.now()+'.jpg')
        res.pipe(localPath)
    })
}

downloader('https://images.pexels.com/photos/640781/pexels-photo-640781.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-640781.jpg&fm=jpg')