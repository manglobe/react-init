#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// const index = require('./sourse/index.js');
const repl = require('repl');
const stat = fs.stat;

let testPath = process.cwd()
let replaceObj, pathObj;

console.log('请输入资源路径（默认为"./"）')
const r = repl.start({ prompt: '> ', eval: myEval, writer: val=>val.toUpperCase() });

function myEval(cmd, context, filename, callback) {
  cmd = cmd&&cmd.trim();
  if(cmd){
    init(cmd,start);
  }else{
    init('',start);
  }
  // callback(null, cmd);
}

function init(src, callBack) {
  let jsonPath = path.resolve(process.cwd(),src,'init.json')
  let sourcePath = path.resolve(process.cwd(),src,'sourse')
  console.log('====================================');
  console.log(sourcePath);
  console.log('====================================');
  if (!src) {
    return getInit(jsonPath);
  }
  fs.open(jsonPath, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        return getInit(jsonPath);
      }
      throw err;
    }
    return getInit(jsonPath);
  });

  function getInit(fd) {
    fs.readFile(fd, {
      encoding: 'utf8'
    }, (err, data) => {
      if (err) throw err;
      callBack(data, jsonPath, sourcePath)
    })
  }
}

function start(data, src, sourcePath) {
  replaceObj = JSON.parse(data)[0].replace;
  pathObj = JSON.parse(data)[0].settingPath;

  access(
    sourcePath,
    testPath,
    src,
    copy,
  )
  console.log('over')
}


function pipeCopy(src, dst, input) {

  if (/(\.html|\.js|\.md|\.jsx)/.test(src)) {
    fs.readFile(src, 'utf8', (err, data) => {
      if (err) throw err;
      if (pathObj[path.basename(src)]) {
        fs.readFile(pathObj[path.basename(src)], 'utf8', (err, data2) => {
          writeMyData(data2)
        })
      } else {
        writeMyData(data, function (params) {
          let midP = params;
          Object.keys(replaceObj).forEach(key => {
            let reg = new RegExp(`{#${key}#}`, 'g')
            midP = midP.replace(reg, replaceObj[key])
          });
          return midP;
        })
      }
    })
  }else {
    fs.readFile(src, (err, data) => {
      if (err) throw err;

      if (pathObj[path.basename(src)]) {
        fs.readFile(pathObj[path.basename(src)], (err, data2) => {
          writeMyData(data2)
        })
      } else {
        writeMyData(data)
      }
    })
  };

  function writeMyData(data, callBefore) {
    let midData = callBefore ? callBefore(data) : data
    fs.writeFile(dst, midData, {flag:'w+'},(errs) => {
      if (errs) {
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
          access(_src, _dst, input, copy);
        }
      });
    });
  });
}

function access(src, dst, input, callback) {
  // 测试某个路径下文件是否存在
  fs.access(dst, function (err) {
    if (err) { //不存在
      fs.mkdir(dst, function () { //创建目录
        callback(src, dst, input)
      })
    } else { //存在
      callback(src, dst, input);     
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