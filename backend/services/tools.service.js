const mime = require('mime');
const fs = require('fs');

exports.uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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