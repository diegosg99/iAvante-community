const path = require('path');
const mime = require('mime');
const sharp = require("sharp");
const fs = require('fs');

const ROUTES = {
  profile: 'profile/',
  post: 'posts/',
  forum: 'forum/',
  events: 'events/',
  others: 'others/',
}

exports.uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

exports.helperImg = (filePath,fileName,size=100) => {
  return sharp(filePath)
          .resize(size)
          .toFile('./'+fileName)
}

exports.convertImageToBase64 = (filepath) => {

  const filemime = mime.getType(filepath);

  let base64 = fs.readFileSync(filepath,{encoding: 'base64'},(err, data) => {
      if (err) {
          throw err;
      }
  });
  return `data:${filemime};base64,${base64}`;
}

exports.mediaManager = (file) => {

  let mime = file.mimetype.split('/')[0];
  let baseRoute = './backend/uploads/';
  let route = file.originalname.split('.')[0];

  baseRoute = mime === 'image' ? baseRoute+'images/':baseRoute+'videos/';

  return baseRoute+ROUTES[route];
}