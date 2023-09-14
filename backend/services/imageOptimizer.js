const sharp = require("sharp");

exports.helperImg = (filePath,fileName,size=300) => {
    return sharp(filePath)
            .resize(size)
            .toFile('./optimized/'+fileName+'.png')
}