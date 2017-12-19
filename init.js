const fs = require('fs');
const path = require('path');
// const index = require('./sourse/index.js');
const repl = require('repl');
const stat = fs.stat;
let replaceObj, pathObj;

console.log('请输入init.json路径（默认为"./init.json"）')
// const r = repl.start({ prompt: '> ', eval: myEval, writer: val=>val.toUpperCase() });

// function myEval(cmd, context, filename, callback) {
//   cmd = cmd&&cmd.trim();
//   if(cmd){
//     init(cmd,start);
//   }else{
//     init('',start);
//   }
//   // callback(null, cmd);
// }
init('', start);

function init(src, callBack) {
  if (!src) {
    return getInit('./init.json');
  }
  fs.open(src, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        return getInit(src);
      }

      throw err;
    }

    return getInit('./init.json');
  });

  function getInit(fd) {
    fs.readFile(fd, {
      encoding: 'utf8'
    }, (err, data) => {
      if (err) throw err;
      callBack(data, src)
    })
  }
}

function start(data, src) {
  replaceObj = JSON.parse(data)[0].replace;
  pathObj = JSON.parse(data)[0].settingPath;

  exists(
    './sourse',
    '/',
    src,
    copy,
  )
}


function pipeCopy(src, dst, input) {
  fs.readFile(src, 'utf8', (err, data) => {
    if (err) throw err;
    if (pathObj[path.basename(src)]) {
      fs.readFile(pathObj[path.basename(src)], 'utf8', (err, data2) => {
        writeMyData(data2)
      })
    }

    if (/(\.html|\.js|\.md|\.jsx)/.test(src)) {
      writeMyData(data, function (params) {
        let midP = params;
        Object.keys(replaceObj).forEach(key => {
          let reg = new RegExp(`{#${key}#}`, 'g')
          midP = midP.replace(reg, replaceObj[key])
        });
        return midP
      })
    } else {
      writeMyData(data)
    }
  });

  function writeMyData(data, callBefore) {
    let midData = callBefore ? callBefore(data) : data
    fs.writeFile(dst, midData, {flag:'w+'},(errs) => {
      if (errs) {
        console.log('=============errs==================');
        console.log(errs);
        console.log('====================================');
        throw errs
      };
    })
  }
}

function copy(src, dst, input) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path;
      var _dst = dst + '/' + path;
      var readable;
      var writable;
      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }
        if (st.isFile()) {
          pipeCopy(_src, _dst, input)
        } else if (st.isDirectory()) {
          exists(_src, _dst, input, copy);
        }
      });
    });
  });
}

function exists(src, dst, input, callback) {
  // 测试某个路径下文件是否存在
  fs.exists(dst, function (exists) {
    if (exists) { //不存在
      callback(src, dst, input);
    } else { //存在
      fs.mkdir(dst, function () { //创建目录
        callback(src, dst, input)
      })
    }
  })

  // fs.open(dst,'wx',(err,fd)=>{
  //   if (err) {
  //     if (err.code === 'EEXIST') {  //存在
  //       callback(src,dst);
  //       return;
  //     }
  //     throw err;
  //   }else{  //不存在
  //     fs.mkdir(dst,function(){//创建目录
  //       callback(src,dst)
  //     })
  //   }
  // })
}