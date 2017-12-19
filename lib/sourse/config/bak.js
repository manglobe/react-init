const fs = require('fs');
const path = require('path');
const tar = require('tar');

const distFile = path.join(__dirname, '../dist');

const newDate = new Date();
const dateString = newDate.toLocaleString().replace(/\D/g, '_');

const zipName = path.basename(path.join(__dirname, '..')).replace(/\W/g, '_');



// 自动备份
const oldPath =  path.join(__dirname, `../midbak`);
const bakPath = (name) => path.join(__dirname, `../bak/${name}/${dateString}`);

const bakFunc = (pathArr) => {
  pathArr.forEach((ele) => {
    fs.access(oldPath, 'wx', (err) => {
      if (!err) {
        // try {
        //   var readStream = fs.createReadStream(oldPath(ele));
        //   var writeStream = fs.createWriteStream(bakPath(ele));
        //   readStream.pipe(writeStream);
        //   console.log("移动完成")
        // } catch (error) {
        //   console.error(err);
        //   return;
        // }
        fs.rename(oldPath, bakPath(ele), (error) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`${ele}备份成功`);
        });
      }
    });
  });
};



// 自动压缩
if (process.env.BUILD_MODULE) {
  fs.access(distFile, 'wx', (err) => {
    if (!err) {
      tar.c({
        gzip: false,
        file: `${zipName}_${dateString}.zip`
      }, ['dist/']).then(() => bakFunc(['dist']));
    }
  });

} else {
  bakFunc(['dev']);

}
