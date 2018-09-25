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

function rmDir(dirPath) {
     try{
        fs.rmdirSync(dirPath)
     } catch (e){
       console.log(e); 
     }
}


module.exports = { rmFile, rmDir }