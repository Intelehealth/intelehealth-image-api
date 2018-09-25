const fs = require('fs')


function rmFile(dirPath) {
        var files = fs.readdirSync(dirPath); 
            if (files.length > 0)
                for (var i = 0; i < files.length; i++) {
                     var filePath = dirPath + '/' + files[i];
                        if (fs.statSync(filePath).isFile())
                            fs.unlinkSync(filePath);
                        else
                        rmDir(filePath);
                    }
                }

function rmDir(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
          var curPath = path + "/" + file;
          if (fs.lstatSync(curPath).isDirectory()) { // recurse
            rmDir(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
}


module.exports = { rmFile, rmDir }