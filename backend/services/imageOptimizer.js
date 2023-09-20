const sharp = require("sharp");

FORMATS = {
    png: 'png',
    jpg: 'jpg',
    jpeg: 'jpeg',
    webp: 'webp',
}

exports.helperImg = (filePath,fileName,size=100) => {
    console.log('optimizando......................')
    return sharp(filePath)
            .resize(size)
            .toFile('./'+fileName)
}