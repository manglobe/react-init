const fs = require('fs');
const path = require('path');
// const index = require('./sourse/index.js');
const repl = require('repl');
const stat=fs.stat;


console.log('请输入TITLE')
const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter });

function myEval(cmd, context, filename, callback) {
  // console.log(cmd)
  // console.log(context)
  console.log(cmd)
  // travel('./sourse',(pathname)=>{
    copy(
      './sourse',
     './end',
      cmd
    )
  // })
  callback(null, cmd);
  // fs.appendFile('index.html', index('xxx'), 'utf8', (err) => {
  //   if (err) throw err;
  //   console.log('The "data to append" was appended to file!');
  // });
}

function myWriter(output) {
  return output.toUpperCase();
}


function pipeCopy(src, dst,input) {
  fs.readFile(src, 'utf8', (err, data) => {
    if (err) throw err;
    if(/.html/.test(src)){
      writeMyData(data,function (params) {
        return  params.replace(/{#TITLE#}/g,`input`)
      })
    }else{
      writeMyData(data)
    }
  });

  function writeMyData(data,callBefore) {
    let midData=callBefore?callBefore(data):data
    fs.writeFile(dst,midData,(errs) => {
      if (errs) throw errs;
    })
  }
}

function copy(src,dst,input){
  //读取目录
  fs.readdir(src,function(err,paths){
      console.log(paths)
      if(err){
          throw err;
      }
      paths.forEach(function(path){
          var _src=src+'/'+path;
          var _dst=dst+'/'+path;
          var readable;
          var writable;
          stat(_src,function(err,st){
              if(err){
                  throw err;
              }

              if(st.isFile()){
                  pipeCopy(_src,_dst,input)
              }else if(st.isDirectory()){
                  exists(_src,_dst,copy);
              }
          });
      });
  });
}

function exists(src,dst,callback){
  //测试某个路径下文件是否存在
  fs.exists(dst,function(exists){
      if(exists){//不存在
          callback(src,dst);
      }else{//存在
          fs.mkdir(dst,function(){//创建目录
              callback(src,dst)
          })
      }
  })
}